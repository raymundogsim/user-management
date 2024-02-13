import axios from "axios";
import { api_url } from "features/config";


export default axios.create({
    baseURL: api_url,
    headers: {
        "Content-type": "application/json"
    }
});