import React, {Component} from 'react';
import axios from "axios";
import AuthHeaderInternalUser from "./AuthHeaderInternalUser";


const API_SUPPLIER_BACKEND_URL = "http://localhost:5000/api/v1/internel-user/";
class InternalUserService extends Component {
   constructor(props) {
       super(props);
   }
    //TODO: Function for Supplier LoginSupplier
    login(email,password){
        return axios.post(API_SUPPLIER_BACKEND_URL+"login",{
            email,
            password
        }).then(response =>{

            if(response.data.accessToken){
                sessionStorage.setItem("internalUser", JSON.stringify(response.data));
                console.log(JSON.stringify(response.data));
            }
            console.log("Internal Users ---- ", response.data);
            return response.data;
        });
    }

    register(name,email,password,contactNo, address, userType){
        return axios.post(API_SUPPLIER_BACKEND_URL+"register",{
            name,
            email,
            password,
            contactNo,
            address,
            userType
        },{headers: AuthHeaderInternalUser()});
    }

    //TODO: Get current user
    getCurrentInternalUser() {
        return JSON.parse(sessionStorage.getItem('internalUser'));
    }

    //TODO: Remove current user
    logoutInteralUser() {
        sessionStorage.removeItem("internalUser");
    }

}

export default new InternalUserService;