import axios from 'axios';

const sliderApi = axios.create ({
    baseURL:'https://01.metodolibio.com/api',
});

export default sliderApi;