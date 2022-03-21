import axios from 'axios';

const sliderApi = axios.create ({
    baseURL:'https://04.contenedoresnolvis.com/api',
});

export default sliderApi;