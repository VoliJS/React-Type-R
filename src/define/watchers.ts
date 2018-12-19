import { Component } from "react";
import { Transactional } from "type-r";

export interface WatchersContext {
    __eval( component : Component, nextProps : object ) : void
    __watchers : {
        [ propName : string ] : WatcherCallback
    }
}

export type WatcherCallback = ( x? : any, propName? : string ) => void;

export function createWatchersContext( _attributes : object ) : typeof WatchersContext {
    const watchers = getWatchersNames( _attributes );

    if( !watchers.length ) return null;

    const WatchersContext = new Function(``,`        
        ${ watchers.map( key => `
            this.${key} = void 0;
        `)}
    `);

    WatchersContext.prototype = {
        __eval : new Function( 'component', 'nextProps', `
            ${ watchers.map( key => `
                var ${key} = nextProps.${key};
                
                if( this.${key} !== ${tokenOf( _attributes[ key ].type, key )}){
                    this.${key} = ${tokenOf( _attributes[ key ].type, key )};
                    this.__watchers.${key}.call( component, ${key}, "${key}" );
                }
            `)}
        `),

        __watchers : {

        }
    }

    return WatchersContext;
}

function getWatchersNames( attrs ) {
    return [];
}

function tokenOf( Ctor : Function, key : string ) : string{
    return  Ctor.prototype instanceof Transactional ? `( ${key} && ${key}._changeToken )` :
            Ctor === Date ? `( ${key} && ${key}.getTime() )` :
            key;
}
