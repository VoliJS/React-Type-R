import { Component } from "react";

export const PureRenderMixin = {
    shouldComponentUpdate( nextProps, nextState ){
        const { __pureRenderContext } = this;

        let yes = __pureRenderContext.__eval( this, nextProps );

        const { model } = this;
        
        if( model && model._changeToken != __pureRenderContext.__state ){
            __pureRenderContext.__state = model._changeToken;
            yes = true;
        }

        return yes;
    },

    componentDidMount(){
        this.__pureRenderContext.__changed = false;
    },

    componentDidUpdate(){
        this.__pureRenderContext.__changed = false;
    }
}


export interface PureRenderContext {
    __eval( component : Component, nextProps : object ) : boolean
    __state : any
    __changed : boolean
}

export type WatcherCallback = ( x? : any, propName? : string ) => void;

export function createPureRenderContext( _attributes : object ) : typeof PureRenderContext {
    const propNames = Object.keys( _attributes );

    if( !propNames.length ) return null;

    const PureRenderContext = new Function(``,`        
        this.__state = void 0;
        this.__changed = void 0;
        
        ${ needTokens.map( key => `
            this.${key} = void 0;
        `)}
    `);

    PureRenderContext.prototype = {
        __eval : new Function( 'component', 'nextProps', `
            var changed, props = component.props;

            ${ needTokens.map( key => `
                var ${key} = nextProps.${key};
                
                if( this.${key} !== ${tokenOf( _attributes[ key ].type, key )}){
                    this.${key} = ${tokenOf( _attributes[ key ].type, key )};
                    changed = true;
                }
            `).join('\n')}

            if( changed ) this.__changed = true;

            return this.__changed || ${ otherProps.map( name => `props.${name} !== nextProps.${name}`).join(' || ')};
        `)
    }

    return PureRenderContext;
}

function tokenOf( Ctor : Function, key : string ) : string{
    return  Ctor.prototype instanceof Transactional ? `( ${key} && ${key}._changeToken )` :
            Ctor === Date ? `( ${key} && ${key}.getTime() )` :
            key;
}
