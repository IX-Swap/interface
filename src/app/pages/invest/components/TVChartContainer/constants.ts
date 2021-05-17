import { ResolutionString } from 'types/charting_library/charting_library'
import { ChartContainerProps } from 'types/tvChart'

export const disabledFeatures = [
  'use_localstorage_for_settings',
  'header_symbol_search',
  'symbol_search_hot_key',
  //   'header_widget',

  //   'timeframes_toolbar',
  //   'legend_widget',
  'remove_library_container_border'
]

export const enabledFeatures = ['study_templates', 'chart_crosshair_menu']

export const overrides = {
  'mainSeriesProperties.style': 2,
  'mainSeriesProperties.lineStyle.color': '#56AA82',
  'paneProperties.axisProperties.lockScale': false
}

export const sampleTVChartProps: ChartContainerProps = {
  symbol: 'AAPL',
  interval: 'D' as ResolutionString,
  containerId: 'tv_chart_container',

  dataFeedUrl: 'https://demo_feed.tradingview.com',
  fullscreen: false,
  height: 600,
  width: '100%',
  theme: 'Light',
  tvWidget: null,
  setTradingChart: () => {}
}
