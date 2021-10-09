// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import DraftOrderService from "../../../services/DraftOrderService";
import NavigationSiteManager from "../../layouts/Navigation/NavigationSiteManager";
import SiteService from "../../../services/SiteService";
import {Link} from "react-router-dom";

class ViewAllDraftOrderSM extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            siteList: [],
            projectList: [],
            DraftOrderList: [],
        }
        this.onHandlerSiteId = this.onHandlerSiteId.bind(this);
    }

    componentDidMount = async () => {
        await SiteService.getAllSites()
            .then(response => response.data)
            .then((data) => {
                this.setState({siteList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    onHandlerSiteId = async (event) => {
        await DraftOrderService.getBySiteId(event.target.value)
            .then(response => response.data)
            .then((data) => {
                this.setState({DraftOrderList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    divBox = {
        height: '50px'
    }

    render() {
        return (
            <div>
                <NavigationSiteManager/>
                <Container>
                    <h2>DRAFT ORDER HISTORY</h2>

                    <div>
                        <Form>
                            <Form.Group as={Row} controlId="siteId" className={'pt-3'}>
                                <Col sm={4}>
                                    <Form.Control required as="select"
                                                  name="siteId"
                                                  onChange={this.onHandlerSiteId}>

                                        <option>Select Site</option>
                                        {this.state.siteList.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.siteName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    <div style={this.divBox}/>

                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Supplier ID</th>
                            <th>Manager ID</th>
                            <th>Site ID</th>
                            <th>Project ID</th>
                            <th>Amount</th>
                            <th>Date Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.DraftOrderList.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.DraftOrderList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.supplierId}</td>
                                        <td>{item.siteManagerId}</td>
                                        <td>{item.siteId}</td>
                                        <td>{item.projectId}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.dateTime}</td>
                                        <td>
                                            <td>
                                                <Link to={`/draft/editSm/` + item.id}
                                                      className={'btn btn-primary'}>
                                                    PURCHASE DRAFT
                                                </Link>
                                            </td>
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

export default ViewAllDraftOrderSM;