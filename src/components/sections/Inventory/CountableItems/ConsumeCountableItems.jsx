import React from "react";
import CountableItemService from "../../../../services/CountableItemService";
import {Button, Form} from "react-bootstrap";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";

class ConsumeCountableItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showExceeded = false;

        this.onChange =  this.onChange;
        this.saveChanges = this.saveChanges.bind(this);

    }

    initialState={
        id:'',
        name:'',
        type:'',
        quantity:'',
        minimumQuantity:'',
        siteId:'',
        siteName:'',
        consumedQuantity:''
    }

    componentDidMount = async () => {
        let id = this.props.match.params.id;
        this.setState({id:id});
        await CountableItemService.getCountableItemById(id)
            .then(response => response.data)
            .then((data) => {
                console.log("Item : ",data);
                this.setState({name:data.name});
                this.setState({type:data.type});
                this.setState({quantity:data.quantity});
                this.setState({minimumQuantity:data.minimumQuantity});
                this.setState({siteId:data.siteid});
                this.setState({siteName:data.sitename});
            }).catch(error => {
                console.log("Cannot get item for id. Error: ",error);
            })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    saveChanges =async (event) =>{
        event.preventDefault();

        let remainingQuantity = this.state.quantity - this.state.consumedQuantity;

        if (remainingQuantity < 0){
            this.setState({"showExceeded":true});
            setTimeout(() => this.setState({"showExceeded":false}),3000);
        }
        else {
            let quantityUpdate={
                id:this.state.id,
                quantity: this.state.consumedQuantity
            }

            await CountableItemService.consumeItem(quantityUpdate)
                .then(response => response.data)
                .then((data) => {
                    if(data != null){
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                }).catch(error => {
                    console.log("Cannot consume item. Error: ",error);
                });
        }


    }

    render() {
        const {quantity, consumedQuantity} = this.state;
        return (
            <div>
                <div className={'container-fluid'}>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Item updated successfully",
                            type: 'primary'
                        }}
                    />

                </div>

                    <div style={{"display": this.state.showExceeded ? "block" : "none"}}>

                        <Toast2

                            children={{
                                show: this.state.showExceeded,
                                message: "Consumed quantity exceeds available quantity",
                                type: 'warning'
                            }}
                        />

                    </div>

                <h2>Consume Items</h2>
                <h3>Id : {this.state.id}</h3>
                <h3>Name : {this.state.name}</h3>
                <p>Type : {this.state.type}</p>
                <p>Quantity : {this.state.quantity}</p>
                <p>Minimum Quantity : {this.state.minimumQuantity}</p>
                <p>Site Id : {this.state.siteId}</p>
                <p>Site Name : {this.state.siteName}</p>

                <Form onSubmit={this.saveChanges}>
                    <Form.Group>
                        <Form.Label>Consumed quantity</Form.Label>
                        <Form.Control
                            required
                            type={'number'}
                            placeholder = {'Enter consumed number of items'}
                            name={'consumedQuantity'}
                            max={quantity}
                            value={consumedQuantity}
                            onChange={this.onChange}

                        />
                    </Form.Group>

                    <br/>
                    <Button type={"submit"} className={'btn btn-primary'}>Consume</Button>
                </Form>

            </div>

            </div>
        );
    }

}

export default ConsumeCountableItems;