import { charts } from 'config/apiURL'
import apiService from 'services/api'
import { cleanup } from 'test-utils'
import {
  onReady,
  resolveSymbol,
  getBars,
  getServerTime,
  searchSymbols
} from '../datafeed'
import {
  config,
  sampleResponse,
  symbolData,
  sampleBars,
  defaultSearchResult
} from '__fixtures__/tvChart'
import {
  ErrorCallback,
  HistoryCallback,
  OnReadyCallback,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  ServerTimeCallback
} from 'charting-library/charting_library'
import { BarsStatus } from 'types/tvChart'
import { SYMBOL_SEARCH_LIMIT } from '../../constants'

describe('onReady', () => {
  let callback: OnReadyCallback
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    const response = {
      data: config
    }
    jest
      .spyOn(apiService, 'get')
      .mockImplementation(async () => await Promise.resolve(response as any))
    callback = jest.fn()
  })

  it('Calls apiService with correct path', () => {
    onReady(callback)
    expect(apiService.get).toHaveBeenCalledTimes(1)
    expect(apiService.get).toHaveBeenCalledWith(charts.config)
  })

  it('Calls callback with Result', () => {
    onReady(callback)
    setTimeout(() => expect(callback).toHaveBeenCalledWith(config), 50)
  })
})

describe('resolveSymbol', () => {
  let onResolve: ResolveCallback
  let onError: ErrorCallback
  const symbolName = 'TST'

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    onResolve = jest.fn()
    onError = jest.fn()
    const response = {
      data: symbolData
    }
    jest
      .spyOn(apiService, 'get')
      .mockImplementation(async () => await Promise.resolve(response as any))
  })

  it('Calls apiService with correct path and params', () => {
    resolveSymbol(symbolName, onResolve, onError)
    expect(apiService.get).toHaveBeenCalledTimes(1)
    expect(apiService.get).toHaveBeenCalledWith(charts.symbols, {
      params: {
        symbol: symbolName
      }
    })
  })

  it('Calls callback with Result', () => {
    resolveSymbol(symbolName, onResolve, onError)
    setTimeout(() => expect(onResolve).toHaveBeenCalledWith(symbolData), 50)
  })
})

describe('getBars', () => {
  let onResult: HistoryCallback
  let onError: ErrorCallback
  const isFirstCall = false
  const rangeStartDate = 123
  const rangeEndDate = 456
  const resolution = '240' as ResolutionString
  afterEach(async () => {
    await cleanup()
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

describe('getServerTime', () => {
  const validTime = 123
  let callback: ServerTimeCallback
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    const response = {
      data: {
        time: validTime
      }
    }
    jest
      .spyOn(apiService, 'get')
      .mockImplementation(async () => await Promise.resolve(response as any))
    callback = jest.fn()
  })

  it('Calls apiService with correct path', () => {
    getServerTime(callback)
    expect(apiService.get).toHaveBeenCalledTimes(1)
    expect(apiService.get).toHaveBeenCalledWith(charts.time)
  })

  it('Calls callback with Result', () => {
    getServerTime(callback)
    setTimeout(() => expect(callback).toHaveBeenCalledWith(validTime), 50)
  })
})

describe('searchSymbols', () => {
  const userInput = 'et'
  const exchange = 'Test exchange'
  const symbolType = 'Currency'
  let onResult: SearchSymbolsCallback
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    const response = {
      data: defaultSearchResult
    }
    jest
      .spyOn(apiService, 'get')
      .mockImplementation(async () => await Promise.resolve(response as any))
    onResult = jest.fn()
  })

  it('Calls apiService with correct path', () => {
    searchSymbols(userInput, exchange, symbolType, onResult)
    expect(apiService.get).toHaveBeenCalledTimes(1)
    expect(apiService.get).toHaveBeenCalledWith(charts.search, {
      params: {
        query: userInput.toUpperCase(),
        type: symbolType,
        exchange,
        limit: SYMBOL_SEARCH_LIMIT
      }
    })
  })

  it('Calls callback with Result', () => {
    searchSymbols(userInput, exchange, symbolType, onResult)
    setTimeout(
      () => expect(onResult).toHaveBeenCalledWith(defaultSearchResult),
      50
    )
  })
})
