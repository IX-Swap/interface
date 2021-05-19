import * as React from 'react'
import { widget as Widget } from 'types/charting_library'
import { ResolutionString } from 'types/charting_library/datafeed-api'
import { ChartContainerProps } from 'types/tvChart'
import {
  disabledFeatures,
  enabledFeatures,
  overrides,
  sampleTVChartProps
} from './constants'
import { getLanguageFromURL, getMovingAverageParams } from './utils'

export const TVChartContainer: React.FC<
  Partial<ChartContainerProps>
> = props => {
  const {
    setTradingChart = sampleTVChartProps.setTradingChart,
    tvWidget,
    symbol,
    datafeed,
    interval,
    fullscreen,
    width,
    height,
    theme,
    containerId
  } = props

  const createChart = React.useCallback(() => {
    const chart = new Widget({
      symbol: symbol ?? (sampleTVChartProps.symbol as string),
      datafeed:
        datafeed ??
        new (window as any).Datafeeds.UDFCompatibleDatafeed(
          props.dataFeedUrl ?? sampleTVChartProps.dataFeedUrl
        ),
      interval: interval ?? sampleTVChartProps.interval,
      container_id: containerId ?? sampleTVChartProps.containerId,
      library_path: '/charting_library/',
      favorites: {
        intervals: ['15', '60', '240', 'D', 'W'] as ResolutionString[],
        chartTypes: ['Line', 'Candles']
      },
      locale: getLanguageFromURL() ?? 'en',
      disabled_features: disabledFeatures,
      enabled_features: enabledFeatures,
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      fullscreen: fullscreen ?? sampleTVChartProps.fullscreen,
      autosize: false,
      height: height ?? sampleTVChartProps.height,
      width: width ?? sampleTVChartProps.width,
      theme: theme ?? sampleTVChartProps.theme,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      overrides
    })

    setTradingChart(chart)
  }, [
    setTradingChart,
    symbol,
    datafeed,
    interval,
    fullscreen,
    width,
    height,
    theme,
    containerId,
    props.dataFeedUrl
  ])

  React.useEffect(() => {
    if (tvWidget !== null && tvWidget !== undefined) {
      tvWidget.onChartReady(() => {
        void tvWidget
          .activeChart()
          // @ts-expect-error
          .createStudy(...getMovingAverageParams(12, '#FF0000'))
        void tvWidget
          .activeChart()
          // @ts-expect-error
          .createStudy(...getMovingAverageParams(20, '#00FF00'))
        void tvWidget
          .activeChart()
          // @ts-expect-error
          .createStudy(...getMovingAverageParams(26, '#0000FF'))
        void tvWidget.headerReady().then(function () {
          const button = tvWidget.createButton()
          button.setAttribute('title', 'Reset Chart')
          button.addEventListener('click', function () {
            tvWidget.activeChart().executeActionById('chartReset')
          })
          button.textContent = 'Reset Chart'
        })
      })
    }
  }, [tvWidget])

  React.useEffect(() => {
    createChart()
  }, [createChart])

  return (
    <div
      id={containerId ?? sampleTVChartProps.containerId}
      className={'TVChartContainer'}
    />
  )
}
