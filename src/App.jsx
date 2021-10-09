// Import React stuff
import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';

// Import Style
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import LoginSupplier from "./components/pages/LoginSupplier";
import HeaderBar from "./components/layouts/Header/HeaderBar";
import LoginInternalUser from "./components/pages/LoginInternalUser";
import RegistrationSupplier from "./components/pages/RegistrationSupplier";
import RegistrationInternalUser from "./components/pages/RegistrationInternalUser";

// Dashboard
import Dashboard from "./components/pages/Dashboard";
import DashboardSiteManager from "./components/pages/DashboardSiteManager";
import DashboardSeniorManager from "./components/pages/DashboardSeniorManager";
import DashboardAccountant from "./components/pages/DashboardAccountant";
import ViewAllSupplierAdmin from "./components/sections/Supplier/ViewAllSupplierAdmin";
import DashboardSupplier from "./components/pages/DashboardSupplier";


//Site
import AddSite from "./components/sections/Site/AddSite";
import Site from "./components/pages/Site";
import ViewAllSites from "./components/sections/Site/ViewAllSites";
import ViewAllSiteAdmin from "./components/sections/Site/ViewAllSiteAdmin";


//Inventory
import AddCountableItem from "./components/sections/Inventory/CountableItems/AddCountableItem";
import ViewAllCountableItems from "./components/sections/Inventory/CountableItems/ViewAllCountableItems";
import ConsumeCountableItems from "./components/sections/Inventory/CountableItems/ConsumeCountableItems";
import ReplenishCountableItems from "./components/sections/Inventory/CountableItems/ReplenishCountableItems";
import AddUncountableItem from "./components/sections/Inventory/UncountableItems/AddUncountableItem";
import ViewAllUncountableItems from "./components/sections/Inventory/UncountableItems/ViewAllUncountableItems";
import ConsumeUncountableItems from "./components/sections/Inventory/UncountableItems/ConsumeUncountableItems";
import ReplenishUncountableItems from "./components/sections/Inventory/UncountableItems/ReplenishUncountableItems";
import DeleteUncountableItems from "./components/sections/Inventory/UncountableItems/DeleteUncountableItems";
import DeleteCountableItems from "./components/sections/Inventory/CountableItems/DeleteCountableItems";
import Inventory from "./components/pages/Inventory";


//Project
import AddProjectSM from "./components/sections/Project/AddProjectSM";
import ViewAllProjectSM from "./components/sections/Project/ViewAllProjectSM";
import ViewAllProjectAdmin from "./components/sections/Project/ViewAllProjectAdmin";
import EditProjectSM from "./components/sections/Project/EditProjectSM";


//Order
import AddOrderSM from "./components/sections/Order/AddOrderSM";
import ViewAllOrderSM from "./components/sections/Order/ViewAllOrderSM";
import ViewAllDraftOrderSM from "./components/sections/Order/ViewAllDraftOrderSM";
import AddDeliverySm from "./components/sections/Delivery/AddDeliverySm";
import ViewSingleOrderSM from "./components/sections/Order/ViewSingleOrderSM";
import ViewAllOrderAccountant from "./components/sections/Order/ViewAllOrderAccountant";
import ViewSingleOrderAccountant from "./components/sections/Order/ViewSingleOrderAccountant";
import ViewAllOrderSeManager from "./components/sections/Order/ViewAllOrderSeManager";
import EditDraftOrderSm from "./components/sections/Order/EditDraftOrderSM";
import AddOrderAcc from "./components/sections/Order/AddOrderAcc";
import ViewAllOrderAdmin from "./components/sections/Order/ViewAllOrderAdmin";
import ViewSingleOrderSeManager from "./components/sections/Order/ViewSingleOrderSeManager";
import ViewAllOrderSupplier from "./components/sections/Order/ViewAllOrderSupplier";


//Supplier
import AddSupplierItem from "./components/pages/AddSupplierItem";
import ViewAllItems from "./components/pages/ViewAllItems";
import UpdateSupplierItem from "./components/sections/Supplier/UpdateSupplierItem";
import ViewSingleOrderSupplier from "./components/sections/Order/ViewSingleOrderSupplier";
import FooterBar from "./components/layouts/Footer/FooterBar";


