import React, {Component} from 'react';
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
//import {Link}  from "react-router-dom";
import { withRouter } from 'react-router-dom';
import "../../../assets/style/Login.css";
import InternalUserService from "../../../services/InternalUserService";


// TODO: create to validate form fields
const requiredField = data => {

    if (!data) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class LoginInternalUser extends Component {

    backColor = {
        'background-color' : '#24a0ed',
        color: 'white',
    }

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    // TODO: Set Values for state variables
    onChangeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    // TODO: Set Values for state variables
    handleLogin(event) {
        event.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        // TODO: Validate LoginSupplier form fields
        this.form.validateAll();

        // TODO: Calling LoginSupplier Service function and check if user is available or not
        if (this.checkBtn.context._errors.length === 0) {
            InternalUserService.login(this.state.email, this.state.password).then(
                () => {
                    this.props.history.push("/");
                    window.location.reload();
                },
                error => {
                    const userMessage = "Email or password incorrect!";
                    const resMessage = (error.response && error.response.data.message && error.response.data) || userMessage || error.message || error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }


    }

    // TODO: Display Website
    render() {
        return (
            // <div style={{ backgroundImage: `url(${LoginImage})`, backgroundSize: 'cover', overflow: 'hidden', }}>

            <div className="auth-wrapper-login">
                <div className="auth-inner-login">

                    <Form onSubmit={this.handleLogin} ref={check => {this.form = check; }}>
                        <h3>Internal user sign in</h3>
                        <div className="form-group">
                            <label htmlFor="username">Email</label>
                            <Input
                                type="text"
                                placeholder="Enter email"
                                className="form-control"
                                name="username"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[requiredField]}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[requiredField]}
                            />
                        </div>

                        <br></br>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">&nbsp;Remember me</label>
                            </div>
                        </div>
                        {/*<p className="forgot-password text-right">*/}
                        {/*   <a href="/forgot-password"> Forgot Password ?</a>*/}
                        {/*</p>*/}
                        <br></br>
                        <div className="form-group d-grid gap-2">
                            <button className="btn btn-block" disabled={this.state.loading} style={this.backColor}>
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"> </span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger text-center" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={check => {this.checkBtn = check;}}
                        />
                    </Form>
                </div>
            </div>
            //</div>
        );
    }
}
export default withRouter(LoginInternalUser);