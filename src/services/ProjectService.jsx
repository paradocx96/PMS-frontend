// @author IT19180526 - Chandrasiri SANLD

import axios from "axios";
import connection from "./connection.json";

const SERVICE_URL = "/api/v1/project";
const URL = connection.remoteAddress + SERVICE_URL;

export default new class ProjectService {

    create(value) {
        return axios.post(URL + "/save/", value);
    }

    getAll() {
        return axios.get(URL + "/get/");
    }

    getById(id) {
        return axios.get(URL + "/getById/" + id);
    }

    getBySiteId(id) {
        return axios.get(URL + "/getBySiteId/" + id);
    }

    getByManagerId(id) {
        return axios.get(URL + "/getByManagerId/" + id);
    }

    deleteById(id) {
        return axios.delete(URL + "/deleteById/" + id);
    }

    update(value) {
        return axios.put(URL + "/update/", value);
    }

}