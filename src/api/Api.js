import axios from "axios";

export const getApi = axios.create({
    // developement
    baseURL :'http://localhost:3000'
});