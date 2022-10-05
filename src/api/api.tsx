import axios from 'axios';

const apiApp = axios.create({
    baseURL: 'https://14.sdcecuador.com/api',
})



export default apiApp;