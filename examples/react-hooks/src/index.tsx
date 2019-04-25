import { UseLocalStore, exposeStore } from "../../../src/store";
import { useEffect } from "react";

@define class PageStore extends Store {
        
}

const Page = exposeStore(
    PageStore,
    ({ store }) => {
        useEffect( () => {
            store.fetch();
        }, []);

        return (

        );
    }
);