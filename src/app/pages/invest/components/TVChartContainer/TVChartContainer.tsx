import * as React from 'react'
import {
  widget as Widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  IBasicDataFeed,
  ResolutionString
} from 'types/charting_library'
import { ChartContainerProps } from 'types/tvChart'
import { getLanguageFromURL, getMovingAverageParams } from './utils'

export const sampleTVChartProps: ChartContainerProps = {
  symbol: 'AAPL',
  interval: 'D' as ResolutionString,
  containerId: 'tv_chart_container',
  libraryPath: '/charting_library/',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
    'https://demo_feed.tradingview.com'
  ),
  chartsStorageApiVersion: '1.1',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
  autosize: false,
  studiesOverrides: {},
  height: 600,
  width: '100%',
  theme: 'Light'
}

export class TVChartContainer extends React.PureComponent<
  Partial<ChartContainerProps>,
  {}
> {
  public static defaultProps: ChartContainerProps = sampleTVChartProps

  private tvWidget: IChartingLibraryWidget | null = null

  public componentDidMount(): void {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this.props.symbol as string,
      datafeed: this.props.datafeed as IBasicDataFeed,
      interval: this.props.interval as ChartingLibraryWidgetOptions['interval'],
      container_id: this.props
        .containerId as ChartingLibraryWidgetOptions['container_id'],
      library_path: this.props.libraryPath as string,

      locale: getLanguageFromURL() ?? 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      height: this.props.height,
      width: this.props.width,
      theme: this.props.theme,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      overrides: {
        'mainSeriesProperties.style': 2,
        'mainSeriesProperties.lineStyle.color': '#56AA82',
        'paneProperties.axisProperties.lockScale': false
      }
    }

    const tvWidget = new Widget(widgetOptions)
    this.tvWidget = tvWidget
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
    })
  }

  public componentWillUnmount(): void {
    if (this.tvWidget !== null) {
      this.tvWidget.remove()
      this.tvWidget = null
    }
  }

  public render(): JSX.Element {
    return <div id={this.props.containerId} className={'TVChartContainer'} />
  }
}
