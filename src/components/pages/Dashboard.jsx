// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";

import NavigationAdmin from "../layouts/Navigation/NavigationAdmin";
import {Link} from "react-router-dom";

class Dashboard extends Component {

    divSection = {
        color: '#000000',
        margin: '20px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#212121',
        minHeight: '490px',
        textAlign: 'center'
    }

    render() {
        return (
            <div>
                <NavigationAdmin/>
                <Container>
                    <h1>DASHBOARD - ADMINISTRATOR</h1>

                    <section style={this.divSection}>
                        <div className={'row pt-5'}>
                            <div className={'col'}>
                                <Link to={'/project/list'} style={{textDecoration: 'none'}}>
                                    <Card className={''}>
                                        <Card.Body>
                                            <Card.Title>PROJECTS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/site/viewAllAdmin'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>SITES</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/supplier/list'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>SUPPLIERS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                        <div className={'row pt-3'}>
                            <div className={'col'}>
                                <Link to={'/order/list'} style={{textDecoration: 'none'}}>
                                    <Card className={''}>
                                        <Card.Body>
                                            <Card.Title>PURCHASE ORDERS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                              <Link to={'/inventory/main'} style={{textDecoration: 'none'}}>
                                    <Card className={''}>
                                        <Card.Body>
                                            <Card.Title>INVENTORY</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>

                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        );
    }
}

export default Dashboard;