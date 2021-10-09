import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

class NavigationAdmin extends Component {

    backColor = {
        backgroundColor: '#283593',
        color: 'white'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/dashboard/admin">Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="Project" id="collasible-nav-dropdown">
                                    <Link to={'/project/list'} className={'dropdown-item'}>Projects</Link>
                                </NavDropdown>
                                <NavDropdown title="Site" id="collasible-nav-dropdown">
                                    <Link to={'/site/viewAll'} className={'dropdown-item'}>Sites</Link>
                                    <Link to={'/site/addSite'} className={'dropdown-item'}>Add Sites</Link>
                                    <Link to={'/site/viewAllAdmin'} className={'dropdown-item'}>Sites(View)</Link>
                                </NavDropdown>
                                <NavDropdown title="Supplier" id="collasible-nav-dropdown">
                                    <Link to={'/supplier/list'} className={'dropdown-item'}>Suppliers</Link>
                                </NavDropdown>
                                <NavDropdown title="Order" id="collasible-nav-dropdown">
                                    <Link to={'/order/list'} className={'dropdown-item'}>Orders</Link>
                                </NavDropdown>
                                <NavDropdown title="Internal Users" id="collasible-nav-dropdown">
                                    <Link to={'/internal-user-register'} className={'dropdown-item'}>Register</Link>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationAdmin;