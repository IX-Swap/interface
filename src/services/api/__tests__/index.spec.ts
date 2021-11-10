import axios from 'axios'
import apiService from '../index'
import {
  url,
  successfulResponse,
  unsuccessfulResponse,
  headers,
  postJSON,
  postJSONHeaders,
  postFormData,
  postFormDataHeaders,
  customConfig
} from '__fixtures__/api'

describe('apiService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with right defaults', () => {
    jest.spyOn(axios, 'create')

    expect(axios.create).toHaveBeenCalledTimes(1)
    expect(axios.defaults.baseURL).toBe(process.env.REACT_APP_API_URL)
    expect(axios.defaults.withCredentials).toBe(true)
  })

  describe('get', () => {
    it('should send a request with right configuration', async () => {
      const expectedConfig = {
        method: 'get',
        headers,
        url
      }

      await apiService.get(url)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(axios.request).toHaveBeenCalledWith(expectedConfig)
    })

    it('should apply custom request config', async () => {
      const expectedConfig = {
        method: 'get',
        headers,
        url
      }

      await apiService.get(url, customConfig)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(axios.request).toHaveBeenCalledWith({
        ...customConfig,
        ...expectedConfig
      })
    })

    it('should handle success', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue(successfulResponse)

      const response = await apiService.get(url)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(successfulResponse)
    })

    it('should handle failure', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue(unsuccessfulResponse)

      const response = await apiService.get(url)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(unsuccessfulResponse)
    })
  })

  describe('post', () => {
    it('should send a request with JSON data', async () => {
      const expectedConfig = {
        method: 'post',
        data: postJSON,
        headers: postJSONHeaders,
        url
      }

      await apiService.post(url, postJSON)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(axios.request).toHaveBeenCalledWith(expectedConfig)
    })

    it('should apply custom request config', async () => {
      const expectedConfig = {
        method: 'post',
        data: postJSON,
        headers: postJSONHeaders,
        url
      }

      await apiService.post(url, postJSON, customConfig)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(axios.request).toHaveBeenCalledWith({
        ...customConfig,
        ...expectedConfig
      })
    })

    it('should send a request with FormData', async () => {
      const expectedConfig = {
        method: 'post',
        data: postFormData,
        headers: postFormDataHeaders,
        url
      }

      await apiService.post(url, postFormData)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(axios.request).toHaveBeenCalledWith(expectedConfig)
    })

    it('should handle success', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue(successfulResponse)

      const response = await apiService.post(url, postJSON)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(successfulResponse)
    })

    it('should handle failure', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue(unsuccessfulResponse)

      const response = await apiService.post(url, postJSON)

      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(unsuccessfulResponse)
    })
  })
})
