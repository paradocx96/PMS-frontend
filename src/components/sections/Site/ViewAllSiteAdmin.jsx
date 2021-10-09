// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import NavigationAdmin from "../../layouts/Navigation/NavigationAdmin";
import {Container, Table} from "react-bootstrap";
import SiteService from "../../../services/SiteService";

class ViewAllSiteAdmin extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            siteList: []
        }
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

    render() {
        return (
            <div>
                <NavigationAdmin/>
                <Container>
                    <h2>SITE LIST</h2>
                    <div>
                        <Table striped bordered hover variant="dark" size="sm">
                            <thead>
                            <tr>
                                <td>Site Id</td>
                                <td>Site Name</td>
                                <td>Location</td>
                                <td>Site Manager</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.siteList.length === 0 ?
                                    <tr align={'center'}>
                                        <td colSpan={6}>{this.state.siteList.length} records available</td>
                                    </tr>
                                    :
                                    this.state.siteList.map((e) => (
                                        <tr key={e.id}>
                                            <td>{e.id}</td>
                                            <td>{e.siteName}</td>
                                            <td>{e.location}</td>
                                            <td>{e.siteManager}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ViewAllSiteAdmin;