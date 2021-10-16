import React from "react";
import UncountableItemService from "../../../../services/UncountableItemService";
import {Button, Table} from "react-bootstrap";
import CommonCheckAuthForInternalUsers from "../../../../services/CommonCheckAuthForInternalUsers";
import InternalUserService from "../../../../services/InternalUserService";
import NavigationAdmin from "../../../layouts/Navigation/NavigationAdmin";
import NavigationSiteManager from "../../../layouts/Navigation/NavigationSiteManager";
import NavigationSeniorManager from "../../../layouts/Navigation/NavigationSeniorManager";

class ViewAllUncountableItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const user = InternalUserService.getCurrentInternalUser();

        this.state.role = user.roles[0];

    }
    initialState={
        uncountableItems:[]
    }

    componentDidMount = async () => {
        await UncountableItemService.getAllUncountableItems()
            .then(response => response.data)
            .then((data) => {
                this.setState({uncountableItems:data});
            }).catch(error => {
                console.log("Cannot get all items. Error: ",error);
            })
    }

    navigateToConsumePage= (event,id) => {

        window.location =`/inventory/uncountable/consume/${id}`;

    }

    navigateToReplenishPage= (event,id) => {

        window.location =`/inventory/uncountable/replenish/${id}`;

    }

    render() {
        return (
            <div>

                {this.state.role === 'ROLE_ADMIN' ?
                    <NavigationAdmin />:
                    this.state.role == 'ROLE_SITE_MANAGER'?
                        <NavigationSiteManager/>:
                        this.state.role === "ROLE_SENIOR_MANAGER"?
                            <NavigationSeniorManager/>:
                            <div></div>
                }

                <div className={'container-fluid'}>
                    <h2>Uncountable Items</h2>
                    <Table striped bordered hover variant={'light'}>
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Type</td>
                            <td>Unit</td>
                            <td>Amount</td>
                            <td>Minimum Amount</td>
                            <td>Site Id</td>
                            <td>Site Name</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.uncountableItems.length === 0?
                                <tr align={'center'}>
                                    <td colSpan={6}>{this.state.uncountableItems.length} records available</td>
                                </tr>:
                                this.state.uncountableItems.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.type}</td>
                                        <td>{e.unit}</td>
                                        <td>{e.amount}</td>
                                        <td>{e.minimumAmount}</td>
                                        <td>{e.siteid}</td>
                                        <td>{e.sitename}</td>

                                        <td>
                                            <Button className={'btn btn-info'}
                                                    onClick={event => this.navigateToConsumePage(this,e.id)}
                                            >
                                                Consume
                                            </Button>


                                        </td>

                                        <td>
                                            <Button className={'btn btn-success'}
                                                    onClick={event => this.navigateToReplenishPage(this,e.id)}
                                            >
                                                Replenish
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }

}

export default CommonCheckAuthForInternalUsers(ViewAllUncountableItems);