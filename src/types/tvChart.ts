import { ChartingLibraryWidgetOptions } from 'types/charting_library'

export interface ChartContainerProps {
  symbol?: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  width?: ChartingLibraryWidgetOptions['width']
  height?: ChartingLibraryWidgetOptions['height']
  datafeed: ChartingLibraryWidgetOptions['datafeed']
  libraryPath: ChartingLibraryWidgetOptions['library_path']
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  chartsStorageApiVersion?: ChartingLibraryWidgetOptions['charts_storage_api_version']
  clientId: ChartingLibraryWidgetOptions['client_id']
  userId: ChartingLibraryWidgetOptions['user_id']
  fullscreen: ChartingLibraryWidgetOptions['fullscreen']
  autosize: ChartingLibraryWidgetOptions['autosize']
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides']
  containerId: ChartingLibraryWidgetOptions['container_id']
  timezone?: ChartingLibraryWidgetOptions['container_id'] | string
  theme?: ChartingLibraryWidgetOptions['theme']
}
