import * as PropTypes from 'prop-types'

import { ChangeHandler, Record } from 'type-r';
import { ComponentProto } from './common';

export interface TypeSpecs {
    [ name : string ] : object | Function
}

export function compileSpecs( props : TypeSpecs ){
    const propTypes = {},
        // Create NestedTypes model definition to process props spec.
        modelProto = Record.defaults( props ).prototype;

    let defaults,
        watchers : { [ name : string ] : PropWatcher },
        changeHandlers : { [ name : string ] : ChangeHandler[] };

    for( let spec of modelProto._attributesArray ){
        const { name } = spec;
    
        // Skip auto-generated `id` attribute.
        if( name !== 'id' ){
            const { value, type, options } = spec;

            // Translate props type to the propTypes guard.
            propTypes[ name ] = translateType( type, options.isRequired );

            if( options._onChange ){
                watchers || ( watchers = {} );
                watchers[ name ] = toLocalWatcher( options._onChange );
            }

            // Handle listening to event maps...
            if( options.changeHandlers && options.changeHandlers.length ){
                changeHandlers || ( changeHandlers = {} );
                changeHandlers[ name ] = options.changeHandlers;
            }

            // Handle listening to props changes...
            if( options.changeEvents ){
                changeHandlers || ( changeHandlers = {} );
                const handlers = changeHandlers[ name ] || ( changeHandlers[ name ] = [] ),
                    changeEvents = typeof options.changeEvents === 'string' ? options.changeEvents : null;

                handlers.push( 
                    function( next, prev, component : any ){
                        prev && component.stopListening( prev );
                        next && component.listenTo( next, changeEvents || next._changeEventName, component.asyncUpdate );
                    }
                );
            }

            // If default value is explicitly provided...
            if( value !== void 0 ){
                //...append it to getDefaultProps function.
                defaults || ( defaults = {} );
                defaults[ name ] = spec.convert( value, void 0, null, {} );
            }
        }
    }

    return { propTypes, defaults, watchers, changeHandlers };
}

type PropWatcher = ( this : ComponentProto, propValue : any, propName : string ) => void

function toLocalWatcher( ref ) : PropWatcher {
    return typeof ref === 'function' ? ref : function( value, name ){
        this[ ref ] && this[ ref ]( value, name );
    }
}

export class Node {}
export class Element {}

function translateType( Type : Function, isRequired : boolean ){
    const T = _translateType( Type );
    return isRequired ? T.isRequired : T;
}

export type PropTypeValidator = (props : object, propName : string, componentName : string ) => Error

function _translateType( Type : Function ) : PropTypeValidator {
    switch( Type ){
        case Symbol : 
            return createSimpleValidator( 'symbol' );
        case Number : 
            return createSimpleValidator( 'number' );
        case String :
            return createSimpleValidator( 'string' );
        case Boolean :
            return createSimpleValidator( 'boolean' );;
        case Array :
            return (props, propName, componentName) => (
                assert(
                    Array.isArray( props[ propName ] ),
                    propName, componentName, 'an Array'
                )
            )
        case Function :
            return createSimpleValidator( 'function' );;
        case Object :
            return createSimpleValidator( 'object' );;
        case Node :
            return (props, propName, componentName) => void 0;
        case Element :
            return (props, propName, componentName) => void 0;
        case void 0 :
        case null :
            return (props, propName, componentName) => void 0;
        default:
            return (props, propName, componentName) => (
                assert(
                    !props[ propName ] || props[ propName ] instanceof Type,
                    propName, componentName, Type.name
                )
            );
    }
}

function createSimpleValidator( type ){
    return (props, propName, componentName) => (
        assert(
            typeof props[ propName ] === type,
            propName, componentName, 'a ' + type 
        )
    )
}

function assert( good, propName, componentName, type ){
    return good ? void 0 : new Error(
        'Prop `' + propName + '` supplied to' +
        ' `' + componentName + '` must be ' + type
    );
}