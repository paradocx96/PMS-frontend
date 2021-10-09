// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import OrderService from "../../../services/OrderService";
import NavigationSiteManager from "../../layouts/Navigation/NavigationSiteManager";
import {Link} from "react-router-dom";
import NavigationAccountant from "../../layouts/Navigation/NavigationAccountant";

class ViewAllOrderAccountant extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            status: ''
        }

        this.onHandlerStatus = this.onHandlerStatus.bind();
        this.handleActivate = this.handleActivate.bind(this);
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

    onHandlerStatus = (event) => {
        this.setState({status: event.target.value});
    }

    //TODO: Function for activate
    handleActivate = async (id) => {
        let value = {
            id: id,
            status: this.state.status
        }

        await OrderService.updateStatus(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
            }).catch(error => {
                console.log(error.message);
            })

        await this.componentDidMount();
    }

    render() {
        return (
            <div>
                <NavigationAccountant/>
                <Container>
                    <h2>PURCHASE HISTORY</h2>

                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Reference No</th>
                            <th>Manager ID</th>
                            <th>Site ID</th>
                            <th>Project ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Approval</th>
                            <th>Action</th>
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
                                        <td>
                                            <Form>
                                                <Form.Group controlId="status" className={'pt-3'}>
                                                    <Form.Control required as="select"
                                                                  name="status"
                                                                  onChange={this.onHandlerStatus}>
                                                        <option>Select Site</option>
                                                        <option>Pending</option>
                                                        <option>Waiting for Approval</option>
                                                        <option>Requisition Manager Approval</option>
                                                        <option>Approved</option>
                                                        <option>Partially Approved</option>
                                                        <option>Declined</option>
                                                        <option>Placed</option>
                                                        <option>Referred</option>
                                                        <option>Returned to Originator</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form>
                                            <Button onClick={this.handleActivate.bind(this, item.id)}
                                                    className="btn-success">Set Status</Button>
                                        </td>
                                        <td>
                                            <Link to={`/order/viewAcc/` + item.id}
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

export default ViewAllOrderAccountant;