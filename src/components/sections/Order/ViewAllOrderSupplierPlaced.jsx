// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import OrderService from "../../../services/OrderService";
import {Link} from "react-router-dom";
import NavigationSupplier from "../../layouts/Navigation/NavigationSupplier";

class ViewAllOrderSupplierPlaced extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            orderListPlaced: [],
            orderListDeclined: [],
            status: ''
        }
    }

    componentDidMount = async () => {
        await OrderService.getByStatus('Placed')
            .then(response => response.data)
            .then((data) => {
                this.setState({orderListPlaced: data});
            }).catch(error =>
                console.log(error.message)
            );

        await OrderService.getByStatus('Declined')
            .then(response => response.data)
            .then((data) => {
                this.setState({orderListDeclined: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

// <option>Declined</option>
// <option>Placed</option>
// <option>Returned to Originator</option>

    render() {
        return (
            <div>
                <NavigationSupplier/>
                <Container>
                    <h2>PLACED ORDERS HISTORY</h2>
                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Reference No</th>
                            <th>Manager ID</th>
                            <th>Site ID</th>
                            <th>Project ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderListPlaced.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.orderListPlaced.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.referenceNo}</td>
                                        <td>{item.siteManagerId}</td>
                                        <td>{item.siteId}</td>
                                        <td>{item.projectId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <Link to={`/order/viewSup/` + item.id}
                                                  className={'btn btn-primary'}>
                                                View Order
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Container>
                <Container>
                    <h2>DECLINED ORDERS HISTORY</h2>
                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Reference No</th>
                            <th>Manager ID</th>
                            <th>Site ID</th>
                            <th>Project ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.orderListDeclined.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.orderListDeclined.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.referenceNo}</td>
                                        <td>{item.siteManagerId}</td>
                                        <td>{item.siteId}</td>
                                        <td>{item.projectId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <Link to={`/order/viewSup/` + item.id}
                                                  className={'btn btn-primary'}>
                                                View Order
                                            </Link>
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

export default ViewAllOrderSupplierPlaced;