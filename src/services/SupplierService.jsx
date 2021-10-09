import React, {Component} from 'react';
import axios from "axios";

const API_SUPPLIER_BACKEND_URL = "http://localhost:5000/api/v1/supplier/";
class SupplierService extends Component {
   constructor(props) {
       super(props);
   }
    //TODO: Function for Supplier LoginSupplier
    login(email,password){
        return axios.post(API_SUPPLIER_BACKEND_URL+"login",{
            email,
            password
        }).then(response =>{
            console.log(response.data);
            if(response.data.accessToken){
                console.log(response.data);
                sessionStorage.setItem("supplier", JSON.stringify(response.data));
                console.log(JSON.stringify(response.data));
            }
            console.log(response.data);
            return response.data;
        });
    }

    register(name,email,password,contactNo, address, location, status){
        return axios.post(API_SUPPLIER_BACKEND_URL+"register",{
            name,
            email,
            password,
            contactNo,
            address,
            location,
            status
        });
    }

    addItem(supplierID, name, quantity, price){
       return axios.post(API_SUPPLIER_BACKEND_URL+"add-item",{
           supplierID,
           name,
           quantity,
           price
       })
    }

    //TODO: Get current user
    getCurrentSupplier() {
        return JSON.parse(sessionStorage.getItem('supplier'));
    }

    //TODO: Remove current user
    logoutSupplier() {
        sessionStorage.removeItem("supplier");
    }

    //TODO: Get Items by Supplier ID
    getItemsBySupplierID(id){
       return axios.get(API_SUPPLIER_BACKEND_URL+"get-item-by-supplier-id/"+id)
    }

    //TODO: Update Single Item
    updateItem(id, name, quantity, price){
       return axios.put(API_SUPPLIER_BACKEND_URL + "edit-item",{
           id,
           name,
           quantity,
           price
       })
    }

    //TODO: Delete Item By ID
    deleteItemByID(id){
       return axios.delete(API_SUPPLIER_BACKEND_URL+"delete-item-by-id/"+id)
    }

    //TODO: Get Item by Item ID
    getItemByItemID(id){
       return axios.get(API_SUPPLIER_BACKEND_URL+"get-item-by-id/"+id)
    }
	
	getSupplierByStatus(status) {
        return axios.get(API_SUPPLIER_BACKEND_URL + "get-supplier-by-status/" + status);
    }

    getItemBySupplierId(id) {
        return axios.get(API_SUPPLIER_BACKEND_URL + "get-item-by-supplier-id/" + id);
    }

    getItemById(id) {
        return axios.get(API_SUPPLIER_BACKEND_URL + "get-item-by-item-id/" + id);
    }

    getAll() {
        return axios.get(API_SUPPLIER_BACKEND_URL + "get-all-supplier");
    }

}

export default new SupplierService;

