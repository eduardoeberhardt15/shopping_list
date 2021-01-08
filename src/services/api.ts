import axios from 'axios';

const api = axios.create({
    baseURL:'https://www.iservicebrazil.com.br' //https://www.iservicebrazil.com.br http://192.168.0.133:3333
});

export default api;