import { ResolutionString } from 'charting_library'

import { ChartContainerProps } from 'types/tvChart'

export const disabledFeatures = [
  // 'use_localstorage_for_settings',
  'header_symbol_search',
  'symbol_search_hot_key',
  'remove_library_container_border'
]

export const enabledFeatures = ['study_templates', 'chart_crosshair_menu']

export const overrides = {
  'mainSeriesProperties.style': 2,
  'mainSeriesProperties.lineStyle.color': '#56AA82'
}

export const sampleTVChartProps: ChartContainerProps = {
  symbol: 'AAPL',
  interval: 'D' as ResolutionString,
  containerId: 'tv_chart_container',

  dataFeedUrl: 'https://demo_feed.tradingview.com',
  fullscreen: false,
  height: 600,
  width: '100%' as any,
  theme: 'Light'
}

export const SYMBOL_SEARCH_LIMIT = 30
// Chart data will update every 20 seconds
export const UPDATE_FREQUENCY = 20000
