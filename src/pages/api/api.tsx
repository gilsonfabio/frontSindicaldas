import axios from "axios";

const api = 
  axios.create({baseURL: 'https://backcaldascard-i9dnxrve2-gilsonfabio.vercel.app/' });
  //axios.create({baseURL: 'https://backend-sindicaldas.herokuapp.com/' });
  //axios.create({baseURL: 'http://localhost:3333' });

export default api;
