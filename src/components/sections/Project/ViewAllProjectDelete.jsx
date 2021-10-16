// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import ProjectService from "../../../services/ProjectService";
import {Link} from "react-router-dom";
import NavigationSeniorManager from "../../layouts/Navigation/NavigationSeniorManager";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import NavigationAdmin from "../../layouts/Navigation/NavigationAdmin";

class ViewAllProjectDelete extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.submitDelete = this.submitDelete.bind(this);
    }

    componentDidMount = async () => {
        await ProjectService.getAll()
            .then(response => response.data)
            .then((data) => {
                this.setState({projectList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    submitDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete?',
            message: 'Are you sure to delete this Project.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.handleDelete(id);
                        console.log('Delete Operation Proceed!');
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        console.log('Delete Operation Canceled!');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true
        });
    };

    handleDelete = async (id) => {
        console.log(id);
        await ProjectService.deleteById(id)
            .then(response => response.data)
            .then((data) => {
                this.componentDidMount();
            }).catch(error => {
                console.log(error.message);
            });
    }

    render() {
        return (
            <div>
                <NavigationAdmin/>
                <Container>
                    <h2>PROJECT LIST</h2>

                    <Table striped bordered hover variant="dark" size="sm">
                        <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Budget</th>
                            <th>Created Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.projectList.length === 0 ?
                                <tr>
                                    <td>{'Data Not Available!'}</td>
                                </tr>
                                :
                                this.state.projectList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.projectName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.budget}</td>
                                        <td>{item.createDateTime}</td>
                                        <td>
                                            <Button
                                                onClick={this.submitDelete.bind(this, item.id)}
                                                className="btn-danger">Delete</Button>
                                        </td>
                                    </tr>
                                ))
                        }
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ViewAllProjectDelete;