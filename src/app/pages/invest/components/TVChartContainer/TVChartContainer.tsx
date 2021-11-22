import * as React from 'react'
import {
  widget as Widget,
  ResolutionString,
  IChartingLibraryWidget
} from 'types/charting_library'
import { ChartContainerProps } from 'types/tvChart'
import {
  disabledFeatures,
  enabledFeatures,
  overrides,
  sampleTVChartProps
} from './constants'
import { getMovingAverageParams } from './utils'

export interface TVChartContainerProps extends Partial<ChartContainerProps> {
  viewport?: 'small' | 'big'
}

export const TVChartContainer = (props: TVChartContainerProps) => {
  const {
    symbol,
    datafeed,
    interval,
    fullscreen,
    width,
    height,
    theme,
    containerId,
    toolbarBg,
    customCssUrl,
    viewport
  } = props
  const [tvWidget, setTradingChart] = React.useState<IChartingLibraryWidget>()

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
      library_path: `${process.env.PUBLIC_URL}/charting_library/`,
      favorites: {
        intervals: ['15', '60', '240', '1D', 'W'] as ResolutionString[],
        chartTypes: ['Line', 'Candles']
      },
      locale: 'en',
      disabled_features: disabledFeatures,
      enabled_features:
        viewport === 'big' ? enabledFeatures : ['hide_left_toolbar_by_default'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      fullscreen: fullscreen ?? sampleTVChartProps.fullscreen,
      autosize: false,
      height: height ?? sampleTVChartProps.height,
      width: width ?? sampleTVChartProps.width,
      theme: theme ?? sampleTVChartProps.theme,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone as any,
      toolbar_bg: toolbarBg,
      custom_css_url: customCssUrl,
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
    props.dataFeedUrl,
    toolbarBg,
    customCssUrl,
    viewport
  ])

  React.useEffect(() => {
    if (tvWidget !== null && tvWidget !== undefined) {
      tvWidget.onChartReady(() => {
        const activeChart = tvWidget.activeChart()
        void activeChart
          // @ts-expect-error
          .createStudy(...getMovingAverageParams(12, '#FF0000'))
        void activeChart
          // @ts-expect-error
          .createStudy(...getMovingAverageParams(20, '#00FF00'))
        void activeChart
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
