import axios from 'axios';

const sliderApi = axios.create ({
    baseURL:'https://14.sdcecuador.com/api',
});

export default sliderApi;