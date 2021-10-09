// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';

import NavigationSeniorManager from "../layouts/Navigation/NavigationSeniorManager";
import {Link} from "react-router-dom";
import {Card, Container} from "react-bootstrap";


class DashboardSeniorManager extends Component {

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
                <NavigationSeniorManager/>
                <Container>
                    <h1>DASHBOARD - SENIOR MANAGER</h1>

                    <section style={this.divSection}>
                        <div className={'row pt-5'}>
                            <div className={'col'}>
                                <Link to={'/site/viewAll'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>SITES</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/site/addSite'} style={{textDecoration: 'none'}}>
                                    <Card className={''}>
                                        <Card.Body>
                                            <Card.Title>NEW SITE</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/order/listSem'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>ORDER REQUISITIONS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                        <div className={'row pt-5'}>
                            <div className={'col'}>
                                <Link to={'/inventory/main'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>INVENTORY</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/project/listSm'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>PROJECTS</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            <div className={'col'}>
                                <Link to={'/project/addProjectSm'} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>NEW PROJECT</Card.Title>
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

export default DashboardSeniorManager;