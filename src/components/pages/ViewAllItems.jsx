import React, {Component} from 'react';
import ViewItemsSection from "../sections/Supplier/ViewItems";
import NavigationSupplier from "../layouts/Navigation/NavigationSupplier";

class ViewAllItems extends Component {
    render() {
        return (
            <div>
                <NavigationSupplier/>
                <ViewItemsSection/>
            </div>
        );
    }
}

export default ViewAllItems;