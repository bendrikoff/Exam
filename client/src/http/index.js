import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:1337'
});

const $authHost = axios.create({
    baseURL: 'http://localhost:1337',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
});

export {
    $host, $authHost 
}