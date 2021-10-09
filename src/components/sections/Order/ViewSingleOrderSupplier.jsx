// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Container, Table} from "react-bootstrap";
import DeliveryLogService from "../../../services/DeliveryLogService";
import OrderService from "../../../services/OrderService";
import SiteService from "../../../services/SiteService";
import NavigationSupplier from "../../layouts/Navigation/NavigationSupplier";

class ViewSingleOrderSupplier extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            id: '',
            orderList: [],
            siteList: [],
            deliveryList: [],
            isLoading: true,
            errors: null,
            show: false
        }
    }

    // Initializing default values
    initialState = {
        oid: '',
        referenceNo: '',
        supplierId: '',
        itemList: [],
        siteManagerId: '',
        siteId: '',
        projectId: '',
        amount: '',
        contactDetails: '',
        comment: '',
        dateTime: '',
        status: '',
        show: false
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
                this.setState({
                    oid: data.id,
                    referenceNo: data.referenceNo,
                    supplierId: data.supplierId,
                    itemList: data.itemList,
                    siteManagerId: data.siteManagerId,
                    siteId: data.siteId,
                    projectId: data.projectId,
                    amount: data.amount,
                    contactDetails: data.contactDetails,
                    comment: data.comment,
                    dateTime: data.dateTime,
                    status: data.status,
                    show: true
                });
            }).catch(error =>
                console.log(error.message)
            );

        await SiteService.getSiteById(this.state.siteId)
            .then(response => response.data)
            .then((data) => {
                this.setState({siteList: data});
            }).catch(error =>
                console.log(error.message)
            );

        await DeliveryLogService.getByReferenceNo(this.state.referenceNo)
            .then(response => response.data)
            .then((data) => {
                this.setState({deliveryList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    //Styles
    divCon = {
        backgroundColor: '#424242',
        paddingTop: '50px',
        paddingBottom: '50px',
    }

    divBox = {
        height: '50px'
    }

    divSection = {
        align: 'center',
        margin: 'auto',
        width: '700px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#000000',
        color: '#ffffff',
    }

    tabStyle = {
        color: '#ffffff'
    }

    tabItemStyle = {
        backgroundColor: '#6b6b6b',
        color: '#ffffff'
    }

    tabTdColor = {
        backgroundColor: '#79ff70',
        color: '#000000'
    }

    render() {
        return (
            <div>
                <NavigationSupplier/>
                <Container style={this.divCon}>
                    <section style={this.divSection}>
                        <Table style={this.tabStyle}>
                            <tbody>
                            <tr>
                                <td><h5>Order Id</h5></td>
                                <td>{this.state.oid}</td>
                            </tr>
                            <tr>
                                <td><h5>Reference No</h5></td>
                                <td>{this.state.referenceNo}</td>
                            </tr>
                            <tr>
                                <td><h5>Site</h5></td>
                                <td>{this.state.siteList.siteName}</td>
                            </tr>
                            <tr>
                                <td><h5>Site Manager</h5></td>
                                <td>{this.state.siteList.siteManager}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </section>

                    <div style={this.divBox}/>

                    <section style={this.divSection}>
                        <Table style={this.tabStyle}>
                            <tbody>
                            <tr>
                                <td><h5>Supplier Id</h5></td>
                                <td>{this.state.supplierId}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <h5>Items</h5>
                        <Table style={this.tabItemStyle}>
                            <tbody>
                            {
                                this.state.show === true ?
                                    this.state.itemList.length === 0 ?
                                        <tr>
                                            <td>{'Data Not Available!'}</td>
                                        </tr>
                                        :
                                        this.state.itemList.map((item) => (
                                            <tr key={item.itemId}>
                                                <td>{item.itemName}</td>
                                                <td>{item.itemCount}</td>
                                            </tr>
                                        ))
                                    :
                                    <tr>
                                        <td>{'Data Not Available!'}</td>
                                    </tr>
                            }
                            </tbody>
                        </Table>

                        <Table style={this.tabStyle}>
                            <tbody>
                            <tr>
                                <td><h5>Approval</h5></td>
                                <td style={this.tabTdColor}>{this.state.status}</td>
                            </tr>
                            <tr style={{color : '#ff0000'}}>
                                <td><h5>Total Amount</h5></td>
                                <td>{this.state.amount}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <div className={'row'}>
                            <div className={'col'}>
                                Comment : {this.state.comment}
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col'}>
                                Contact Details : {this.state.comment}
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className={'col'}>
                                Purchased Date : {this.state.dateTime}
                            </div>
                        </div>
                    </section>

                    <div style={this.divBox}/>

                    <section style={this.divSection}>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                            <tr>
                                <th>Delivery Remark</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.deliveryList.length === 0 ?
                                    <tr>
                                        <td>{'Data Not Available!'}</td>
                                    </tr>
                                    :
                                    this.state.deliveryList.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.remark}</td>
                                            <td>{item.status}</td>
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

export default ViewSingleOrderSupplier;