import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'http://localhost:8000',
});

export default fetcher;
