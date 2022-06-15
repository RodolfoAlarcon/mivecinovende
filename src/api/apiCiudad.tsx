import axios from 'axios';

const ciudadesApi = axios.create ({
    baseURL:'https://01.metodolibio.com/api',
});

export default ciudadesApi;