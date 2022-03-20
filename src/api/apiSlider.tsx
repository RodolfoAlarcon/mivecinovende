import axios from 'axios';

const sliderApi = axios.create ({
    baseURL:'http://directorio-profesional.devrossdigital.es/api',
});

export default sliderApi;