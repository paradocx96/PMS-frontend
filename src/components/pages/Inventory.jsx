import React from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import CommonCheckAuthForInternalUsers from "../../services/CommonCheckAuthForInternalUsers";
import InternalUserService from "../../services/InternalUserService";
import NavigationAdmin from "../layouts/Navigation/NavigationAdmin";
import NavigationSiteManager from "../layouts/Navigation/NavigationSiteManager";
import NavigationSeniorManager from "../layouts/Navigation/NavigationSeniorManager";

class Inventory extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const user = InternalUserService.getCurrentInternalUser();

        this.state.role = user.roles[0];

    }

    initialState={

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

                <div className={'container-fluid'}>

                <h1>Inventory</h1>

                <Row>
                    <Col>
                        <h2>Countable Items</h2>
                        <Link to={'/inventory/countable/addItem'}>Add Countable Item</Link> <br/>
                        <Link to={'/inventory/countable/viewAll'}>View All Countable Items</Link> <br/>
                        <Link to={'/inventory/countable/delete'}>Delete Countable Items</Link> <br/>
                    </Col>
                    <Col>
                        <h2>Uncountable Items</h2>
                        <Link to={'/inventory/uncountable/addItem'}>Add Uncountable Item</Link> <br/>
                        <Link to={'/inventory/uncountable/viewAll'}>View all Uncountable Item</Link> <br/>
                        <Link to={'/inventory/uncountable/delete'}>Delete Uncountable Item</Link> <br/>
                    </Col>
                </Row>

                {/*<Link>Add Inventory Items</Link>*/}

                </div>

            </div>
        );
    }

}

export default CommonCheckAuthForInternalUsers(Inventory);