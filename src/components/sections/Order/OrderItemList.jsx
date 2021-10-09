// @author IT19180526 - Chandrasiri SANLD

import React, {Component} from 'react';

class OrderItemList extends Component {

    render() {
        return this.props.orderItemList.map((val, idx) => {

            let projectName = `projectName-${idx}`,
                itemId = `task-${idx}`,
                itemName = `taskNotes-${idx}`,
                itemCount = `taskStatus-${idx}`;

            return (
                <div>

                </div>
            );

        });
    }
}

export default OrderItemList;
