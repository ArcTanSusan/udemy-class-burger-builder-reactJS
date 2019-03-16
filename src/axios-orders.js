import axios from 'axios';

const axiosinst = axios.create({
  baseURL: 'https://react-my-burger-fedec.firebaseio.com/'
})

export default axiosinst;
