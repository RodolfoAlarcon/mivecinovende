import axios from 'axios';

const categoriaApi = axios.create ({
    baseURL:'https://14.sdcecuador.com//api',
});

export default categoriaApi;