import axios from 'axios';

const http = axios.create({
    baseURL: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/',
    headers: {
        token: '221a29d9-3a3e-11ed-8008-c673db1cbf27',
    },
});

export const get = async (path, option = {}) => {
    const reponse = await http.get(path, option);
    return reponse.data;
};

export default http;
