import axios from 'axios';

const http = axios.create({
    baseURL: 'https://online-gateway.ghn.vn/shiip/public-api/',
    headers: {
        'Content-Type': 'application/json',
        Token: '221a29d9-3a3e-11ed-8008-c673db1cbf27',
    },
});

export const get = async (path, option = {}) => {
    const reponse = await http.get(path, option);
    return reponse.data;
};

export const post = async (path, option = {}) => {
    const reponse = await http.post(path, option);
    return reponse.data;
};

export default http;
