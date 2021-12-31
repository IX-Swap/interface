import {
  responseErrorInterceptor,
  responseSuccessInterceptor
} from 'services/api/interceptors'
import {} from 'test-utils'
import storageService from 'services/storage'
import socketService from 'services/socket'
import { history } from 'config/history'
import { AxiosError } from 'axios'

jest.mock('services/storage', () => ({
  remove: jest.fn(() => null)
}))

jest.mock('services/socket', () => ({
  disconnect: jest.fn(() => null)
}))

describe('interceptors', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  describe('responseErrorInterceptor', () => {
    it('throws correct error message and message when error.response is undefined', () => {
      let thrownError
      try {
        responseErrorInterceptor({ message: 'error message', code: 'ERRCODE' })
      } catch (error) {
        thrownError = error
      }

      expect((thrownError as AxiosError).code).toEqual('ERRCODE')
      expect((thrownError as AxiosError).message).toEqual('error message')
    })

    it('throws correct error message when error.response is defined', () => {
      let thrownError
      try {
        responseErrorInterceptor({
          response: {
            data: {
              message: 'response error message',
              code: 'RESERRCODE'
            }
          }
        })
      } catch (error) {
        thrownError = error
      }

      expect((thrownError as AxiosError).code).toEqual('RESERRCODE')
      expect((thrownError as AxiosError).message).toEqual(
        'response error message'
      )
    })

    it('throws correct error message when error.response is undefined and error code is undefined', () => {
      let thrownError
      try {
        responseErrorInterceptor({ message: 'error message', name: 'ERRNAME' })
      } catch (error) {
        thrownError = error
      }

      expect((thrownError as AxiosError).code).toEqual('ERRNAME')
      expect((thrownError as AxiosError).message).toEqual('error message')
    })

    it('handles access denied errors correctly', () => {
      try {
        responseErrorInterceptor({
          response: {
            data: {
              message: 'response error message',
              code: 'RWCO-IHJ78K'
            }
          }
        })
      } catch (error) {}
      expect(storageService.remove).toHaveBeenNthCalledWith(1, 'user')
      expect(storageService.remove).toHaveBeenNthCalledWith(2, 'visitedUrl')
      expect(storageService.remove).toHaveBeenNthCalledWith(
        3,
        'notificationFilter'
      )
      expect(socketService.disconnect).toHaveBeenCalled()

      expect(history.location.pathname).toEqual('/')
    })
  })

  describe('responseSuccessInterceptor', () => {
    it('returns correct data when data is blob', () => {
      const blob: any = new Blob([''], { type: 'text/html' })
      blob.lastModifiedDate = ''
      blob.name = 'filename'

      const fakeF = blob as File

      const blobResponse = {
        data: fakeF
      }
      expect(responseSuccessInterceptor(blobResponse as any)).toEqual(
        expect.objectContaining({
          data: fakeF
        })
      )
    })

    it('returns correct data when data is object', () => {
      const dataResponse = {
        data: { data: 'string data', message: 'response message' }
      }
      expect(responseSuccessInterceptor(dataResponse as any)).toEqual(
        expect.objectContaining({
          data: 'string data',
          message: 'response message'
        })
      )
    })
  })
})
