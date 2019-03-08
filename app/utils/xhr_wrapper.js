import fetch from 'axios';
import _ from 'lodash';

const methods = ['get', 'post', 'put', 'patch', 'del', 'head'];

class Client {
  constructor() {
    methods.forEach(method => {
      this[method] = Client.requestWrapper(method);
    });
  }

  static requestWrapper(method) {
    return async (url, data = null, options = {}) => {
      const { requestURL, request } = await Client.decorateRequest({
        method,
        url,
        data,
        options
      });
      return new Promise((resolve, reject) => {
        fetch(requestURL, request)
          .then(response => Client.checkStatus(response, resolve, reject))
          .catch(error => Client.checkStatus(error, resolve, reject))
          .catch(reject);
      });
    };
  }

  static checkStatus(response, resolve, reject) {
    if (!_.get(response, ['response']) && !_.get(response, ['data'])) {
      return reject(response);
    }
    const status = response.status || response.response.status;
    return (status >= 200 && status < 300) ? resolve(response) : resolve(response.response);
  }

  static async decorateRequest({ method, url, options }) {
    const requestURL = `https://api.unsplash.com/${url}`;
    const requestHeadersDataDecoration = await Client.getHeaderDataDecoration();
    return {
      request: {
        ...options,
        ...requestHeadersDataDecoration,
        method
      },
      requestURL
    };
  }

  static async getHeaderDataDecoration() {
    return {
      headers: {
        authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    };
  }
}

export default new Client();
