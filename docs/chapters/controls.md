# Data-bound controls

## Ad-hoc data binding

### { ...link.props }

Bind the linked value to any standard UI control expecting `value` and `onChange` props.

### text input

Bind input or textarea to the linked string:

```javascript
// String
<input type="text" {...link.props} />
<textarea {...link.props} />
```

### checkbox

Bind the checkbox to the linked boolean:

```javascript
<input type="checkbox" {...boolLink.props } />
```

Bind the checkbox to the presence of value in the array:

```javascript
// array = [ 'optionA' ]
<input type="checkbox"  {...arrayLink.contains( 'optionA' ).props } /> // Checked
<input type="checkbox"  {...arrayLink.contains( 'optionB' ).props } /> // Unchecked
```

Bind the checkbox to the presence of the record in the collection: 

```javascript
<input type="checkbox" {...collection.linkContains( record ).props } />
```

### radio group

Bind radio group to the single linked value:

```javascript
// Radio
<input type="radio" {...link.equals( 'optionA' ).props } />
<input type="radio" {...link.equals( 'optionB' ).props } />
```

### select list

Bind select list to the linked value:

```javascript
// Select
<select {...link.props}>
    <option value="optionA"> A </option>
    <option value="optionB"> B </option>
</select>
```

## Linked UI controls

_Linked control_ is the custom React component taking the `link` property instead of `value`/`onChange` props pair.
It uses the link to extract the value and validation error, and to modify the value.

Linked controls makes it possible to create the semantic form markup encapsulating inline validation
and form layout styling. Not just form controls, but the most of the UI can benefit of this technique.

```javascript
// Custom data-bound control
const Input = ({ link, ...props }) => (
    <div className={`form-row ${ link.error ? 'has-error' : '' } `}>
        <input type="text" {...props} { ...link.props } />
        <div className="error-placeholder">{ link.error || '' } </div>
    </div>
);

// Another simple data bound control
const Input = ({ link, ...props }) => (
    <input {...props}
            value={ link.value }
            onChange={ e => link.set( e.target.value ) } />
);
```

There are the set of pre-defined linked UI controls in `react-mvx/tags` modules. Inline error indication is rather project-dependent, thus this file is intended to be used as a reference and starting boilerplate for your controls.

```javascript
import { Input } from 'react-mvx/tags'
```

### text input

`tags.jsx` contains wrappers for standard `<input>` and `<textarea>` tags,
  which consume linked strings. These wrappers add `invalid` class to enclosed HTML element if an error is present in the link,
  and `required` class if `isRequired` validator is the failing one.

```javascript
import { Input, TextArea } from 'react-mvx/tags'
...
<Input type="text" valueLink={ link } />
<TextArea valueLink={ link } />
```

Its implementation is rather straightforward.

### numeric input

In some cases you can use the _wrong input rejection_ instead of (or in addition to) the validation. The most popular
example is the numeric-only input control. It guarantees that the linked value will only be updated with the valid number,
completely encapsulating all related checks and mechanics.

The challenge here is that when number in not an _integer_ it has to go through the sequence of intermediate invalid states during the editing process.
Like "" -> "-" -> "-0" -> "-0." -> "-0.5".

The proper implementation of wrong input rejection might be tough.
`tags.jsx` contains the cross-browser numeric input tag. It has following differences compared to the regular `<Input>`:

- Keyboard input which obviously leads to invalid values (e.g. letters) is rejected.
- Link value is guaranteed to be the valid number.
- There are `integer` and `positive` boolean props controlling input rejection. They can be combined.

`<NumberInput>` validates its intermediate state and adds `invalid` class to enclosed input element if it's not a number.

```jsx
import { NumberInput } from 'react-mvx/tags'

<NumberInput valueLink={ link } />
<NumberInput valueLink={ link } integer={ true }/>
<NumberInput valueLink={ link } positive={ true }/>
```

### checkbox

There are different ways how you can handle the checkbox components. The problem of the standard 
checkbox control, though, is that it's not that easily styled.

`tags.jsx` contains the custom checkbox and radio components implemented using the plain `<div />`
 element which toggles `selected` class on click. By default, it has `checkbox` CSS class,
  which can be overridden by passing `className` prop. It passes through anything else, including `children`.
 
```jsx
<Checkbox checkedLink={ booleanLink } />
<Checkbox checkedLink={ arrayLink.contains( 'option' ) } />
```

### radio group
      
There are two different ways how you can approach the data binding for the radio groups.
First option is to pass the `value` of the particular option along with the link. Link this:

```jsx
<label>
    A: <Input type="radio" valueLink={ flagLink } value="a" />
</label>
<label>
    B: <Input type="radio" valueLink={ flagLink } value="b" />
</label>
```

Alternatively, you can use `link.equals( value )` method to produce the boolean
link which is specially designed to create radio groups, as it's illustrated by
the custom `<Radio />` tags from the `tags.jsx`.

Internally, it's `<div>` element which always sets its link to `true` on click.
And whenever the link value is `true`, it adds `selected` class to the div.

By default, it has `radio` CSS class, which can be overridden by passing `className` prop.
It passes through anything else, including `children`.

```jsx
<label>
    A: <Radio checkedLink={ flagLink.equals( 'a' ) } />
</label>
<label>
    B: <Radio checkedLink={ flagLink.equals( 'b' ) } />
</label>
```
