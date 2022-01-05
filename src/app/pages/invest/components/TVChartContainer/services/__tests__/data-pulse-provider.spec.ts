import apiService from 'services/api'

import { symbolData, sampleResponse, sampleBars } from '__fixtures__/tvChart'
import { ResolutionString } from 'charting_library'
import { DataPulseProvider } from '../data-pulse-provider'

describe('DataPulseProvider', () => {
  let dataPulseProvider: DataPulseProvider
  const firstResolution = '120' as ResolutionString
  const secondResolution = '240' as ResolutionString
  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    dataPulseProvider = new DataPulseProvider(100 * 1000)
  })

  it('subscribeBars', () => {
    const newDataCallback = jest.fn()
    const listenerGuid = 'test-id'
    dataPulseProvider.subscribeBars(
      symbolData,
      secondResolution,
      newDataCallback,
      listenerGuid
    )
    expect(dataPulseProvider.subscribers[listenerGuid]).toBeDefined()
  })
  it('subscribeBars does not rewrite existing subscribers', () => {
    const newDataCallback = jest.fn()
    const listenerGuid = 'test-id'
    dataPulseProvider.addSubscriber(
      symbolData,
      firstResolution,
      newDataCallback,
      listenerGuid
    )
    dataPulseProvider.subscribeBars(
      symbolData,
      secondResolution,
      newDataCallback,
      listenerGuid
    )
    expect(dataPulseProvider.subscribers[listenerGuid].resolution).toEqual(
      firstResolution
    )
  })
  it('unsubscribeBars removes subscriber', () => {
    const newDataCallback = jest.fn()
    const listenerGuid = 'test-id'
    dataPulseProvider.addSubscriber(
      symbolData,
      firstResolution,
      newDataCallback,
      listenerGuid
    )
    dataPulseProvider.unsubscribeBars(listenerGuid)
    expect(dataPulseProvider.subscribers[listenerGuid]).toBeUndefined()
  })
  it('unsubscribeBars removes subscriber', () => {
    const newDataCallback = jest.fn()
    const listenerGuid = 'test-id'
    dataPulseProvider.addSubscriber(
      symbolData,
      firstResolution,
      newDataCallback,
      listenerGuid
    )
    dataPulseProvider.unsubscribeBars(listenerGuid)
    expect(dataPulseProvider.subscribers[listenerGuid]).toBeUndefined()
  })
  it('updateData', () => {
    const newDataCallback = jest.fn()
    const response = {
      data: sampleResponse
    }
    jest
      .spyOn(apiService, 'get')
      .mockImplementation(async () => await Promise.resolve(response as any))
    const listenerGuid = 'test-id'
    dataPulseProvider.addSubscriber(
      symbolData,
      firstResolution,
      newDataCallback,
      listenerGuid
    )
    dataPulseProvider.updateData()
    setTimeout(
      () =>
        expect(newDataCallback).toHaveBeenCalledWith(sampleBars.slice(-1)[0]),
      50
    )
  })
})
