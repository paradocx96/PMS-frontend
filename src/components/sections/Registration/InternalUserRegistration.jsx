import React, {Component} from 'react';
import {Link} from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import {isEmail} from "validator";


import '../../../assets/style/Registration.css'
import InternalUserService from "../../../services/InternalUserService";

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

// TODO: Validating registration Email fields
const userEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

// TODO: Validating registration Username fields
const userUsername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

// TODO: Validating registration Password fields
const userPassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
const userConfirmPassword = (value, props) => {
    if (props.expectedvalue !== value) {
        return (
            <div className="alert alert-danger" role="alert">
                The password is not matched!
            </div>
        );
    }
};
class InternalUserRegistration extends Component {
    backColor = {
        'background-color': '#24a0ed',
        color: 'white'
    }
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNo:"",
            address:"",
            userType:"",
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
        this.setState({    name: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                contactNo:"",
                                address:"",
                                location:"",})
    }

    // TODO: Set Values for state variables
    handleRegister(event) {
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

            console.log(this.state.name,
                this.state.email,
                this.state.password,
                this.state.contactNo,
                this.state.address,
                this.state.userType)

            InternalUserService.register(
                this.state.name,
                this.state.email,
                this.state.password,
                this.state.contactNo,
                this.state.address,
                this.state.userType
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

                    <Form onSubmit={this.handleRegister} ref={check => {
                        this.form = check;
                    }}>
                        <h3 className={"text-dark"}>Sign Up</h3>

                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="name">Employee name</label>
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
                                    <label htmlFor="email">Employee email</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter email"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        validations={[requiredField, userEmail]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="address">Employee address</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter address"
                                        className="form-control"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.onChange}
                                        validations={[requiredField]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="address">Employee ContactNo</label>
                                    <Input
                                        type="number"
                                        placeholder="Enter Contact Number"
                                        className="form-control"
                                        name="contactNo"
                                        value={this.state.contactNo}
                                        onChange={this.onChange}
                                        validations={[requiredField]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="password">Employee password</label>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        validations={[requiredField, userPassword]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Employee confirm password</label>
                                    <Input
                                        type="password"
                                        placeholder="Re-enter password"
                                        className="form-control"
                                        name="confirmPassword"
                                        expectedvalue={this.state.password}
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                        validations={[requiredField, userConfirmPassword]}
                                    />
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="userType">Select employee type : </label>{' '}
                                    <select value={this.state.userType} onChange={this.onChangeUserType}
                                            className="dropdown">
                                        <option></option>
                                        <option value={"accountant"}>Accountant</option>
                                        <option value={"seniorManager"}>Senior Manager</option>
                                        <option value={"siteManager"}>Site Manager</option>
                                    </select>
                                </div>
                                <br></br>
                                <div className="form-group d-grid gap-2">
                                    <button className="btn btn-block" style={this.backColor}
                                            disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"> </span>
                                        )}
                                        <span>Submit</span>
                                    </button>
                                    <button className="btn btn-danger btn-block" onClick={this.handleReset}>
                                        <span>Reset</span>
                                    </button>
                                </div>
                            </div>
                        )}
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

export default InternalUserRegistration;