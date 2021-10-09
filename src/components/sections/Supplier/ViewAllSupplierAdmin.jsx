// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import SupplierService from "../../../services/SupplierService";
import NavigationAdmin from "../../layouts/Navigation/NavigationAdmin";
import {Container, Table} from "react-bootstrap";

class ViewAllSupplierAdmin extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            supplierList: []
        }
    }

    componentDidMount = async () => {
        await SupplierService.getAll()
            .then(response => response.data)
            .then((data) => {
                this.setState({supplierList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    render() {
        return (
            <div>
                <div>
                    <NavigationAdmin/>
                    <Container>
                        <h2>SUPPLIER LIST</h2>

                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.supplierList.length === 0 ?
                                    <tr>
                                        <td>{'Data Not Available!'}</td>
                                    </tr>
                                    :
                                    this.state.supplierList.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.contactNo}</td>
                                            <td>{item.address}</td>
                                            <td>{item.location}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ViewAllSupplierAdmin;