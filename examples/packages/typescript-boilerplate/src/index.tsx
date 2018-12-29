import React, { define, Component } from 'react-type-r'
import ReactDOM from 'react-dom'
import { Record, CollectionConstructor } from 'type-r'

import './styles.css'
import { type } from 'type-r';

@define class Item extends Record {
    static Collection : CollectionConstructor<Item>
    
    @type( String ).as  text : string
}

@define class Application extends Component<typeof Application> {
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

const ItemView = ({ item } : { item : Item }) => (
    <input { ...item.linkAt( 'text' ).props } /> 
);

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );