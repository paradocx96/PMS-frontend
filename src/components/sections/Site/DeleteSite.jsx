import React from "react";
import SiteService from "../../../services/SiteService";

import {Button, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import Toast1 from "../../Toasts/Toast1";
import CommonCheckAuthForInternalUsers from "../../../services/CommonCheckAuthForInternalUsers";
import InternalUserService from "../../../services/InternalUserService";
import NavigationAdmin from "../../layouts/Navigation/NavigationAdmin";
import NavigationSiteManager from "../../layouts/Navigation/NavigationSiteManager";
import NavigationSeniorManager from "../../layouts/Navigation/NavigationSeniorManager";

class DeleteSite extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        const user = InternalUserService.getCurrentInternalUser();

        this.state.role = user.roles[0];

        this.requestDelete = this.requestDelete.bind(this);
        this.performDelete = this.performDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);

    }

    initialState={
        sites:[]
    }

    componentDidMount= async () => {
        await SiteService.getAllSites()
            .then(response => response.data)
            .then((data) => {
                this.setState({sites:data});
            }).catch(error => {
                console.log("Cannot get all sites. Error : ",error);
            })
    }

    requestDelete = (id) => {

        confirmAlert({
                title:'Delete this entry?',
                message:'This cannot be undone',
                buttons:[
                    {
                        label:'I understand. Delete.',
                        onClick: this.performDelete.bind(this,id)
                    },
                    {
                        label:'Do not Delete',
                        onClick:this.cancelDelete.bind(this)
                    }
                ]
            }
        )

    }

    performDelete = async (id) => {
        await SiteService.deleteSite(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        sites:this.state.sites.filter(sites =>
                            sites.id !== id)
                    })
                }
            }).catch(error => {
                console.log("Cannot delete site. Error: ",error);
            })
    }

    cancelDelete = () => {
        alert("Deletion Cancelled");
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

                    <div style={{"display": this.state.show ? "block" : "none"}}>

                        <Toast1

                            children={{
                                show: this.state.show,
                                message: "Item deleted successfully",
                                type: 'danger'
                            }}
                        />

                    </div>

                    <h2>Delete Sites</h2>

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
                                            <Button onClick={this.requestDelete.bind(this,e.id)}
                                                    className={'btn btn-danger'}>
                                                Delete
                                            </Button>
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
export default CommonCheckAuthForInternalUsers(DeleteSite);