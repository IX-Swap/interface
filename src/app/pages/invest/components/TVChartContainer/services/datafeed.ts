import { AxiosResponse } from 'axios'
import {
  DatafeedConfiguration,
  ErrorCallback,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  ServerTimeCallback,
  SubscribeBarsCallback
} from 'charting_library'
import { charts } from 'config/apiURL'
import apiService from 'services/api'
import { SYMBOL_SEARCH_LIMIT, UPDATE_FREQUENCY } from '../constants'
import { DataPulseProvider } from './data-pulse-provider'
import { getBars } from './history-provider'
export const onReady = (onReadyCallback: OnReadyCallback) => {
  void apiService
    .get(charts.config)
    .then((response: AxiosResponse<DatafeedConfiguration>) => {
      onReadyCallback(response.data)
    })
    .catch(error => {
      console.error(error.message)
    })
}

export const resolveSymbol = (
  symbolName: string,
  onResolve: ResolveCallback,
  onError: ErrorCallback
) => {
  void apiService
    .get(charts.symbols, {
      params: {
        symbol: symbolName
      }
    })
    .then((response: AxiosResponse<LibrarySymbolInfo>) => {
      onResolve(response.data)
    })
    .catch(error => {
      onError(error.message)
    })
}

export const getServerTime = (callback: ServerTimeCallback) => {
  void apiService.get(charts.time).then(response => {
    const { data } = response
    const { time } = data
    if (!isNaN(time)) {
      callback(time)
    }
  })
}

export const searchSymbols = (
  userInput: string,
  exchange: string,
  symbolType: string,
  onResult: SearchSymbolsCallback
) => {
  void apiService
    .get(charts.search, {
      params: {
        query: userInput.toUpperCase(),
        type: symbolType,
        exchange,
        limit: SYMBOL_SEARCH_LIMIT
      }
    })
    .then(result => {
      const { data } = result
      onResult(data)
    })
    .catch(result => {
      onResult([])
    })
}

export const getDataFeed = () => {
  const dataPulseProvider = new DataPulseProvider(UPDATE_FREQUENCY)
  const datafeed = {
    onReady,
    searchSymbols,
    resolveSymbol,
    getBars,
    getServerTime,
    subscribeBars: (
      symbolInfo: LibrarySymbolInfo,
      resolution: ResolutionString,
      onTick: SubscribeBarsCallback,
      listenerGuid: string,
      onResetCacheNeededCallback: () => void
    ) => {
      dataPulseProvider.subscribeBars(
        symbolInfo,
        resolution,
        onTick,
        listenerGuid
      )
    },
    unsubscribeBars: (subscriberUID: any) => {
      dataPulseProvider.unsubscribeBars(subscriberUID)
    }
  }
  return datafeed
}
