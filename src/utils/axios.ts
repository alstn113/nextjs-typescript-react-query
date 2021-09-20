import axios from 'axios';

const client = axios.create();
const baseURL = process.env.NEXT_PUBLIC_ENDPOINT;

client.defaults.baseURL = baseURL;
client.defaults.withCredentials = true;

export default client;
