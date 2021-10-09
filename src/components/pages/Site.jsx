import React from "react";
import {Link} from "react-router-dom";

class Site extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h2>Site Page</h2>
                <Link to={'/site/addSite'}>Add Site</Link> <br/>
                <Link to={'/site/viewAll'}>View All Sites</Link> <br/>

                <h3>Countable Items</h3>
                <Link to={'/inventory/countable/addItem'}>Add Countable Item</Link> <br/>
                <Link to={'/inventory/countable/viewAll'}>View All Countable Items</Link> <br/>
                <Link to={'/inventory/countable/delete'}>Delete Countable Items</Link> <br/>

                <h3>Uncountable Items</h3>
                <Link to={'/inventory/uncountable/addItem'}>Add Uncountable Item</Link> <br/>
                <Link to={'/inventory/uncountable/viewAll'}>View all Uncountable Item</Link> <br/>
                <Link to={'/inventory/uncountable/delete'}>Delete Uncountable Item</Link> <br/>
            </div>
        );
    }

}
export default Site;