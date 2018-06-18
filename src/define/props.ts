/**
 * Handle props specification and everything which is related:
 * - local listening to props changes
 * - pure render mixin
 */

import { compileSpecs, TypeSpecs } from './typeSpecs'
import { WatchersMixin, PropsChangesMixin, createChangeTokensConstructor } from './propUpdatesTracking'
import { tools } from 'type-r'
import { ComponentClass } from './common'

export interface PropsDefinition {
    pureRender? : boolean
    props : TypeSpecs
}

export interface PropsProto {
    pureRender? : boolean
    _props? : TypeSpecs
    _watchers? : any
    _changeHandlers? : any
    PropsChangeTokens? : any
}

export default function onDefine( this : ComponentClass<PropsProto>, { props, pureRender } : PropsDefinition, BaseClass : ComponentClass<PropsProto> ){
    const { prototype } = this;

    // process props spec...
    if( props ){
        // Merge with inherited members.
        prototype._props = tools.defaults( props, BaseClass.prototype._props || {} );

        // Compile props spec.
        const { propTypes, defaults, watchers, changeHandlers } = compileSpecs( props );

        this.propTypes = propTypes;

        if( defaults ) this.defaultProps = defaults;

        // Watchers require props updates tracking.
        if( watchers ){
            prototype._watchers = watchers;
            this.mixins.merge([ WatchersMixin ]);
        }

        if( changeHandlers ){
            prototype._changeHandlers = changeHandlers;
            this.mixins.merge([ ChangeHandlersMixin ]);
        }

        // If pure render is defined in parent and props have changed,
        // or if we have watchers defined, we need a new constructor.
        if( prototype.pureRender || watchers ){
            this.mixins.merge([ PropsChangesMixin ]);
            prototype.PropsChangeTokens = createChangeTokensConstructor( props, watchers );
        }
    }
    else if( pureRender ){
        // If pure render is defined, need a new construtor even if props has not been defined.
        this.mixins.merge([ PropsChangesMixin ]);
        prototype.PropsChangeTokens = createChangeTokensConstructor( prototype._props, prototype._watchers );
    }
}

/**
 * ChangeHandlers are fired in sequence upon props replacement.
 * Fires _after_ UI is updated. Used for managing events subscriptions.
 */
const ChangeHandlersMixin = {
    componentDidMount(){
        handlePropsChanges( this, {}, this.props );
    },

    componentDidUpdate( prev ){
        handlePropsChanges( this, prev, this.props );
    },

    componentWillUnmount(){
        handlePropsChanges( this, this.props, {} );
    }
};

function handlePropsChanges( component : any, prev : object, next : object ){
    const { _changeHandlers } = component;
    
    for( let name in _changeHandlers ){
        if( prev[ name ] !== next[ name ] ){
            for( let handler of _changeHandlers[ name ] ){
                handler( next[ name ], prev[ name ], component );
            }
        }
    }
}