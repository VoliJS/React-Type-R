import { memberOf } from "type-r";

@define class PageState extends Record {
    static attributes = {
        selection : memberOf('store.users')
    }
}


@define class PageStore extends Store {
    static endpoint = attributesIO();

    static attributes = {
        users : User.Collection,
        ui : PageState
    }

    initialize(){
        this.fetch();
    }
}


@define class ApplicationPage extends Component {
    static state = PageStore;

    render(){
        return (
            <ExposeStore value={this.state}>

            </ExposeStore>
        );
    }
}

const Page = useStore( PageStore, ApplicationPage );

<AccessStore>
    store => (

    )
</AccessStore>


