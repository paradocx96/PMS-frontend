import React, {Component} from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {Link} from "react-router-dom";
import CheckButton from "react-validation/build/button";

import SupplierService from "../../../services/SupplierService";

// TODO: Validating registration form fields
const requiredField = data => {
    if (!data) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class AddSupplierItem extends Component {
    backColor = {
        'background-color': '#24a0ed',
        color: 'white'
    }
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);

        this.state = {
            id:"",
            name: "",
            quantity: "",
            price: 0,
            successful: false,
            message: "",
            loading: false,
        };
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeUserType(event) {
        this.setState({
            userType: event.target.value
        });
    }

    handleReset = e => {
        this.setState({
            name: '',
            quantity: '',
            price: 0,
           })
    }

    componentDidMount = async ()=>{
        const {match: {params}} = this.props;
        await this.fetch(params.id);
    }

    componentDidUpdate = async () => {
        const {match: {params}} = this.props;
        const prevID = this.state.id
        const currentID = params.id;
        if(currentID && currentID !="" && prevID != currentID){
            await this.fetch(currentID);
        }
    }

    fetch = async (id)=> {
        this.setState({
            id
        });
        await SupplierService.getItemByItemID(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    name: data.name,
                    quantity: data.quantity,
                    price: data.price
                });
                console.log("VIEW ITEMS --- " + data);
            }).catch(error =>
                console.log(error.message)
            );

    }

    // TODO: Set Values for state variables
    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading: true
        });

        // TODO: Validate register form fields
        this.form.validateAll();

        // TODO: Calling Registration Service function and check if there is any error
        if (this.checkBtn.context._errors.length === 0) {

            console.log(this.state.id,
                this.state.name,
                this.state.quantity,
                this.state.price);

            SupplierService.updateItem(
                this.state.id,
                this.state.name,
                this.state.quantity,
                this.state.price
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                        loading: false,
                    });
                }
            );

        } else {
            this.setState({
                loading: false,
            });
        }

    }

    render() {
        return (
            <div className="auth-wrapper-register">
                <div className="auth-inner-register">

                    <Form onSubmit={this.handleSubmit} ref={check => {
                        this.form = check;
                    }}>
                        <h3 className={"text-dark"}>Update Item</h3>

                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Item name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter name"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        validations={[requiredField]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="email">Item Quantity</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Quantity"
                                        className="form-control"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.onChange}
                                        validations={[requiredField]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="address">Item Price</label>
                                    <Input
                                        type="number"
                                        placeholder="Enter Price"
                                        className="form-control"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.onChange}
                                        validations={[requiredField]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group d-grid gap-2">
                                    <button className="btn btn-block" style={this.backColor}
                                            disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"> </span>
                                        )}
                                        <span>Update</span>
                                    </button>
                                    <button className="btn btn-danger btn-block" onClick={this.handleReset}>
                                        <span>Reset</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        <p className="forgot-password text-lg-end">
                            Do you want to see <Link to="/view-items">Item List ?</Link>

                        </p>
                        <br></br>

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={this.state.successful ? "alert alert-success text-center" : "alert alert-danger text-center"}
                                    role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{display: "none"}} ref={check => {
                            this.checkBtn = check;
                        }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddSupplierItem;