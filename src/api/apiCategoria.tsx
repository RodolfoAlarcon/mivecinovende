import axios from 'axios';

const categoriaApi = axios.create ({
    baseURL:'https://04.contenedoresnolvis.com/api',
});

export default categoriaApi;