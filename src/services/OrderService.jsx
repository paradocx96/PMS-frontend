// @author IT19180526 - Chandrasiri SANLD

import axios from "axios";
import connection from "./connection.json";

const SERVICE_URL = "/api/v1/order";
const URL = connection.localAddress + SERVICE_URL;

export default new class OrderService {

    create(value) {
        return axios.post(URL + "/purchase/", value);
    }

    getAll() {
        return axios.get(URL + "/get/");
    }

    getById(id) {
        return axios.get(URL + "/getById/" + id);
    }

    getByStatus(status) {
        return axios.get(URL + "/getByStatus/" + status);
    }

    getBySiteId(id) {
        return axios.get(URL + "/getBySiteId/" + id);
    }

    getByProjectId(id) {
        return axios.get(URL + "/getByProjectId/" + id);
    }

    deleteById(id) {
        return axios.delete(URL + "/deleteById/" + id);
    }

    update(value) {
        return axios.put(URL + "/update/", value);
    }

    archive(value) {
        return axios.put(URL + "/archive/", value);
    }

    updateStatus(value) {
        return axios.put(URL + "/updateStatus/", value);
    }
}