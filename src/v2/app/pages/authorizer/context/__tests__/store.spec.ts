import { AuthorizerTableStore } from 'v2/app/pages/authorizer/context/store'
import apiService from 'v2/services/api'
import { snackbarService } from 'uno-material-ui'
import {
  approveResponseFailure,
  approveResponseSuccess,
  authorizerURLs,
  bank,
  rejectResponseFailure,
  rejectResponseSuccess
} from '__fixtures__/authorizer'

jest.mock('v2/services/api')

const apiServiceMock = apiService as jest.Mocked<typeof apiService>
const snackbarServiceMock = snackbarService as jest.Mocked<
  typeof snackbarService
>

describe('AuthorizerTableStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should have correct default values', () => {
    const store = new AuthorizerTableStore()

    expect(store.idKey).toBe('_id')
    expect(store.uri).toBe('')
  })

  describe('setIdKey', () => {
    it('sets idKey to provided payload', () => {
      const key = 'key'
      const store = new AuthorizerTableStore()

      store.setIdKey(key)

      expect(store.idKey).toBe(key)
    })

    it('sets idKey to default value if no value provided', () => {
      const store = new AuthorizerTableStore()

      store.setIdKey()

      expect(store.idKey).toBe(store.idKey)
    })
  })

  describe('setUri', () => {
    it('sets uri to provided payload', () => {
      const uri = '/uri/address'
      const store = new AuthorizerTableStore()

      store.setUri(uri)

      expect(store.uri).toBe(uri)
    })
  })

  describe('_getItemId', () => {
    it('returns an item id there is matching value in item', () => {
      const store = new AuthorizerTableStore()

      const id = store._getItemId(bank)

      expect(id).toBe(bank._id)
    })

    it('returns an empty string otherwise', () => {
      const store = new AuthorizerTableStore()

      const id = store._getItemId({})

      expect(id).toBe('')
    })
  })
})
