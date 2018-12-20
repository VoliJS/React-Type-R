# v3 Roadmap

## Major goals

- Support new React lifecycle hooks
- Support new version of Type-R

## Tasks

- Fix stores incompatibilities
- New implementation of watchers.
    - Should use the same approach as the new pure render.
    - Deep changes detection.
    - Use shouldComponentUpdate to invoke watchers
    - Make sure watcher will be called once no matter how many times shouldComponentUpdate is called.
- Ad-hoc component.afterRender() lifecycle hook to be used from render and watchers.
- New, more efficient implementation of pure render.
    - Create tokens for Date and Transactional props only.
    - Update tokens in place.
    - Make sure shouldComponentUpdate remembers that some props were changed if called many times.
    - Add PureComponent class.
- Remove dependency from propTypes package.
- Rename `state` to `model`.
- (?) Delay asyncUpdate() between shouldComponentUpdate and componentDidUpdate.
- (?) Check if update throttling works with inputs.
- (?) Use setState() instead of forceUpdate().
- (?) Put both model and store into the standard component state.
