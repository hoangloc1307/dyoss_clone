import axios from 'axios';

export const GHN = axios.create({
    baseURL: 'https://online-gateway.ghn.vn/shiip/public-api/',
    headers: {
        'Content-Type': 'application/json',
        Token: '221a29d9-3a3e-11ed-8008-c673db1cbf27',
    },
});

export const Dyoss = axios.create({
    baseURL: 'https://dyoss-api.herokuapp.com/api/',
});

export const get = async (instance, path, option = {}) => {
    const reponse = await instance.get(path, option);
    return reponse.data;
};

export const post = async (instance, path, option = {}) => {
    const reponse = await instance.post(path, option);
    return reponse.data;
};
