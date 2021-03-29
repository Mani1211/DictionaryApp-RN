import axios from 'axios';

export default axios.create({
  baseURL: 'https://od-api.oxforddictionaries.com',
});
