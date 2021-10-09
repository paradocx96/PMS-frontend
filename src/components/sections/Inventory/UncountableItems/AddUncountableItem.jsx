import React from "react";
import SiteService from "../../../../services/SiteService";
import Toast1 from "../../../Toasts/Toast1";
import {Button, Form} from "react-bootstrap";
import UncountableItemService from "../../../../services/UncountableItemService";
import CommonCheckAuthForInternalUsers from "../../../../services/CommonCheckAuthForInternalUsers";

class AddUncountableItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitItem = this.submitItem.bind(this);
        this.assignSiteName = this.assignSiteName.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    initialState={
        name:'',
        type:'',
        amount:'',
        minimumAmount:'',
        unit:'',
        siteId:'',
        siteName:'',
        siteList:[]
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

    submitItem = async (event) =>{
        event.preventDefault();

        await this.assignSiteName();

        let item={
            name: this.state.name,
            type: this.state.type,
            unit: this.state.unit,
            amount: this.state.amount,
            minimumAmount: this.state.minimumAmount,
            siteid: this.state.siteId,
            sitename : this.state.siteName
        }

        await UncountableItemService.addUncountableItem(item)
            .then(response => response.data)
            .then((data) => {
                if(data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                }
            }).catch(error => {
                console.log("Cannot save item. Error: ",error);
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

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {

        const {name, type, amount, minimumAmount,unit, siteId, siteName} = this.state;
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

                    <h2>Add Uncountable Item</h2>

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
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                                required
                                type={'text'}
                                placeholder = {'Enter units for this item'}
                                name={'unit'}
                                value={unit}
                                onChange={this.onChange}

                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                required
                                type={'number'}
                                step={'0.01'}
                                placeholder = {'Enter Initial Amount'}
                                name={'amount'}
                                value={amount}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Minimum Amount</Form.Label>
                            <Form.Control
                                required
                                type={'number'}
                                step={'0.01'}
                                placeholder = {'Enter Minimum Amount'}
                                name={'minimumAmount'}
                                value={minimumAmount}
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

                        <br/>

                        <Button type={'submit'} className={'btn btn-success'}>Add Item</Button>

                    </Form>

                </div>

            </div>
        );
    }

}
export default CommonCheckAuthForInternalUsers(AddUncountableItem);