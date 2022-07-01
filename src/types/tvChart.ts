import {
  Bar,
  ChartingLibraryWidgetOptions,
  HistoryMetadata,
  LibrarySymbolInfo,
  ResolutionString,
  SubscribeBarsCallback
} from 'charting_library'

export interface ChartContainerProps {
  symbol?: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  width?: ChartingLibraryWidgetOptions['width']
  height?: ChartingLibraryWidgetOptions['height']
  datafeed?: ChartingLibraryWidgetOptions['datafeed']
  fullscreen?: ChartingLibraryWidgetOptions['fullscreen']
  containerId: ChartingLibraryWidgetOptions['container_id']
  theme?: ChartingLibraryWidgetOptions['theme']
  // tvWidget: IChartingLibraryWidget | null
  // setTradingChart: (tvWidget: IChartingLibraryWidget) => void
  dataFeedUrl?: string
  toolbarBg?: string
  customCssUrl?: string
}
export interface HistoryParams {
  symbol: string
  from: number
  to: number
  resolution: ResolutionString
  currencyCode?: string
}

export enum BarsStatus {
  OK = 'ok',
  NO_DATA = 'no_data',
  ERROR = 'error'
}

export interface HistoryResponse {
  s: BarsStatus
  errmsg?: string
  t: number[]
  c: number[]
  o?: number[]
  h?: number[]
  l?: number[]
  v?: number[]
  nextTime?: number
}

export const barsStatusNonError = [BarsStatus.OK, BarsStatus.NO_DATA]

export interface GetBarsResult {
  bars: Bar[]
  meta: HistoryMetadata
}

export interface DataSubscriber {
  symbolInfo: LibrarySymbolInfo
  resolution: ResolutionString
  lastBarTime: number | null
  listener: SubscribeBarsCallback
}
export interface DataSubscribers {
  [guid: string]: DataSubscriber
}
