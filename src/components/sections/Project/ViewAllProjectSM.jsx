// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';
import {Container, Table} from "react-bootstrap";
import ProjectService from "../../../services/ProjectService";
import {Link} from "react-router-dom";
import NavigationSeniorManager from "../../layouts/Navigation/NavigationSeniorManager";

class ViewAllProjectSM extends Component {

    // Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        }
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

    render() {
        return (
            <div>
                <NavigationSeniorManager/>
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
                                            <Link to={`/project/editProjectSm/` + item.id}
                                                  className={'btn btn-primary'}>
                                                UPDATE
                                            </Link>
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

export default ViewAllProjectSM;