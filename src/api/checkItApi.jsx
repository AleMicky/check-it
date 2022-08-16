import axios from 'axios';

export const checkItApi = axios.create({
    baseURL: 'https://carga-postgres.herokuapp.com/api'
});

