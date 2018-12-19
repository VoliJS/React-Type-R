export declare function createChangeTokensConstructor(props: any): Function;
export declare const EmptyPropsChangeTokensCtor: Function;
export declare const PureRenderMixin: {
    shouldComponentUpdate(nextProps: any): any;
    componentDidMount: typeof updateChangeTokens;
    componentDidUpdate: typeof updateChangeTokens;
};
declare function updateChangeTokens(): void;
export {};
