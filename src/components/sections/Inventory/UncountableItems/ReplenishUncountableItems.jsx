import React from "react";
import UncountableItemService from "../../../../services/UncountableItemService";
import Toast1 from "../../../Toasts/Toast1";
import {Button, Form} from "react-bootstrap";

class ReplenishUncountableItems extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showExceeded = false;

        this.onChange = this.onChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

    }

    initialState={
        id:'',
        name:'',
        type:'',
        unit:'',
        amount:'',
        minimumAmount:'',
        siteId:'',
        siteName:'',
        replenishedAmount:''
    }

    componentDidMount =  async () => {
        let id = this.props.match.params.id;
        this.setState({id:id});
        await UncountableItemService.getUncountableItemById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({name:data.name});
                this.setState({type:data.type});
                this.setState({unit:data.unit});
                this.setState({amount:data.amount});
                this.setState({minimumAmount:data.minimumAmount});
                this.setState({siteId:data.siteid});
                this.setState({siteName:data.sitename});
            }).catch(error => {
                console.log("Cannot get item for id. Error: ",error);
            })
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    saveChanges= async  (event) =>{
        event.preventDefault();

        let amountUpdate = {
            id:this.state.id,
            amount: this.state.replenishedAmount
        }

        await UncountableItemService.replenishItem(amountUpdate)
            .then(response => response.data)
            .then((data) => {
                if(data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                }
            }).catch(error => {
                console.log("Cannot replenish item. Error: ",error);
            });
    }

    render() {
        const {replenishedAmount} = this.state;
        return (
            <div>

                <div className={'container-fluid'}>

                    <div style={{"display": this.state.show ? "block" : "none"}}>

                        <Toast1

                            children={{
                                show: this.state.show,
                                message: "Item updated successfully",
                                type: 'success'
                            }}
                        />

                    </div>

                    <h2>Replenish Uncountable Item</h2>
                    <h3>Id : {this.state.id}</h3>
                    <h3>Name : {this.state.name}</h3>
                    <p>Type : {this.state.type}</p>
                    <p>Unit : {this.state.unit}</p>
                    <p>Amount : {this.state.amount}</p>
                    <p>Minimum Amount : {this.state.minimumAmount}</p>
                    <p>Site Id : {this.state.siteId}</p>
                    <p>Site Name : {this.state.siteName}</p>

                    <Form onSubmit={this.saveChanges}>
                        <Form.Group>
                            <Form.Label>Replenished quantity</Form.Label>
                            <Form.Control
                                required
                                type={'number'}
                                step={'0.01'}
                                placeholder = {'Enter replenished amount'}
                                name={'replenishedAmount'}
                                value={replenishedAmount}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <br/>
                        <Button type={"submit"} className={'btn btn-success'}>Replenish</Button>
                    </Form>

                </div>

            </div>
        );
    }

}
export default ReplenishUncountableItems;