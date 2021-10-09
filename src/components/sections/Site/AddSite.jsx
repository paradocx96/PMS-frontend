import React from "react";
import {Button, Form} from "react-bootstrap";
import SiteService from "../../../services/SiteService";
import data from "bootstrap/js/src/dom/data";
import Toast1 from "../../Toasts/Toast1";
import CommonCheckAuthForInternalUsers from "../../../services/CommonCheckAuthForInternalUsers";

class AddSite extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        this.onChange = this.onChange.bind(this);
        this.submitSite = this.submitSite.bind(this);

    }
    initialState={
        siteName:'',
        location:'',
        siteManager:''
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitSite = async (event) => {

        event.preventDefault();

        let site ={
            siteName: this.state.siteName,
            location: this.state.location,
            siteManager: this.state.siteManager
        }

        await SiteService.addSite(site)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                }
            }).catch(error => {
                console.log("Cannot add site. Error: ",error);
            });
    }

    render() {
        const {siteName,location, siteManager} = this.state;
        return (
            <div>
                <div className={'container-fluid'}>


                <h2>Add Site</h2>


                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Site added successfully",
                            type: 'success'
                        }}
                    />

                </div>

                <Form onSubmit={this.submitSite}>
                    <Form.Group>
                        <Form.Label>Site name</Form.Label>
                        <Form.Control
                            required
                            type={'text'}
                            placeholder = {'Enter Site name'}
                            name={'siteName'}
                            value={siteName}
                            onChange={this.onChange}

                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            required
                            type={'text'}
                            placeholder = {'Enter Site Location'}
                            name={'location'}
                            value={location}
                            onChange={this.onChange}

                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Site Manager</Form.Label>
                        <Form.Control
                            required
                            type={'text'}
                            placeholder = {'Enter Site Manager'}
                            name={'siteManager'}
                            value={siteManager}
                            onChange={this.onChange}

                        />
                    </Form.Group>

                    <Button type={'submit'}>Add Site</Button>
                </Form>

                </div>
            </div>
        );
    }

}

export default CommonCheckAuthForInternalUsers(AddSite);