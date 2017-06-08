# Link

Link is an intermediate object used to implement the two-way data binding.
It acts like a transport for the value, the callback to modify it, its validation error, abstracting out
UI controls from the data representation in the state container and from the state container per se.

Links to the record's attributes are commonly created with `linkAt` and `linkAll` methods of records.
Record is automatically validated upon the links creation, and link encloses the validation error
related to the particuler attribute.

```javascript
// Data bound control for the semantic form markup
const Input = ({ valueLink, ...props }) => (
    <div className={`form-control ${ valueLink.error ? 'error' : '' }`}>
        <input {...props}
            value={ valueLink.value }
            onChange={ e => valueLink.set( e.target.value ) }
        />
        <div className="validation-error">{ valueLink.error || '' }</div>
    </div>
);
```

Links makes it possible to create the semantic markup for the form elements, encapsulating the
all the required styles and validation error indication.

## Link structure

Here are the most important link members. All the link members are read-only and should not be modified directly.

```javascript
// Link's shape
{
    value : /* the value */,
    set( newValue ){ /* the function to change it */},
    error : /* validation error */
}
```

### link.value

Holds linked value. This value is immutable.

### link.error

Holds the validation error (typically the text error message) which might be consumed and displayed by data-bound countrol.

An `error` is populated automatically on link creation when using `linkAt()` or `linkAll()` methods, and is produced by declarative
validators from `.has.check()` attributes annotations.

### link.set( newValue )

Tells the state container to update the value.

```javascript
<button onClick={ () => boolLink.set( !boolLink.value ) } />
```

### link.update( prevValue => newValue )

Update link value using the given value transform function.

```javascript
<button onClick={ () => boolLink.update( x => !x ) } />
```

## Create

All records and collections may create links to its elements.
Component has the shorthand methods to create links to its state record elements.

You can create custom link object encapsulating complex data binding logic with `Link.value`.

### record.linkAt( attr )

Create the link to the record's attribute. Semantically it's the reference to the attribute.

```javascript
const nameLink = user.linkAt( 'name' );
```

### collection.linkAt( prop )

Create the link to the custom collection property. Property's setter *must* modify some record's attributes or change the collection.

### component.linkAt( key )

Create the link to the attribute of the conponent's state. Works similar to `component.state.linkAt( key )`.

### record.linkAll()

Link all (or listed) records' attributes.

```javascript
// Link all attributes...
const { name, email, age } = user.linkAll();

// Link specified attributes...
const { name, email } = user.linkAll( 'name', 'email' );
```

### component.linkAll()

Link all (or listed) attributes of the component's state. Works similar to `component.state.linkAll()`.

### collection.linkContains( record )

Create the boolean link which is `true` whenever the record is contained in the collection.

Setting the link to `false` will remove record from the collection, setting it to true will add it.

### Link.value( value, set )

Create custom link with the given `value` and `set` function. Use the `link.check` method to populate the validation error.

## Transform

###  link.equals( value )

Create boolean equality link which value is `true` whenever `link.value === value`, and `false` otherwise.

When an equality link is assigned with `true` the parent link value is set with `value`, and with `null` otherwise.

```javascript
<Checkbox checkedLink={ stringLink.equals( 'optionX' ) } />
<Checkbox checkedLink={ stringLink.equals( 'optionY' ) } />
```

Useful for radio groups.

### link.props

Converts the link to the standard `{ value, onChange }` props to be easily consumed by standard `<input />` control.

```javascript
<input type="text" {...nameLink.props} />
```

### link.action( ( prevValue, event ) => newValue )

Convert the link to the UI event handler `event => void` which will transform the link using the given function.

`link.action` takes transform function, and produce a new function which takes single `event` argument.
When it's called, `event` and link `value` are passes as transform parameters, and link will be updated 
with returned value.

```javascript
// simple click event handler...
<button onClick={ boolLink.action( x => !x ) } />

// manual binding to input control:
const setValue = ( x, e ) => e.target.value;
...
<input  value={ link.value }
        onChange={ link.action( setValue ) } />
```

This is particularly useful in (but not restricted to) UI event handlers.

### link.check( predicate : value => boolean, errorMsg? )

Checks whenever the predicate is truthy on linked value, and if it's not, assigns `link.error` with `errorMsg`.
Does nothing if `link.error` is already populated.

This method may be used for additional validation in `render()`, and to populate the validation error for the custom links created with `Link.value()`.

You typically don't need `link.check` for links created with `linkAt()` methods, because the validation happens inside of records.

## Link to objects and arrays

It's rather unusual scenario that you hold complex raw JS data as a part of your state, because typically the state is
defined as a superposition of nested records and collections.

Links can be used to make purely functional updates of the objects and arrays in records attributes. It's done with
the help of _at-links_, which points to the elements of linked objects and arrays.

### link.at( key )

Create an _at-link_ to the member of array or object.

Whenever an _at-link_ is updated, it will lead to proper purely functional update (with shallow copying) of the
container (array or object).

```javascript
// Update this.state.array[ 0 ].name
this.linkAt( 'array' ).at( 0 ).at( 'name' ).set( 'Joe' );
```

### link.map( ( itemLink, itemKey ) => any | void )

Map and filter through the linked array or object to produce an array.
Mapping function receives _at-link_ to the corresponding element.
Whenever it returns `undefined`, the corresponding element is be skipped.


```javascript
// Render the linked array...
var list = stringArrayLink.map( ( itemLink, index ) => {
    if( itemLink.value ){ // Skip empty elements
        return (
            <div key={ index }>
                <Input valueLink={ itemLink } />
            </div>
        );
    }
});
```

### link.update( clonedObject => modifiedObject )

Update linked object or array.

Plain objects and arrays are shallow copied already, thus it's safe just to update the value in place.

```javascript
// Update the linked object
<button onClick={ () => objLink.update( obj => {
                                obj.a = 1;
                                return obj;
                            }) } />
```

### link.action( ( clonedObject, event ) => Object )
 
Creates action to update enclosed object or array.

Plain objects and arrays are shallow copied already, thus it's safe just to update the value in place.

### link.removeAt( key )

Remove element with a given key from the linked object or array.

### atLink.remove()

Remove element with a given key from the linked object or array.

## Link to objects

### link.pick( key1, key2, ... )

Create _at-links_ to the object's members with designated keys, and wrap them in an object.

```javascript
// Bulk create at-links for the linked object
const { name, email } = objLink.pick( 'name', 'email' );
```

## Link to arrays

### linkToArray.splice() : void

Similar to `Array.splice()` method, but performs purely functional update.

### linkToArray.push() : void 

Similar to `Array.push()` method, but performs purely functional update.

### linkToArray.unshift() : void

Similar to `Array.unshift()` method, but performs purely functional update.

### linkToArray.contains( element )

Creates the boolean link to the presence of value in array.

Resulting link value is `true` whenever element is present in array, and `false` otherwise.
Whenever resulting link is assigned with new value, it will flip `element` in the array.

Useful for the large checkbox groups.
