import axios from 'axios';

const ciudadesApi = axios.create ({
    baseURL:'http://directorio-profesional.devrossdigital.es/api',
});

export default ciudadesApi;