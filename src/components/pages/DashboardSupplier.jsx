import React, {Component} from 'react';

import NavigationSupplier from "../layouts/Navigation/NavigationSupplier";
import {Link} from "react-router-dom";
import {Card, Container} from "react-bootstrap";

class DashboardSupplier extends Component {

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
                <NavigationSupplier/>
                <Container>
                    <h1>DASHBOARD - SUPPLIER</h1>
                    <section style={this.divSection}>
                        <div className={'row pt-5'}>
                            <div className={'col'}>
                                <Link to={'/view-items'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>ITEMS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/add-items'} style={{textDecoration: 'none'}}>
                                    <Card className={''}>
                                        <Card.Body>
                                            <Card.Title>NEW ITEM</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/order/listSup'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>ORDER</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </section>
                </Container>
            </div>
        );
    }
}

export default DashboardSupplier;