import React from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import CommonCheckAuthForInternalUsers from "../../services/CommonCheckAuthForInternalUsers";

class Inventory extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

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