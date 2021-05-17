import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget
} from 'types/charting_library'

export interface ChartContainerProps {
  symbol?: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  width?: ChartingLibraryWidgetOptions['width']
  height?: ChartingLibraryWidgetOptions['height']
  datafeed?: ChartingLibraryWidgetOptions['datafeed']
  fullscreen?: ChartingLibraryWidgetOptions['fullscreen']
  containerId: ChartingLibraryWidgetOptions['container_id']
  theme?: ChartingLibraryWidgetOptions['theme']
  tvWidget: IChartingLibraryWidget | null
  setTradingChart: (tvWidget: IChartingLibraryWidget) => void
  dataFeedUrl?: string
}
