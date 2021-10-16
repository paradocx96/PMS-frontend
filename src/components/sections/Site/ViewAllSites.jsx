import React from "react";
import SiteService from "../../../services/SiteService";
import {Button, Table} from "react-bootstrap";
import CommonCheckAuthForInternalUsers from "../../../services/CommonCheckAuthForInternalUsers";
import InternalUserService from "../../../services/InternalUserService";
import NavigationAdmin from "../../layouts/Navigation/NavigationAdmin";
import NavigationSiteManager from "../../layouts/Navigation/NavigationSiteManager";
import NavigationSeniorManager from "../../layouts/Navigation/NavigationSeniorManager";

class ViewAllSites extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const user = InternalUserService.getCurrentInternalUser();

        this.state.role = user.roles[0];

    }
    initialState={
        sites:[]
    }

    componentDidMount = async () => {
        await SiteService.getAllSites()
            .then(response => response.data)
            .then((data) => {
                this.setState({sites:data});
            }).catch(error => {
                console.log("Cannot get all sites. Error: ",error);
            });
    }

    render() {
        return (
            <div>

                {this.state.role === 'ROLE_ADMIN' ?
                    <NavigationAdmin />:
                    this.state.role == 'ROLE_SITE_MANAGER'?
                        <NavigationSiteManager/>:
                        this.state.role === "ROLE_SENIOR_MANAGER"?
                            <NavigationSeniorManager/>:
                            <div></div>
                }

                <div>
                    <h2>All Sites</h2>
                    <Table striped bordered hover variant={'light'}>

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
                            this.state.sites.length === 0?
                                <tr align={'center'}>
                                    <td colSpan={6}>{this.state.sites.length} records available</td>
                                </tr>:

                                this.state.sites.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.siteName}</td>
                                        <td>{e.location}</td>
                                        <td>{e.siteManager}</td>

                                        <td>
                                            <Button className={'btn btn-warning'}>Edit</Button>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>

                    </Table>
                </div>

            </div>
        );
    }

}

export default CommonCheckAuthForInternalUsers(ViewAllSites);