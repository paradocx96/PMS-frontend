import React, {Component} from 'react';
import AddSupplierItemSection from "../sections/Supplier/AddSupplierItem";
import NavigationSupplier from "../layouts/Navigation/NavigationSupplier";
class AddSupplierItem extends Component {
    render() {
        return (
            <div>
                <NavigationSupplier/>
                <AddSupplierItemSection/>
            </div>
        );
    }
}

export default AddSupplierItem;