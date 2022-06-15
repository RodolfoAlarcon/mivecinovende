import axios from 'axios';

const categoriaApi = axios.create ({
    baseURL:'https://01.metodolibio.com/api',
});

export default categoriaApi;