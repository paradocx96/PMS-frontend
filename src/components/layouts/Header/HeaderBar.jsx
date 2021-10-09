import React, {Component} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';

import mainLogo from './../../../assets/images/Header/logo.svg';
import SupplierService from "../../../services/SupplierService";
import InternalUserService from "../../../services/InternalUserService";


class HeaderBar extends Component {

    backColor = {
        backgroundColor: '#4CAF50',
        color: 'white'
    }

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            currentUser: undefined,
            adminDashboard: "",
            accountantDashboard: "",
            siteManagerDashboard: "",
            seniorManagerDashboard: "",
            supplierDashboard:""

        };
    }

    componentDidMount() {
        const userSupplier = SupplierService.getCurrentSupplier();
        const userInternal = InternalUserService.getCurrentInternalUser();

        console.log("INTERNAL USER " + userInternal);

        if (userSupplier) {
            this.setState({
                currentUser: userSupplier,
                supplierDashboard: userSupplier.roles.includes("ROLE_SUPPLIER"),
            });
        }
        if (userInternal) {
            this.setState({
                currentUser: userInternal,
                adminDashboard: userInternal.roles.includes("ROLE_ADMIN"),
                accountantDashboard: userInternal.roles.includes("ROLE_ACCOUNTANT"),
                siteManagerDashboard: userInternal.roles.includes("ROLE_SITE_MANAGER"),
                seniorManagerDashboard: userInternal.roles.includes("ROLE_SENIOR_MANAGER"),
            });
        }
    }

    // componentDidUpdate(){
    //     const userSupplier = SupplierService.getCurrentSupplier();
    //     const userInternal = InternalUserService.getCurrentInternalUser();
    //
    //     //console.log("INTERNAL USER " + userInternal.email);
    //     //console.log("INTERNAL USER " + userInternal);
    //
    //     if (userSupplier) {
    //         this.setState({
    //             currentUser: userSupplier,
    //             supplierDashboard: userSupplier.roles.includes("ROLE_SUPPLIER"),
    //         });
    //     }
    //
    //     if (userInternal) {
    //         this.setState({
    //             currentUser: userInternal,
    //             adminDashboard: userInternal.roles.includes("ROLE_ADMIN"),
    //             accountantDashboard: userInternal.roles.includes("ROLE_ACCOUNTANT"),
    //             siteManagerDashboard: userInternal.roles.includes("ROLE_SITE_MANAGER"),
    //             seniorManagerDashboard: userInternal.roles.includes("ROLE_SENIOR_MANAGER"),
    //         });
    //     }
    // }

    logout() {
        SupplierService.logoutSupplier();
        InternalUserService.logoutInteralUser();
    }

    render() {
        const {currentUser,adminDashboard,accountantDashboard, siteManagerDashboard,seniorManagerDashboard, supplierDashboard} = this.state;
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <img
                                src={mainLogo}
                                height="50"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>

                            <Nav>
                                {currentUser ? (
                                    <div className="navbar-nav ml-auto">
                                        {adminDashboard && (
                                            <li className="nav-item text-uppercase">
                                                <Link to={'/dashboard/admin'} className={'nav-link'} > Dashboard </Link>
                                            </li>
                                        )}
                                        {accountantDashboard && (
                                            <li className="nav-item text-uppercase">
                                                <Link to={'/dashboard/accountant'} className={'nav-link'} > Dashboard </Link>
                                            </li>
                                        )}
                                        {siteManagerDashboard && (
                                            <li className="nav-item text-uppercase">
                                                <Link to={'/dashboard/site'} className={'nav-link'} > Dashboard </Link>
                                            </li>
                                        )}
                                        {seniorManagerDashboard && (
                                            <li className="nav-item text-uppercase">
                                                <Link to={'/dashboard/senior'} className={'nav-link'} > Dashboard </Link>
                                            </li>
                                        )}
                                        {supplierDashboard && (
                                            <li className="nav-item text-uppercase">
                                                <Link to={'/dashboard/supplier'} className={'nav-link'} > Dashboard </Link>
                                            </li>
                                        )}
                                        <li className="nav-item text-uppercase">
                                            <Link to={'/view-profile'} className={'nav-link BsBackspaceReverse'} > {currentUser.email}</Link>
                                        </li>
                                        <li className="nav-item text-uppercase">
                                            <a href="/" className="nav-link" onClick={this.logout}>
                                                Logout
                                            </a>
                                        </li>
                                    </div>
                                ) : (
                                <div className="navbar-nav ml-auto">
                                    {/*<NavDropdown title="DASHBOARD" id="collasible-nav-dropdown">*/}
                                    {/*    <Link to={"/dashboard/admin"} className="dropdown-item">Administrator</Link>*/}
                                    {/*    <Link to={"/dashboard/site"} className="dropdown-item">Site manager</Link>*/}
                                    {/*    <Link to={"/dashboard/senior"} className="dropdown-item">Senior Manager</Link>*/}
                                    {/*    <Link to={"/dashboard/accountant"} className="dropdown-item">Accountant</Link>*/}
                                    {/*</NavDropdown>*/}

                                        <li className="nav-item text-uppercase">
                                            <Link to={"/register"}
                                                  className="nav-link BsBackspaceReverse">REGISTER</Link>
                                        </li>
                                        <li className="nav-item text-uppercase">
                                            <Link to={"/"} className="nav-link">LOGIN</Link>
                                        </li>
                                    </div>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default HeaderBar;
