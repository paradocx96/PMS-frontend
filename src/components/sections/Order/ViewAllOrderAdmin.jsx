// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import OrderService from "../../../services/OrderService";
import NavigationAdmin from "../../layouts/Navigation/NavigationAdmin";
import {Container, Table} from "react-bootstrap";

class ViewAllOrderAdmin extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
        }
    }

    componentDidMount = async () => {
        await OrderService.getAll()
            .then(response => response.data)
            .then((data) => {
                this.setState({orderList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    render() {
        return (
            <div>
                <NavigationAdmin/>

                <Container>
                    <h2>PURCHASE ORDERS</h2>

                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Reference No</th>
                            <th>Manager ID</th>
                            <th>Site ID</th>
                            <th>Project ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderList.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.orderList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.referenceNo}</td>
                                        <td>{item.siteManagerId}</td>
                                        <td>{item.siteId}</td>
                                        <td>{item.projectId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
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

export default ViewAllOrderAdmin;