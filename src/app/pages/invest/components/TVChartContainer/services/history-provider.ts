import { AxiosResponse } from 'axios'
import {
  Bar,
  ErrorCallback,
  HistoryCallback,
  HistoryMetadata,
  LibrarySymbolInfo,
  ResolutionString
} from 'charting_library'
import { charts } from 'config/apiURL'
import apiService from 'services/api'
import {
  BarsStatus,
  barsStatusNonError,
  GetBarsResult,
  HistoryParams,
  HistoryResponse
} from 'types/tvChart'

export const getBarsData = async (
  symbolInfo: LibrarySymbolInfo,
  resolution: ResolutionString,
  rangeStartDate: number,
  rangeEndDate: number
): Promise<GetBarsResult> => {
  return await new Promise(
    (
      resolve: (result: GetBarsResult) => void,
      reject: (reason: string) => void
    ) => {
      apiService
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
            reject(data.errmsg ?? '')
            return
          }

          let bars: Bar[] = []
          const meta: HistoryMetadata = {
            noData: false
          }

          if (data.s === BarsStatus.NO_DATA) {
            meta.noData = true
            meta.nextTime = data.nextTime
          } else {
            bars = getProcessedBars(data)
          }
          resolve({
            bars,
            meta
          })
        })
        .catch(error => {
          reject(error.message)
        })
    }
  )
}

export const getBars = (
  symbolInfo: LibrarySymbolInfo,
  resolution: ResolutionString,
  rangeStartDate: number,
  rangeEndDate: number,
  onResult: HistoryCallback,
  onError: ErrorCallback,
  isFirstCall: boolean
) => {
  getBarsData(symbolInfo, resolution, rangeStartDate, rangeEndDate)
    .then((result: GetBarsResult) => {
      onResult(result.bars, result.meta)
    })
    .catch(onError)
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
