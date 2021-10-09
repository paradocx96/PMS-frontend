import React from "react";
import CountableItemService from "../../../../services/CountableItemService";

import {Button, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import Toast1 from "../../../Toasts/Toast1";
import CommonCheckAuthForInternalUsers from "../../../../services/CommonCheckAuthForInternalUsers";

class DeleteCountableItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        this.requestDelete = this.requestDelete.bind(this);
        this.performDelete = this.performDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);

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

    requestDelete = (id) => {

        confirmAlert({
                title:'Delete this entry?',
                message:'This cannot be undone',
                buttons:[
                    {
                        label:'I understand. Delete.',
                        onClick: this.performDelete.bind(this,id)
                    },
                    {
                        label:'Do not Delete',
                        onClick:this.cancelDelete.bind(this)
                    }
                ]
            }
        )

    }

    performDelete = async (id) => {
        await CountableItemService.deleteCountableItem(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        countableItems:this.state.countableItems.filter(countableItems =>
                            countableItems.id !== id)
                    })
                }
            }).catch(error => {
                console.log("Cannot delete item. Error: ",error);
            })
    }

    cancelDelete = () => {
        alert("Deletion Cancelled");
    }


    render() {
        return (
            <div>
                <div>

                    <div style={{"display": this.state.show ? "block" : "none"}}>

                        <Toast1

                            children={{
                                show: this.state.show,
                                message: "Item deleted successfully",
                                type: 'danger'
                            }}
                        />

                    </div>

                    <h2>Delete Countable Items</h2>

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
                                            <Button
                                                className={'btn btn-danger'}
                                                onClick={this.requestDelete.bind(this,e.id)}
                                            >
                                                Delete
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
export default CommonCheckAuthForInternalUsers(DeleteCountableItems);