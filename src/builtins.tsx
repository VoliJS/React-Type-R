import { Component } from './component'
import { Store, define, InferAttrs, Record } from 'type-r'
import { ExposeStore } from './define/context'

/**
 * Connect Store class to the component and expose it to the component subtree.
 * @param StoreClass 
 * @param ComponentClass 
 */
export function localStoreComponent<S extends typeof Store>( StoreClass : S, ComponentClass : Function ){
    @define class LocalStoreComponent extends Component<{}, InstanceType<S>> {
        static State = StoreClass;

        get( key ){
            // Ask an upper store.
            const store = this.getStore();
            return store && store.get( key );
        }

        render(){
            const { children, ...props } = this.props;
            return (
                <ExposeStore value={this.state}>
                    <ComponentClass {...props} store={this.state}>
                        {children}
                    </ComponentClass>
                </ExposeStore>
            )
        }
    }

    return LocalStoreComponent;
}

/**
 * Connect external store.
 * @param store 
 * @param ComponentClass 
 */
export function externalStoreComponent<S extends Store, P>( store : S, ComponentClass : Function ){
    @define class ExternalStoreComponent extends Component<{}, S> {
        store = store;

        render(){
            const { children, ...props } = this.props;
            return (
                <ExposeStore value={this.store}>
                    <ComponentClass {...props} store={this.store}>
                        {children}
                    </ComponentClass>
                </ExposeStore>
            )
        }

        componentDidMount(){
            this.listenTo( this.store, 'change', this.asyncUpdate );            
        }
    }

    return ExternalStoreComponent;
}

// TODO: Create experimental syntax for binding functional components.
export function statefulComponent<S extends typeof Record>( StateClass : S, ComponentClass : Function ){
    @define class StatefulComponent extends Component<{}, InstanceType<S>> {
        static state = StateClass;

        render(){
            const { children, ...props } = this.props;
            return <ComponentClass {...props} state={this.state}>
                    {children}
            </ComponentClass>
        }
    }

    return StatefulComponent;
}

