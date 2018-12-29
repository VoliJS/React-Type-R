import React, { define } from 'react-type-r'
import ReactDOM from 'react-dom'
import { Record } from 'type-r'

import './styles.css'

@define class Item extends Record {
    static attributes = {
        text : String
    }
}

@define class Application extends React.Component {
    static state = {
        items : Item.Collection
    };

    render(){
        const { state } = this;

        return (
            <div>
                <button onClick={ () => state.items.add({}) }>
                    Add
                </button>
                
                { state.items.map( item => (
                    <ItemView key={ item.cid } item={ item } /> 
                ))}
            </div>
        );
    }
}

const ItemView = ({ item }) => (
    <input { ...item.linkAt( 'text' ).props } /> 
);

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );