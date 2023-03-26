import axios from 'axios';

const csrfToken = document.querySelector('meta[name="_csrf"]')?.getAttribute('content');

// create a new instance of Axios with default options
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // headers: {
  //   'X-CSRF-TOKEN': csrfToken,
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  //   Authorization: 'Basic ZHZlZ2E6cGFzc3dvcmQ=',
  // },
});

export default instance;