function App() {
    return (
        <div>
            <Router>
                <HeaderBar/>
                <Switch>
                    {/* USER MANAGEMENT */}
                    <Route exact path="/" component={LoginSupplier}/>
                    <Route exact path="/internal-user-login" component={LoginInternalUser}/>
                    <Route exact path="/register" component={RegistrationSupplier}/>
                    <Route exact path="/internal-user-register" component={RegistrationInternalUser}/>


                    {/* DASHBOARD */}
                    <Route path="/dashboard/admin" component={Dashboard}/>
                    <Route path="/dashboard/site" component={DashboardSiteManager}/>
                    <Route path="/dashboard/senior" component={DashboardSeniorManager}/>
                    <Route path="/dashboard/accountant" component={DashboardAccountant}/>
                    <Route path="/supplier/list" component={ViewAllSupplierAdmin}/>
                    <Route path="/dashboard/supplier" component={DashboardSupplier}/>


                    {/* SITE */}
                    <Route path={'/site'} exact component={Site}/>
                    <Route path="/site/addSite" component={AddSite}/>
                    <Route path="/site/viewAll" component={ViewAllSites}/>
                    <Route path="/site/viewAllAdmin" component={ViewAllSiteAdmin}/>

                    {/* INVENTORY */}
                    {/*inventory*/}
                    <Route path="/inventory/main" component={Inventory}/>

                    {/*countable Items*/}
                    <Route path="/inventory/countable/addItem" component={AddCountableItem}/>
                    <Route path="/inventory/countable/viewAll" component={ViewAllCountableItems}/>
                    <Route path="/inventory/countable/delete" component={DeleteCountableItems}/>
                    <Route path="/inventory/countable/consume/:id" component={ConsumeCountableItems}/>
                    <Route path="/inventory/countable/replenish/:id" component={ReplenishCountableItems}/>

                    {/*uncountable items*/}
                    <Route path="/inventory/uncountable/addItem" component={AddUncountableItem}/>
                    <Route path="/inventory/uncountable/viewAll" component={ViewAllUncountableItems}/>
                    <Route path="/inventory/uncountable/delete" component={DeleteUncountableItems}/>
                    <Route path="/inventory/uncountable/consume/:id" component={ConsumeUncountableItems}/>
                    <Route path="/inventory/uncountable/replenish/:id" component={ReplenishUncountableItems}/>


                    {/* PROJECT */}
                    <Route path={'/project/addProjectSm'} component={AddProjectSM}/>
                    <Route path={'/project/editProjectSm/:id'} component={EditProjectSM}/>
                    <Route path={'/project/listSm'} component={ViewAllProjectSM}/>
                    <Route path={'/project/list'} component={ViewAllProjectAdmin}/>


                    {/* ORDER */}
                    <Route path={'/order/addOrderSm'} component={AddOrderSM}/>
                    <Route path={'/order/addOrderAcc'} component={AddOrderAcc}/>
                    <Route path={'/order/list'} component={ViewAllOrderAdmin}/>
                    <Route path={'/order/listSm'} component={ViewAllOrderSM}/>
                    <Route path={'/order/listAcc'} component={ViewAllOrderAccountant}/>
                    <Route path={'/order/listSem'} component={ViewAllOrderSeManager}/>
                    <Route path={'/order/listSup'} component={ViewAllOrderSupplier}/>
                    <Route path={'/order/viewSm/:id'} component={ViewSingleOrderSM}/>
                    <Route path={'/order/viewAcc/:id'} component={ViewSingleOrderAccountant}/>
                    <Route path={'/order/viewSem/:id'} component={ViewSingleOrderSeManager}/>
                    <Route path={'/order/viewSup/:id'} component={ViewSingleOrderSupplier}/>


                    {/* DRAFT ORDER */}
                    <Route path={'/draft/listSm'} component={ViewAllDraftOrderSM}/>
                    <Route path={'/draft/editSm/:id'} component={EditDraftOrderSm}/>


                    {/* DELIVERY */}
                    <Route path={'/delivery/addDeliverySm/:id'} component={AddDeliverySm}/>

                    {/*SUPPLIER*/}
                    <Route path={'/add-items'} component={AddSupplierItem}/>
                    <Route path={'/view-items'} component={ViewAllItems}/>
                    <Route path={'/edit-item/:id'} component={UpdateSupplierItem}/>

                    {/* DEFAULT PATH */}
                    <Redirect to="/"/>
                </Switch>
            </Router>
            <FooterBar/>
        </div>
    );
}

export default App;
