import {
  ErrorCallback,
  HistoryCallback,
  LibrarySymbolInfo,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SeriesFormat,
  SubscribeBarsCallback,
  Timezone
} from 'charting_library'

export const sampleResponse = {
  s: 'ok',
  t: [1621123200, 1621209600, 1621296000],
  o: [11.401092213679004, 11.146026013215472, 10.012423098040488],
  h: [14.995080373961207, 14.998159951905166, 14.975964168949814],
  l: [10.012807456345774, 10.050266174050345, 10.012423098040488],
  c: [10.176683975620463, 10.49146609655811, 11.128767610079938],
  v: [1210, 1744, 1024]
}
export const sampleBars = [
  {
    time: 1621123200000,
    open: 11.401092213679004,
    high: 14.995080373961207,
    low: 10.012807456345774,
    close: 10.176683975620463,
    volume: 1210
  },
  {
    time: 1621209600000,
    open: 11.146026013215472,
    high: 14.998159951905166,
    low: 10.050266174050345,
    close: 10.49146609655811,
    volume: 1744
  },
  {
    time: 1621296000000,
    open: 10.012423098040488,
    high: 14.975964168949814,
    low: 10.012423098040488,
    close: 11.128767610079938,
    volume: 1024
  }
]
export const defaultSearchResult = [
  {
    symbol: 'ACI',
    full_name: 'ACI',
    description: 'Arch Coal Inc.',
    exchange: 'NYSE',
    type: 'stock'
  },
  {
    symbol: 'ACN',
    full_name: 'ACN',
    description: 'Accenture plc',
    exchange: 'NYSE',
    type: 'stock'
  }
]
export const sampleMarketData = [
  {
    time: 1620172800000,
    open: 53205.05,
    high: 58069.82,
    low: 52900,
    close: 57436.11,
    volume: 77263.923439
  },
  {
    time: 1620259200000,
    open: 57436.11,
    high: 58360,
    low: 55200,
    close: 56393.68,
    volume: 70181.671908
  },
  {
    time: 1620345600000,
    open: 56393.68,
    high: 58650,
    low: 55241.63,
    close: 57314.75,
    volume: 74542.747829
  },
  {
    time: 1620432000000,
    open: 57315.49,
    high: 59500,
    low: 56900,
    close: 58862.05,
    volume: 69709.906028
  },
  {
    time: 1620518400000,
    open: 58866.53,
    high: 59300,
    low: 56235.66,

    close: 58240.84,
    volume: 69806.11991
  },
  {
    time: 1620604800000,
    open: 58240.83,
    high: 59500,
    low: 53400,

    close: 55816.14,
    volume: 89586.34925
  },
  {
    time: 1620691200000,
    open: 55816.14,
    high: 56862.43,
    low: 54370,
    close: 56670.02,
    volume: 64329.54055
  },
  {
    time: 1620777600000,
    open: 56670.02,
    high: 58000.01,
    low: 48600,
    close: 49631.32,
    volume: 99842.789836
  },
  {
    time: 1620864000000,
    open: 49537.15,
    high: 51367.19,
    low: 46000,
    close: 49670.97,
    volume: 147332.002121
  },
  {
    time: 1620950400000,
    open: 49671.92,
    high: 50958.32,
    low: 48799.75,
    close: 50184.86,
    volume: 46960.709235
  }
]

export const config = {
  exchanges: [{ value: 'BINANCE', name: 'Binance', desc: 'Binance Exchange' }],
  symbols_types: [{ value: 'crypto', name: 'Cryptocurrency' }],
  supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', 'D'],
  supports_search: true,
  supports_group_request: false,
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true
}
export const symbolData = {
  symbol: 'ETHBTC',
  ticker: 'ETHBTC',
  name: 'ETHBTC',
  full_name: 'ETHBTC',
  description: 'ETH / BTC',
  exchange: 'BINANCE',
  listed_exchange: 'BINANCE',
  type: 'crypto',
  currency_code: 'BTC',
  session: '24x7',
  timezone: 'Europe/Athens' as Timezone,
  minmovement: 1,
  minmov: 1,
  minmovement2: 0,
  minmov2: 0,
  format: 'price' as SeriesFormat,
  pricescale: 1000000,
  supported_resolutions: [
    '1',
    '3',
    '5',
    '15',
    '30',
    '60',
    '120',
    '240',
    '360',
    '480',
    '720',
    '1D',
    '3D',
    '1W',
    '1M'
  ] as ResolutionString[],
  has_intraday: true,
  has_daily: true,
  has_weekly_and_monthly: true,
  data_status: 'streaming' as LibrarySymbolInfo['data_status']
}
export const datafeed = {
  /* mandatory methods for realtime chart */
  onReady: (cb: Function) => {
    setTimeout(() => cb(config), 0)
  },
  searchSymbols: (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback
  ) => {
    // This is intentional
  },

  resolveSymbol: (
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback
  ) => {
    setTimeout(function () {
      onResolve(symbolData as any) // TODO: fix type
    }, 0)
  },
  getBars: function (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    rangeStartDate: number,
    rangeEndDate: number,
    onResult: HistoryCallback,
    onError: ErrorCallback,
    isFirstCall: boolean
  ) {
    onResult(sampleMarketData, { noData: false })
  },

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
