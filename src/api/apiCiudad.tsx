import axios from 'axios';

const ciudadesApi = axios.create ({
    baseURL:'https://14.sdcecuador.com/api',
});

export default ciudadesApi;