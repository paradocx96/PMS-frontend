import React,{Component} from "react";
import connection from './connection.json';
import axios from "axios";

const BACKEND_BASE_URL = connection.localAddress;
const COUNTABLE_URL = "/api/inventory/countable/";

class CountableItemService extends Component{
    constructor(props) {
        super(props);

    }

    getAllCountableItems(){
        return axios.get(BACKEND_BASE_URL + COUNTABLE_URL + "getAllCountableItems");
    }

    addNewCountableItem(item){
        return axios.post(BACKEND_BASE_URL + COUNTABLE_URL + "addCountableItem",item);
    }

    getCountableItemById(id){
        return axios.get(BACKEND_BASE_URL + COUNTABLE_URL + "getCountableItemById/" + id);
    }

    getCriticalCountableItems(){
        return axios.get(BACKEND_BASE_URL +  COUNTABLE_URL + "getCriticalCountableItems");
    }

    getNoncriticalCountableItems(){
        return axios.get(BACKEND_BASE_URL +  COUNTABLE_URL + "getNoncriticalCountableItems")
    }

    updateCountableItem(item){
        return axios.put(BACKEND_BASE_URL + COUNTABLE_URL + "updateCountableItem", item);
    }

    deleteCountableItem(id){
        return axios.delete(BACKEND_BASE_URL + COUNTABLE_URL + "deleteCountableItem/" + id);
    }

    consumeItem(quantityUpdate){
        return axios.put(BACKEND_BASE_URL + COUNTABLE_URL + "consumeItem",quantityUpdate);
    }

    replenishItem(quantityUpdate){
        return axios.put(BACKEND_BASE_URL + COUNTABLE_URL  + "replenishItem" ,quantityUpdate);
    }

    getItemBySiteId(id){
        return axios.get(BACKEND_BASE_URL + COUNTABLE_URL + "getItemBySiteId/" + id);
    }



}
export default new CountableItemService();