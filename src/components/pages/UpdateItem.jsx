import React, {Component} from 'react';
import UpdateSupplierItemSection from "../sections/Supplier/UpdateSupplierItem";
import NavigationSupplier from "../layouts/Navigation/NavigationSupplier";
class UpdateItem extends Component {
    render() {
        return (
            <div>
                <NavigationSupplier/>
                <UpdateSupplierItemSection/>
            </div>
        );
    }
}

export default UpdateItem;