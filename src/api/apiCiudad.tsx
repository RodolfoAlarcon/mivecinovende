import axios from 'axios';

const ciudadesApi = axios.create ({
    baseURL:'https://04.contenedoresnolvis.com/api',
});

export default ciudadesApi;