import axios from 'axios';

const checkItApi = axios.create({
    baseURL: 'https://carga-postgres.herokuapp.com/api'
});

export default checkItApi;
