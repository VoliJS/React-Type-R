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
