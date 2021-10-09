import React from "react";
import CountableItemService from "../../../../services/CountableItemService";
import {Button, Table} from "react-bootstrap";
import CommonCheckAuthForInternalUsers from "../../../../services/CommonCheckAuthForInternalUsers";

class ViewAllCountableItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState

    }
    initialState={
        countableItems:[]
    }

    componentDidMount= async () => {
        await CountableItemService.getAllCountableItems()
            .then(response => response.data)
            .then((data) => {
                this.setState({countableItems:data});
            }).catch(error => {
                console.log("Cannot get all countable items. Error : ",error);
            })
    }

    navigateToConsumePage= (event,id) => {

        window.location =`/inventory/countable/consume/${id}`;

    }

    navigateToReplenishPage= (event,id) => {

        window.location =`/inventory/countable/replenish/${id}`;

    }

    render() {
        return (
            <div>
                <div>
                    <h2>Countable Items</h2>
                    <Table striped bordered hover variant={'light'}>
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Type</td>
                            <td>Quantity</td>
                            <td>Minimum Quantity</td>
                            <td>Site Id</td>
                            <td>Site Name</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.countableItems.length === 0?
                                <tr align={'center'}>
                                    <td colSpan={6}>{this.state.countableItems.length} records available</td>
                                </tr>:
                                this.state.countableItems.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.name}</td>
                                        <td>{e.type}</td>
                                        <td>{e.quantity}</td>
                                        <td>{e.minimumQuantity}</td>
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
export default CommonCheckAuthForInternalUsers(ViewAllCountableItems);