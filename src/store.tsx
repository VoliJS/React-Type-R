import React, { useRef, createContext, useEffect, useReducer, useState, useContext } from 'react'
import { Model, Store } from 'type-r'
import { StoreContext, useModel, useGlobalModel } from './hooks'

export const UseLocalStore = ({ type, children } : { type : typeof Store, children : JSX.Element[] } ) => {
    // Create store...
    const store = useModel( type );

    // Expose store.
    return (
        <StoreContext.Provider value={store}>
            { children }
        </StoreContext.Provider>
    );
}

export const UseGlobalStore = ({ ref, children } : { ref : Store, children : JSX.Element[] }) => {
    useGlobalModel( ref );

    return (
        <StoreContext.Provider value={ref}>
            { children }
        </StoreContext.Provider>
    );
}