import axios from 'axios';
import { API_URL } from 'config';
import store from 'state';
import { postLogin } from 'state/auth/actions';
import { saveAccount } from 'state/user/actions';
import { auth, metamask } from './apiUrls';
import { responseSuccessInterceptor } from './interceptors';
import {
  LONG_WAIT_RESPONSE,
  LONG_WAIT_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  CREATED_RESPONSE_CODE,
} from 'constants/misc';
import * as Sentry from '@sentry/react';

const _axios = axios.create();
_axios.defaults.baseURL = API_URL;

_axios.interceptors.response.use(responseSuccessInterceptor, async function responseErrorInterceptor(error) {
  if (error.response.status !== OK_RESPONSE_CODE && error.response.status !== CREATED_RESPONSE_CODE) {
    const method = error.response?.config?.method;
    if (error.response?.config?.url?.includes('kyc') && (method === 'post' || method === 'put')) {
      Sentry.addBreadcrumb({
        category: 'KYC',
        level: 'error',
        message: error.response?.data?.message,
        data: error.response?.data,
      });

      const message = `API Error ${method.toUpperCase()} ${error.response?.config?.url}: ${error.response?.data?.message}`;
      Sentry.captureMessage(message);
    }
  }

  const originalConfig = error.config;
  const shouldRetry = () => {
    const loginUrLs = [metamask.login, metamask.challenge];
    return !loginUrLs.includes(originalConfig.url);
  };
  if (shouldRetry() && error.response) {
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const { auth: authState, user: { account } } = store.getState();
      try {
        const refreshToken = authState.refreshToken[account ?? ''];

        if (refreshToken) {
          store.dispatch(postLogin.pending(account));
          const response = await _axios.post(auth.refresh, { refreshToken });
          if (!response.data) {
            store.dispatch(
              postLogin.rejected({
                errorMessage: 'No response on refresh token',
                account,
              })
            );
            return;
          }
          store.dispatch(
            postLogin.fulfilled({
              auth: response.data,
              account,
            })
          );
          return _axios(originalConfig);
        } else {
          store.dispatch(saveAccount({ account: '' }));
        }
      } catch (error) {
        console.error({ requestError: error.message });
        store.dispatch(postLogin.rejected({ errorMessage: error.message, account }));
      }
    }

    if (error.response) {
      const message = error.response.data.message;
      throw new Error(message);
    }
    if (error.response.status === LONG_WAIT_RESPONSE_CODE) {
      throw new Error(LONG_WAIT_RESPONSE);
    }
  }
});

const apiService = {
  async request({ method, uri, data, axiosConfig = {}, params = {} }) {
    const requestConfig = {
      uri,
      method,
      data,
      params,
      axiosConfig,
    };

    return await _axios.request(requestConfig);
  },

  get: async function get(uri, config = {}, params = {}) {
    return await this.request({
      method: 'get',
      uri,
      params,
      axiosConfig: config,
    });
  },

  async patch(uri, data, axiosConfig = {}) {
    return await this.request({
      method: 'patch',
      uri,
      data,
      axiosConfig,
    });
  },

  async delete(uri, data, axiosConfig = {}) {
    return await this.request({
      method: 'delete',
      uri,
      data,
      axiosConfig,
    });
  },

  async post(uri, data, axiosConfig = {}) {
    return await this.request({
      method: 'post',
      uri,
      data,
      axiosConfig,
    });
  },

  async put(uri, data, config = {}) {
    return await this.request({
      method: 'put',
      uri,
      data,
      axiosConfig: config,
    });
  },

  _getErrorMessage(error) {
    let message = 'Unknown error';
    if (error.response) {
      message = error.response.data.message || error.response.message;
    } else {
      message = error.message;
    }
    return message;
  },

  _prepareRequestConfig({ uri, axiosConfig, data, method, params }) {
    const body = this._prepareBody(data);
    const headers = this._prepareHeaders(data);
    const requestConfig = {
      ...axiosConfig,
      url: uri,
      headers,
      method,
      params,
    };

    if (method !== 'get' && data !== undefined) {
      requestConfig.data = body;
    }

    return requestConfig;
  },

  _isFormData(data) {
    return data instanceof FormData;
  },

  _prepareHeaders(data) {
    const headers = {
      'custom-origin': window.location.host,
    };
    const { auth, user } = store.getState();

    const token = auth.token[user.account ?? ''];
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (data !== undefined && !this._isFormData(data)) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  },

  _prepareBody(data) {
    return this._isFormData(data) ? data : JSON.stringify(data);
  },
};

export default apiService;