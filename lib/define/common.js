import { createContext } from 'react';
import { Store } from 'type-r';
// Context for the Type-R store
export var StoreContext = createContext(Store.global);
export var ExposeStore = StoreContext.Provider;
export var AccessStore = StoreContext.Consumer;
//# sourceMappingURL=common.js.map