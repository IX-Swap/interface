import { AxiosResponse } from 'axios'
import {
  Bar,
  DatafeedConfiguration,
  ErrorCallback,
  HistoryCallback,
  HistoryMetadata,
  LibrarySymbolInfo,
  OnReadyCallback,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  ServerTimeCallback,
  SubscribeBarsCallback
} from 'charting-library/charting_library'
import { charts } from 'config/apiURL'
import apiService from 'services/api'
import {
  BarsStatus,
  barsStatusNonError,
  HistoryParams,
  HistoryResponse
} from 'types/tvChart'
import { SYMBOL_SEARCH_LIMIT } from '../constants'

const getHistoryParams = (
  symbolInfo: LibrarySymbolInfo,
  resolution: ResolutionString,
  rangeStartDate: number,
  rangeEndDate: number
) => {
  const params: HistoryParams = {
    symbol: symbolInfo.ticker ?? '',
    from: rangeStartDate,
    to: rangeEndDate,
    resolution
  }
  if (symbolInfo.currency_code !== undefined) {
    params.currencyCode = symbolInfo.currency_code
  }
  return params
}
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
const resolveSymbol = (
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

const getBars = (
  symbolInfo: LibrarySymbolInfo,
  resolution: ResolutionString,
  rangeStartDate: number,
  rangeEndDate: number,
  onResult: HistoryCallback,
  onError: ErrorCallback,
  isFirstCall: boolean
) => {
  void apiService
    .get(charts.history, {
      params: getHistoryParams(
        symbolInfo,
        resolution,
        rangeStartDate,
        rangeEndDate
      )
    })
    .then((response: AxiosResponse<HistoryResponse>) => {
      const { data } = response
      if (!barsStatusNonError.includes(data.s)) {
        onError(data.errmsg ?? '')
      }
      let bars: Bar[] = []
      const meta: HistoryMetadata = { noData: false }
      if (data.s === BarsStatus.NO_DATA) {
        meta.noData = true
        meta.nextTime = data.nextTime
      } else {
        bars = getProcessedBars(data)
      }
      onResult(bars, meta)
    })
    .catch(error => {
      onError(error.message)
    })
}

const getProcessedBars = (data: HistoryResponse): Bar[] => {
  const bars = []
  for (var i = 0; i < data.t.length; ++i) {
    const barValue = {
      time: data.t[i] * 1000,
      close: data.c[i],
      open: data.c[i],
      high: data.c[i],
      low: data.c[i]
    } as any
    if (data.o !== undefined && data.h !== undefined && data.l !== undefined) {
      barValue.open = data.o[i]
      barValue.high = data.h[i]
      barValue.low = data.l[i]
    }
    if (data.v !== undefined) {
      barValue.volume = data.v[i]
    }
    bars.push(barValue)
  }
  return bars
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
      // This is intentional
    },
    unsubscribeBars: (subscriberUID: any) => {
      // This is intentional
    }
  }
  return datafeed
}
