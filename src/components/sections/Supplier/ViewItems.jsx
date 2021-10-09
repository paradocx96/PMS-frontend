import React, {Component} from 'react';
import SupplierService from "../../../services/SupplierService";
import {Button, Container,Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

class ViewItems extends Component {
    tableView = {
        borderRadius: '25px',
        backgroundColor: '#ffffff',
        padding: '10px',
        textAlign: 'left'
    }
    constructor(props) {
        super(props);
        this.submitDelete = this.submitDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            id:"",
            itemList: []
        }

    }

    componentDidMount= async () =>  {

        const user = await SupplierService.getCurrentSupplier();
        console.log(user);
        if (user) {
            this.setState({
                id: user.id,
            });
        }
        await SupplierService.getItemsBySupplierID(this.state.id)
            .then(response => response.data)
            .then((data) => {
                this.setState({itemList: data});
                console.log(data);
            }).catch(error =>
                console.log(error.message)
            );

    }
    // TODO: Function for Delete
    handleDelete = async (id) => {
        await SupplierService.deleteItemByID(id)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
            }).catch(error => {
                console.log(error.message);
            });

        await this.componentDidMount();
    }
    // TODO: Function for confirm delete operation
    submitDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete?',
            message: 'Are you sure to delete this Item.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.handleDelete(id);
                        console.log('Delete Operation Proceed!');
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log('Delete Operation Canceled!');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true
        });
    };

    render() {
        return (
            <div style={this.tableView}>
                <Container>
                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Quantity</th>
                            <th>Item Price</th>
                            <th>Edit Item</th>
                            <th>Delete Item</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.itemList.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.itemList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <Link to={`/edit-item/` + item.id}
                                                  className={'btn btn-primary'}>
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <Button onClick={this.submitDelete.bind(this, item.id)}
                                                    className="btn-danger">Delete</Button>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ViewItems;