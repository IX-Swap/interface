import { charts } from 'config/apiURL'
import apiService from 'services/api'
import { cleanup } from 'test-utils'
import { onReady } from '../datafeed'

describe('onReady', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    jest.spyOn(apiService, 'get')
  })

  it('Calls apiService with correct path', () => {
    onReady(() => {})
    expect(apiService.get).toHaveBeenCalledTimes(1)
    expect(apiService.get).toHaveBeenCalledWith(charts.config)
  })

  it('Calls callback with Result', () => {
    const callback = jest.fn()
    onReady(callback)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
