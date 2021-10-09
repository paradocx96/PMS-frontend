import React,{Component} from "react";
import connection from './connection.json';
import axios from "axios";

const BACKEND_BASE_URL = connection.localAddress;
const UNCOUNTABLE_URL = "/api/inventory/uncountable/";

class  UncountableItemService extends Component{
    constructor(props) {
        super(props);

    }

    getAllUncountableItems(){
        return axios.get(BACKEND_BASE_URL + UNCOUNTABLE_URL + "getAllUncountableItems");
    }

    addUncountableItem(item){
        return axios.post(BACKEND_BASE_URL + UNCOUNTABLE_URL + "addUncountableItem",item);
    }

    getUncountableItemById(id){
        return axios.get(BACKEND_BASE_URL + UNCOUNTABLE_URL + "getUncountableItemById/" + id);
    }

    getCriticalUncountableItems(){
        return axios.get(BACKEND_BASE_URL + UNCOUNTABLE_URL + "getCriticalUncountableItems");
    }

    getNonCriticalUncountableItems(){
        return axios.get(BACKEND_BASE_URL + UNCOUNTABLE_URL + "getNonCriticalUncountableItems");
    }

    updateUncountableItem(item){
        return axios.put(BACKEND_BASE_URL + UNCOUNTABLE_URL + "updateUncountableItem", item);
    }

    deleteUncountableItem(id){
        return axios.delete(BACKEND_BASE_URL + UNCOUNTABLE_URL + "deleteUncountableItem/" + id);
    }

    consumeItem(amountUpdate){
        return axios.put(BACKEND_BASE_URL + UNCOUNTABLE_URL + "consumeItem",amountUpdate);
    }

    replenishItem(amountUpdate){
        return axios.put(BACKEND_BASE_URL + UNCOUNTABLE_URL + "replenishItem",amountUpdate);
    }

    getUncountableItemsBySite(id){
        return axios.get(BACKEND_BASE_URL + UNCOUNTABLE_URL + "getUncountableItemsBySite/" + id);
    }

}
export default new UncountableItemService();