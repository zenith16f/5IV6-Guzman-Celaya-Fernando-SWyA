import axios from "axios";

const config=axios.create({
    baseURL:"http://localhost:3000/",
    withCredentials:true
});

export default config;
