// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';

import NavigationAccountant from "../layouts/Navigation/NavigationAccountant";
import {Link} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

class DashboardAccountant extends Component {

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
                <NavigationAccountant/>
                <Container>
                    <h1>DASHBOARD - ACCOUNTANT</h1>

                    <section style={this.divSection}>
                        <div className={'row pt-5'}>
                            <div className={'col'}>
                                <Link to={'/order/listAcc'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>ORDERS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/order/addOrderAcc'} style={{textDecoration: 'none'}}>
                                    <Card className={''}>
                                        <Card.Body>
                                            <Card.Title>PURCHASE ORDER</Card.Title>
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

export default DashboardAccountant;