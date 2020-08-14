import axios, { AxiosStatic } from 'axios'
import apiService from '../index'
import {
  url,
  successfulResponse,
  unsuccessfulResponse,
  headers,
  postJSON,
  postJSONString,
  postJSONHeaders,
  postFormData,
  postFormDataHeaders,
  customConfig
} from '__fixtures__/api'

const axiosMock = axios as jest.Mocked<AxiosStatic>

describe('apiService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with right defaults', () => {
    expect(axiosMock.create).toHaveBeenCalledTimes(1)
    expect(axiosMock.defaults.baseURL).toBe(process.env.REACT_APP_API_URL)
    expect(axiosMock.defaults.withCredentials).toBe(true)
  })

  describe('get', () => {
    it('should send a request with right configuration', () => {
      const expectedConfig = {
        method: 'get',
        headers,
        url
      }

      apiService.get(url)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(axiosMock.request).toHaveBeenCalledWith(expectedConfig)
    })

    it('should apply custom request config', () => {
      const expectedConfig = {
        method: 'get',
        headers,
        url
      }

      apiService.get(url, customConfig)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(axiosMock.request).toHaveBeenCalledWith({
        ...customConfig,
        ...expectedConfig
      })
    })

    it('should handle success', async () => {
      axiosMock.request.mockResolvedValueOnce({ data: successfulResponse })

      const response = await apiService.get(url)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(successfulResponse)
    })

    it('should handle failure', async () => {
      axiosMock.request.mockResolvedValueOnce({ data: unsuccessfulResponse })

      const response = await apiService.get(url)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(unsuccessfulResponse)
    })
  })

  describe('post', () => {
    it('should send a request with JSON data', () => {
      const expectedConfig = {
        method: 'post',
        data: postJSONString,
        headers: postJSONHeaders,
        url
      }

      apiService.post(url, postJSON)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(axiosMock.request).toHaveBeenCalledWith(expectedConfig)
    })

    it('should apply custom request config', () => {
      const expectedConfig = {
        method: 'post',
        data: postJSONString,
        headers: postJSONHeaders,
        url
      }

      apiService.post(url, postJSON, customConfig)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(axiosMock.request).toHaveBeenCalledWith({
        ...customConfig,
        ...expectedConfig
      })
    })

    it('should send a request with FormData', () => {
      const expectedConfig = {
        method: 'post',
        data: postFormData,
        headers: postFormDataHeaders,
        url
      }

      apiService.post(url, postFormData)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(axiosMock.request).toHaveBeenCalledWith(expectedConfig)
    })

    it('should handle success', async () => {
      axiosMock.request.mockResolvedValueOnce({ data: successfulResponse })

      const response = await apiService.post(url, postJSON)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(successfulResponse)
    })

    it('should handle failure', async () => {
      axiosMock.request.mockResolvedValueOnce({ data: unsuccessfulResponse })

      const response = await apiService.post(url, postJSON)

      expect(axiosMock.request).toHaveBeenCalledTimes(1)
      expect(response).toEqual(unsuccessfulResponse)
    })

    it("should set response message to the server's response error if request failed", async () => {
      axiosMock.request.mockImplementationOnce(() => {
        return Promise.reject({
          response: {
            data: unsuccessfulResponse
          }
        })
      })

      const response = await apiService.post(url, {})

      expect(response.message).toBe(unsuccessfulResponse.message)
    })

    it('should set response message to the catched error if one were thrown', async () => {
      const errorMessage = 'Spooky error'
      axiosMock.request.mockImplementationOnce(() => {
        throw new Error(errorMessage)
      })

      const response = await apiService.post(url, {})

      expect(response.message).toBe(errorMessage)
    })
  })
})
