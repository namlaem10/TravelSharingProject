import axios from 'axios';
import {BASE_URL} from './URL';
//import store from "../store/configureStore";

class APIService {
  constructor(options) {
    this.baseUrl = BASE_URL;
  }

  post(endpoint, params, token = null, contentType = 'application/json') {
    return this.requestHttp(
      'POST',
      this.baseUrl + endpoint,
      params,
      token,
      contentType,
    );
  }

  get(endpoint, token = null, params = null) {
    return this.requestHttp('GET', this.baseUrl + endpoint, params, token);
  }

  put(endpoint, params, token = null, contentType = 'application/json') {
    return this.requestHttp(
      'PUT',
      this.baseUrl + endpoint,
      params,
      token,
      contentType,
    );
  }

  patch(endpoint, params, token = null) {
    return this.requestHttp('PATCH', this.baseUrl + endpoint, params, token);
  }

  delete(endpoint, params, token = null) {
    return this.requestHttp('DELETE', this.baseUrl + endpoint, params, token);
  }

  requestHttp(
    method,
    url,
    params,
    token = null,
    contentType = 'application/json',
  ) {
    return new Promise((resolve, reject) => {
      let lang = 'en';
      //const { language } = store.getState();
      //lang = language.lang;
      const config = {
        method,
        url,
        headers: {
          Accept: 'application/json',
          'Content-Type': contentType,
          //"Accept-Language": lang
        },
      };

      if (params) {
        config.data = params;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      axios(config)
        .then(response => {
          console.log('login success');
          resolve(response.data);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Error 1', error.response);
            reject(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            // error.request is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            reject(error.request);
            console.log('Error 2', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error 3', error.message);
            reject(error);
          }
          // console.log('Error 4', error.config);
        });
    });
  }
}

const apiService = new APIService();
export default apiService;
