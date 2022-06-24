import axios from 'axios';

const apiApp = axios.create({
    baseURL: 'https://01.metodolibio.com/api',//'http://127.0.0.1:8000/api',
})



export default apiApp;