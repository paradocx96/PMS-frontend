// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ProjectService from "../../../services/ProjectService";
import SiteService from "../../../services/SiteService";
import NavigationSeniorManager from "../../layouts/Navigation/NavigationSeniorManager";

class AddProjectSM extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.managerId = '5454654';
        this.state.siteList = [];
        this.state.show = false;
        this.state.message = '';

        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onNameHandler = this.onNameHandler.bind();
        this.onDescriptionHandler = this.onDescriptionHandler.bind();
        this.onBudgetHandler = this.onBudgetHandler.bind();
        this.onHandlerSiteId = this.onHandlerSiteId.bind();
    }

    // Initializing default values
    initialState = {
        siteId: '',
        projectName: '',
        description: '',
        budget: 0.0
    }

    // Assign form values to State variables
    onHandlerSiteId = (event) => {
        this.setState({siteId: event.target.value});
    }

    onNameHandler = (event) => {
        this.setState({projectName: event.target.value});
    }

    onDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    onBudgetHandler = (event) => {
        this.setState({budget: event.target.value});
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

    // Submit form values
    onSubmit = async (event) => {
        event.preventDefault();

        let value = {
            projectName: this.state.projectName,
            description: this.state.description,
            budget: this.state.budget,
            managerId: this.state.managerId,
            siteId: this.state.siteId
        }

        console.log(value);

        await ProjectService.create(value)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch(function (error) {
                console.log(error.message);
            });

        await this.onReset();
        await this.componentDidMount();
    }

    // Reset form values
    onReset = () => {
        this.setState(() => this.initialState)
        this.componentDidMount();
    }

    render() {
        return (
            <div>
                <NavigationSeniorManager/>
                <Container>
                    <h2>ADD NEW PROJECT</h2>

                    <div>
                        <Form onSubmit={this.onSubmit.bind(this)}
                              onReset={this.onReset.bind(this)}>

                            <Form.Group as={Row} controlId="siteId" className={'pt-3'}>
                                <Form.Label column sm={2}>Site</Form.Label>
                                <Col sm={5}>
                                    <Form.Control required as="select"
                                                  name="siteId"
                                                  onChange={this.onHandlerSiteId}>
                                        <option>Select Site</option>
                                        {this.state.siteList.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.siteName}({item.location})
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="projectName" className={'pt-3'}>
                                <Form.Label column sm={2}>Project Name</Form.Label>
                                <Col sm={5}>
                                    <Form.Control placeholder="Project Name"
                                                  name="projectName"
                                                  required
                                                  value={this.state.projectName}
                                                  onChange={this.onNameHandler}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="Description" className={'pt-2'}>
                                <Form.Label column sm={2}>Description</Form.Label>
                                <Col sm={5}>
                                    <Form.Control placeholder="Description"
                                                  name="description"
                                                  as="textarea"
                                                  rows={5}
                                                  required
                                                  value={this.state.description}
                                                  onChange={this.onDescriptionHandler}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="budget" className={'pt-2'}>
                                <Form.Label column sm={2}>Budget</Form.Label>
                                <Col sm={5}>
                                    <Form.Control placeholder=""
                                                  name="budget"
                                                  type="number"
                                                  required
                                                  value={this.state.budget}
                                                  onChange={this.onBudgetHandler}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className={'pt-2'}>
                                <Col sm={{span: 10, offset: 2}}>
                                    <Button type="submit">CREATE</Button>{'\u00A0'}
                                    <Button type="reset" className="btn-danger">RESET</Button>{'\u00A0'}
                                </Col>
                            </Form.Group>

                        </Form>
                    </div>
                </Container>
            </div>
        );
    }
}

export default AddProjectSM;