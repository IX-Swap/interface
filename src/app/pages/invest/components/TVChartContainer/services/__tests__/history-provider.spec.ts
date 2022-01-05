import { charts } from 'config/apiURL'
import apiService from 'services/api'

import { getBars } from '../history-provider'
import { sampleResponse, symbolData, sampleBars } from '__fixtures__/tvChart'
import {
  ErrorCallback,
  HistoryCallback,
  ResolutionString
} from 'charting_library'
import { BarsStatus } from 'types/tvChart'

describe('getBars', () => {
  let onResult: HistoryCallback
  let onError: ErrorCallback
  const isFirstCall = false
  const rangeStartDate = 123
  const rangeEndDate = 456
  const resolution = '240' as ResolutionString
  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    onResult = jest.fn()
    onError = jest.fn()
    const response = {
      data: sampleResponse
    }
    jest
      .spyOn(apiService, 'get')
      .mockImplementation(async () => await Promise.resolve(response as any))
  })

  it('Calls apiService with correct path and params', () => {
    getBars(
      symbolData,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onResult,
      onError,
      isFirstCall
    )
    expect(apiService.get).toHaveBeenCalledTimes(1)
    expect(apiService.get).toHaveBeenCalledWith(charts.history, {
      params: {
        symbol: symbolData.ticker,
        from: rangeStartDate,
        to: rangeEndDate,
        currencyCode: symbolData.currency_code,
        resolution
      }
    })
  })

  it('Calls callback with Result', () => {
    getBars(
      symbolData,
      resolution,
      rangeStartDate,
      rangeEndDate,
      onResult,
      onError,
      isFirstCall
    )
    const meta = { noData: false }
    setTimeout(
      () => expect(onResult).toHaveBeenCalledWith(sampleBars, meta),
      50
    )
  })
  describe('getBars with no_data', () => {
    const nextTime = 2345
    beforeEach(() => {
      onResult = jest.fn()
      onError = jest.fn()
      const response = {
        data: {
          s: BarsStatus.NO_DATA,
          nextTime
        }
      }
      jest
        .spyOn(apiService, 'get')
        .mockImplementation(async () => await Promise.resolve(response as any))
    })
    it('Calls callback with correct data when no_data', () => {
      getBars(
        symbolData,
        resolution,
        rangeStartDate,
        rangeEndDate,
        onResult,
        onError,
        isFirstCall
      )
      const meta = { noData: true, nextTime }
      setTimeout(() => expect(onResult).toHaveBeenCalledWith([], meta), 50)
    })
  })
})
