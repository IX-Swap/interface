import { charts } from 'config/apiURL'
import apiService from 'services/api'

import {
  onReady,
  resolveSymbol,
  getServerTime,
  searchSymbols
} from '../datafeed'
import { config, symbolData, defaultSearchResult } from '__fixtures__/tvChart'
import {
  ErrorCallback,
  OnReadyCallback,
  ResolveCallback,
  SearchSymbolsCallback,
  ServerTimeCallback
} from 'types/charting_library'
import { SYMBOL_SEARCH_LIMIT } from '../../constants'

describe('onReady', () => {
  let callback: OnReadyCallback
  afterEach(async () => {
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

describe('getServerTime', () => {
  const validTime = 123
  let callback: ServerTimeCallback
  afterEach(async () => {
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
