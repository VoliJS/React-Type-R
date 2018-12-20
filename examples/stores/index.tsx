import * as React from 'react'

import { define, type, Collection, Store, Record, auto, subsetOf, CollectionConstructor } from "type-r";
import { localStoreComponent } from "../../src/builtins";

// Define 
@define class Role extends Record {
    static Collection : CollectionConstructor<Role>
    static endpoint = restfulIO( '/api/roles' );

    @auto name : string
    @subsetOf('store.users').as users : Collection<User>
}

@define class User extends Record {
    static Collection : CollectionConstructor<User>
    static endpoint = restfulIO( '/api/users' );

    @auto name : string
    @subsetOf('store.roles').as roles : Collection<Role>
}

@define class UsersPageStore extends Store {
    static endpoint = attributesIO();

    @type(User.Collection).as users : Collection<User>
    @type(Role.Collection).as roles : Collection<Role>

    initialize(){
        this.fetch();
    }
}

const UsersPage = ({ store } : { store : UsersPageStore }) => (
    store.hasPendingIO() ? (
        <div>
            { store.users.map( user => (
                <UserView key={user.cid} model={ user } />
            ))}
        </div>
    ) : <div>Loading...</div>
)

export default localStoreComponent( UsersPageStore, UsersPage );