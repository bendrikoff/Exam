import axios from "axios";
import {adress} from "../components/Consts";

const $host = axios.create({
    baseURL: adress
});

const $authHost = axios.create({
    baseURL: adress,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
});

export {
    $host, $authHost 
}