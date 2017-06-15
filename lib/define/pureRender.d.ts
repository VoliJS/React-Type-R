export declare function compilePureProps(props: any): {
    _isChanged: Function;
    _ChangeTokens: any;
};
export declare const PureRenderMixin: {
    _changeTokens: any;
    shouldComponentUpdate(nextProps: any): any;
    componentDidMount(): void;
    componentDidUpdate(): void;
};
