import fetch from 'axios';
import _ from 'lodash';

const methods = ['get', 'post', 'put', 'patch', 'del', 'head'];

class Client {
  constructor() {
    methods.forEach(method => this[method] = this.requestWrapper(method));
  }

  requestWrapper(method) {
    return async (url, data = null, options = {}) => {
      const { requestURL, request } = await this.decorateRequest({
        method,
        url,
        data,
        options
      });
      return new Promise((resolve, reject) => {
        fetch(requestURL, request)
          .then((response) => this.checkStatus(response, resolve, reject))
          .catch((error) => this.checkStatus(error, resolve, reject))
          .catch(reject);
      });
    };
  };

  checkStatus(response, resolve, reject) {
    if (!_.get(response, ['response']) && !_.get(response, ['data'])) {
      return reject(response);
    }
    const { status, data } = response;
    if (status >= 200 && status < 300) {
      return resolve(data);
    } else if (status >= 300 && status < 400) {
    } else if (status === 400) {
      throw new Error('Probably is a validation error');
    } else if (status === 403 || status === 401) {
      resolve(data);
    } else if (status === 404) {
      throw new Error('Not Found');
    } else if (status >= 500) {
      throw new Error('Server error');
    }
  }

  async decorateRequest({ method, url, options }) {
    const requestURL = `https://api.unsplash.com/${url}`;
    const requestHeadersDataDecoration = await this.getHeaderDataDecoration();
    return {
      request: {
        ...options,
        ...requestHeadersDataDecoration,
        method
      },
      requestURL
    };
  }

  async getHeaderDataDecoration() {
    return {
      headers: {
        authorization: `Client-ID ${process.env.UNSPLASH_API_TOKEN}`
      }
    };
  };
}

export default new Client();
