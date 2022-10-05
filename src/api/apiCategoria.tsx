import axios from 'axios';

const categoriaApi = axios.create ({
    baseURL:'http://54.236.227.86/api',
});

export default categoriaApi;