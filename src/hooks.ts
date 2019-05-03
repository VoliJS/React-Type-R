import React, { useRef, createContext, useEffect, useReducer, useState, useContext } from 'react'
import { Model, Store, Transactional, Collection } from 'type-r'

export const StoreContext = createContext( null );

// Get store.
export function useStore(){
    return useContext( StoreContext );
}

// forceUpdate hook.
const MAX_INTEGER = 2^24,
    counter = x => x - 1 || MAX_INTEGER;

export function useForceUpdate() : () => void {
    const tuple = useReducer( counter, MAX_INTEGER );
    return tuple[ 1 ] as any;
}

class ModelOwner {
    model : Model
    store : Store

    silent = true;
    
    constructor( ModelClass : typeof Transactional, public forceUpdate ){
        const model = this.model = new ( ModelClass as any )();
        model._owner = this;
        model._key = 'state';
    }

    getStore(){
        return  this.store || ( this.model as any )._defaultStore || Store.global;
    }

    get( key : string ){
        // Ask upper store.
        const store = this.getStore();
        return store && store.get( key );
    }

    _onChildrenChange(){
        this.silent || this.forceUpdate();
    }

    dispose(){
        const { model } = this as any;
        model._key = model._owner = null;
        model.dispose();
        this.model = void 0;
    }
}

/**
 * Call on value change. Replaces props watchers.
 * @param value 
 * @param fun 
 */
export function useOnChange( value : any, action : ( prev :any ) => void ) : void {
    const prev = useRef( void 0 );

    if( value !== prev.current ){
        action( prev.current );
        prev.current = value;
    }
}

export function useEvents( value : any, events : object ) : void {
    const context = useRef({});

    useEffect( () => {
        value && value.on( events, context.current );
        return () => value && value.off( events, context.current );
    }, [ value ]);
}

/**
 * Call on value change and deep change. Replaces props watchers.
 * @param value 
 * @param fun 
 */
export function useOnDeepChange( value : any, action : () => void ) : void {
    const prev = useRef( void 0 ),
        next = ( value && value._changeToken ) || value;

    if( next !== prev.current ){
        action();
        prev.current = next;
    }
}

export function useMutableState<T extends ( typeof Model | typeof Collection )>( Class : T ) : InstanceType<T> {
    const state = useRef( null ),
          forceUpdate = useForceUpdate();

    // Make sure the state exists...
    let owner = state.current;
    if( !owner ){
        owner = state.current = new ModelOwner( Class, forceUpdate );
    }

    // Supress updates on the state changes until rendering will be finished.
    owner.silent = true;
    useEffect(()=> {
        owner.silent = false;
    });

    // Set the store.
    const store = useStore();
    if( owner.store !== store ){
        owner.store = store;
    }

    // Dispose state un unmount.
    useEffect( () => () => owner.dispose(), []);

    return owner.model;
}

export function useSharedObjects( ...objs : Transactional[] ){
    const forceUpdate = useForceUpdate(),
        context = useRef( {} );

    for( let obj of objs ){
        useEffect( () => {        
            obj.onChanges( forceUpdate, context.current as any );
        
            return () => {
                obj.offChanges( forceUpdate, context.current as any );
            }
        }, [ obj ] );
    }
}