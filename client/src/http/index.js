import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:1337'
});

export {
    $host
}