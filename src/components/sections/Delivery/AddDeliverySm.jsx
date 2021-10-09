// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import NavigationSiteManager from "../../layouts/Navigation/NavigationSiteManager";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import OrderService from "../../../services/OrderService";
import DeliveryLogService from "../../../services/DeliveryLogService";

class AddDeliverySm extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            id: '',
            referenceNo: '',
            siteManagerId: '100',
            orderList: [],
            deliveryList: [],
            message: '',
            show: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onHandlerRemark = this.onHandlerRemark.bind();
        this.onHandlerStatus = this.onHandlerStatus.bind();
    }

    // Initializing default values
    initialState = {
        remark: '',
        status: ''
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        await this.fetch(params.id);
    }

    componentDidUpdate = async () => {
        const {match: {params}} = this.props;
        const prevID = this.state.id
        const currentID = params.id;
        if (currentID && currentID != '' && prevID != currentID) {
            await this.fetch(currentID);
        }
    }

    fetch = async (id) => {
        this.setState({id});

        await OrderService.getById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({orderList: data});
            }).catch(error =>
                console.log(error.message)
            );

        await DeliveryLogService.getByReferenceNo(this.state.orderList.referenceNo)
            .then(response => response.data)
            .then((data) => {
                this.setState({deliveryList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    // Assign form values to State variables
    onHandlerRemark = (event) => {
        this.setState({remark: event.target.value});
    }

    // Assign form values to State variables
    onHandlerStatus = (event) => {
        this.setState({status: event.target.value});
    }

    // Submit form values
    onSubmit = async (event) => {
        event.preventDefault();

        let value = {
            referenceNo: this.state.orderList.referenceNo,
            siteManagerId: this.state.orderList.siteManagerId,
            remark: this.state.remark,
            status: this.state.status
        }

        console.log(value);

        await DeliveryLogService.create(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error.message);
            });

        await this.onReset();
        await this.fetch(this.state.id);
    }

    // Reset form values
    onReset = () => {
        this.setState(() => this.initialState);
    }

    render() {
        return (
            <div>
                <NavigationSiteManager/>
                <Container>
                    <h2>Add Delivery Log</h2>

                    <section>
                        <h4>Order Id : {this.state.orderList.id}</h4>
                        <h4>Reference No : {this.state.orderList.referenceNo}</h4>

                    </section>

                    <section>
                        <Form onSubmit={this.onSubmit.bind(this)}
                              onReset={this.onReset.bind(this)}>

                            <Form.Group as={Row} controlId="Details" className={'pt-3'}>
                                <Col sm={6}>
                                    <Form.Control placeholder="Remark"
                                                  name="remark"
                                                  as="textarea"
                                                  rows={5}
                                                  required
                                                  value={this.state.remark}
                                                  onChange={this.onHandlerRemark}/>
                                </Col>
                                <Col sm={6}>
                                    <Form.Control placeholder="Status"
                                                  name="status"
                                                  as="textarea"
                                                  rows={5}
                                                  required
                                                  value={this.state.status}
                                                  onChange={this.onHandlerStatus}/>
                                </Col>
                            </Form.Group>

                            <Form.Group className={'pt-2'}>
                                <Col>
                                    <Button type="submit">SAVE</Button>{'\u00A0'}
                                    <Button type="reset" className="btn-danger">RESET</Button>{'\u00A0'}
                                </Col>
                            </Form.Group>

                        </Form>
                    </section>

                    <section className={'pt-5'}>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Remark</th>
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
                                    this.state.deliveryList.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.remark}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Button
                                                      className={'btn btn-danger'}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </section>
                </Container>
            </div>
        );
    }
}

export default AddDeliverySm;