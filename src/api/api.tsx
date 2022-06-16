import axios from 'axios';

const apiApp = axios.create({
    baseURL: 'https://01.metodolibio.com/api',//'http://127.0.0.1:8000/api',
    headers: {"Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic NThmYmIxNWItY2FkOC00NDBjLTg3ZTQtMmZjMjMxMmFkYTgw"},
    
    /*params:{
        api_key:'f96689e923236ccc3b2f57cc9c38a668',
        language: 'es-ES'
    }*/
})



export default apiApp;