import React,{Component} from "react";
import connection from './connection.json';
import axios from "axios";


const BACKEND_BASE_URL = connection.localAddress;
const SITE_URL = "/api/site/";

class SiteService extends Component{
    constructor(props) {
        super(props);

    }

    getAllSites(){
        return axios.get(BACKEND_BASE_URL + SITE_URL + "getAllSites");
    }

    addSite(site){
        return axios.post(BACKEND_BASE_URL + SITE_URL + "addSite", site);
    }

    getSiteById(id){
        return axios.get(BACKEND_BASE_URL + SITE_URL + "getSiteById/" + id);
    }

    deleteSite(id){
        return axios.delete(BACKEND_BASE_URL + SITE_URL + "deleteSite/" + id);
    }

    updateSite(site){
        return axios.put(BACKEND_BASE_URL + SITE_URL + "updateSite", site);
    }

}

export default new SiteService();