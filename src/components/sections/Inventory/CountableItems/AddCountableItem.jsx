import React from "react";
import {Button, Form} from "react-bootstrap";
import SiteService from "../../../../services/SiteService";
import data from "bootstrap/js/src/dom/data";
import CountableItemService from "../../../../services/CountableItemService";
import Toast1 from "../../../Toasts/Toast1";
import CommonCheckAuthForInternalUsers from "../../../../services/CommonCheckAuthForInternalUsers";

class AddCountableItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        this.onChange = this.onChange.bind(this);
        this.assignSiteName = this.assignSiteName.bind(this);

    }

    initialState={
        name:'',
        type:'',
        quantity:'',
        minimumQuantity:'',
        siteId:'',
        siteName:'',
        siteList:[]
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    componentDidMount = async () => {
        await SiteService.getAllSites()
            .then(response => response.data)
            .then((data) => {
                this.setState({siteList: data});
                this.setState({siteId:data[0].id});
                this.setState({type:'critical'})
            }).catch(error => {
                console.log("Cannot get all sites. Error: ",error);
            })
    }

    submitItem = async (event) => {
        event.preventDefault();

        //set the site name to the state variable
        await this.assignSiteName();

        let item={
            name: this.state.name,
            type: this.state.type,
            quantity: this.state.quantity,
            minimumQuantity: this.state.minimumQuantity,
            siteid: this.state.siteId,
            sitename : this.state.siteName
        }

        console.log("Item : ",item)

        await CountableItemService.addNewCountableItem(item)
            .then(response => response.data)
            .then((data) => {
                if(data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                }
            }).catch(error => {
                console.log("Cannot add item. Error : ",error);
            })


    }

    assignSiteName = async () =>{
        await SiteService.getSiteById(this.state.siteId)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    console.log("Site name received : ",data.siteName);
                    this.setState({siteName:data.siteName});
                }
                else {
                    console.log("Site name is null");
                }
            }).catch(error => {
                console.log("Cannot get site name for site id. Error : ",error);
            })
    }

    render() {
        const {name, type, quantity, minimumQuantity, siteId, siteName} = this.state;
        return (
            <div>

                <div className={'container-fluid'}>

                    <div style={{"display": this.state.show ? "block" : "none"}}>

                        <Toast1

                            children={{
                                show: this.state.show,
                                message: "Item added successfully",
                                type: 'success'
                            }}
                        />

                    </div>

                    <h2>Add Countable Item</h2>

                    <Form onSubmit={this.submitItem}>
                        <Form.Group>
                            <Form.Label>Item name</Form.Label>
                            <Form.Control
                                required
                                type={'text'}
                                placeholder = {'Enter Item name'}
                                name={'name'}
                                value={name}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Item Type</Form.Label>
                            <Form.Control
                                as={'select'}
                                required
                                name={'type'}
                                value={type}
                                onChange={this.onChange}>

                                <option value={'critical'} datatype={'text'}>
                                    {'Critical'}
                                </option>
                                <option value={'nonCritical'} datatype={'text'}>
                                    {'Non Critical'}
                                </option>

                            </Form.Control>
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                required
                                type={'number'}
                                placeholder = {'Enter Initial Quantity'}
                                name={'quantity'}
                                value={quantity}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Minimum Quantity</Form.Label>
                            <Form.Control
                                required
                                type={'number'}
                                placeholder = {'Enter Minimum Quantity'}
                                name={'minimumQuantity'}
                                value={minimumQuantity}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Site</Form.Label>
                            <Form.Control
                                as={'select'}
                                required
                                name={'siteId'}
                                value={siteId}
                                onChange={this.onChange}

                            >
                                {
                                    this.state.siteList.length === 0?
                                        <option>No Sites !</option>:
                                        this.state.siteList.map((e) => (
                                            <option value={e.id} datatype={'text'}>
                                                {e.siteName}
                                            </option>
                                        ))
                                }

                            </Form.Control>
                        </Form.Group>

                        <Button type={'submit'} className={'btn btn-success'}>Add Item</Button>

                    </Form>
                </div>

            </div>
        );
    }

}

export default CommonCheckAuthForInternalUsers(AddCountableItem);