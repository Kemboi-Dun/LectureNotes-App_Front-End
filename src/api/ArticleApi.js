import axios from "axios";

export const getApi = axios.create({
    // developement
    baseURL :'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=471786815d6b4ccf97a44a024c590336'
});