import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class NavigationSeniorManager extends Component {

    backColor = {
        backgroundColor: '#283593',
        color: 'white'
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/dashboard/senior">Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <NavDropdown title="Site" id="collasible-nav-dropdown">
                                    <Link to={'/site/viewAll'} className={'dropdown-item'}>Sites</Link>
                                    <Link to={'/site/addSite'} className={'dropdown-item'}>Add Site</Link>
                                </NavDropdown>
                                <NavDropdown title="Project" id="collasible-nav-dropdown">
                                    <Link to={'/project/listSm'} className={'dropdown-item'}>Projects</Link>
                                    <Link to={'/project/addProjectSm'} className={'dropdown-item'}>Add Project</Link>
                                </NavDropdown>
                                <NavDropdown title="Orders" id="collasible-nav-dropdown">
                                    <Link to={'/order/listAcc'} className={'dropdown-item'}>Management</Link>
                                    <Link to={'/order/listSem'} className={'dropdown-item'}>View Requisitions</Link>
                                </NavDropdown>

                                <NavDropdown title="Inventory" id="collasible-nav-dropdown">
                                    <Link to={'/inventory/main'} className={'dropdown-item'}>Inventory</Link>
                                    <Link to={'/inventory/countable/viewAll'} className={'dropdown-item'}>Countable Items</Link>
                                    <Link to={'/inventory/uncountable/viewAll'} className={'dropdown-item'}>Uncountable Items</Link>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationSeniorManager;