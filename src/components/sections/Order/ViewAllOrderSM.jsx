// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import OrderService from "../../../services/OrderService";
import ProjectService from "../../../services/ProjectService";
import NavigationSiteManager from "../../layouts/Navigation/NavigationSiteManager";

class ViewAllOrderSM extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            orderList: [],
            siteManagerId: '5454654',
        }
        this.onHandlerProject = this.onHandlerProject.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    componentDidMount = async () => {
        await ProjectService.getByManagerId(this.state.siteManagerId)
            .then(response => response.data)
            .then((data) => {
                this.setState({projectList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    onHandlerProject = async (event) => {
        await OrderService.getByProjectId(event.target.value)
            .then(response => response.data)
            .then((data) => {
                this.setState({orderList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    submitDelete = (id, status) => {
        confirmAlert({
            title: 'Confirm to delete?',
            message: 'Are you sure to delete this Laptop.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.handleDelete(id, status);
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

    handleDelete = async (id, status) => {
        console.log(id);
        console.log(status);

        let value = {
            id: id,
            status: "Archive"
        }

        if (status === 'pending') {
            await OrderService.archive(value)
                .then(response => response.data)
                .then((data) => {
                    this.componentDidMount();
                }).catch(error => {
                    console.log(error.message);
                });
        } else {
            alert("Can't Delete Order!")
        }
    }

    divBox = {
        height: '50px'
    }

    render() {
        return (
            <div>
                <NavigationSiteManager/>
                <Container>
                    <h2>PURCHASE HISTORY</h2>

                    <section>
                        <div>
                            <Form>
                                <Form.Group as={Row} controlId="projectId" className={'pt-3'}>
                                    <Col sm={4}>
                                        <Form.Control required as="select"
                                                      name="projectId"
                                                      onChange={this.onHandlerProject}>

                                            <option>Select Project</option>
                                            {this.state.projectList.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.projectName}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </section>
                    <div style={this.divBox}/>

                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Reference No</th>
                            <th>Manager ID</th>
                            <th>Site ID</th>
                            <th>Project ID</th>
                            <th>Amount</th>
                            <th>Status</th>
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
                                this.state.orderList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.referenceNo}</td>
                                        <td>{item.siteManagerId}</td>
                                        <td>{item.siteId}</td>
                                        <td>{item.projectId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                        {
                                            item.status === 'Approved' ?
                                                <td>
                                                    <Link to={`/order/viewSm/` + item.id}
                                                          className={'btn btn-primary'}>View</Link>{'\u00A0'}
                                                    <Link to={`/delivery/addDeliverySm/` + item.id}
                                                          className={'btn btn-success'}>Delivery Log</Link>
                                                </td>
                                                : item.status === 'Archive' ?
                                                    <td>
                                                        <Link to={`/order/viewSm/` + item.id}
                                                              className={'btn btn-primary'}>View</Link>
                                                    </td>
                                                    : item.status === 'pending' ?
                                                        <td>
                                                            <Link to={`/order/viewSm/` + item.id}
                                                                  className={'btn btn-primary'}>View</Link>{'\u00A0'}
                                                            <Link to={`/delivery/addDeliverySm/` + item.id}
                                                                  className={'btn btn-success'}>Delivery
                                                                Log</Link>{'\u00A0'}
                                                            <Button
                                                                onClick={this.submitDelete.bind(this, item.id, item.status)}
                                                                className="btn-danger">Delete</Button>
                                                        </td>
                                                        :
                                                        <td>
                                                            <Link to={`/order/viewSm/` + item.id}
                                                                  className={'btn btn-primary'}>View</Link>{'\u00A0'}
                                                            <Link to={`/delivery/addDeliverySm/` + item.id}
                                                                  className={'btn btn-success'}>Delivery Log</Link>
                                                        </td>

                                        }
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

export default ViewAllOrderSM;