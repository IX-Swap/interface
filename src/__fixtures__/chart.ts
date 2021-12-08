import { subDays } from 'date-fns'
import { prepareChartData } from 'helpers/prepareChartData'
import { removeHours } from 'helpers/getWeekDays'

const data = [
  [new Date(Date.now()), 100],
  [new Date(subDays(Date.now(), 1)), 125],
  [new Date(subDays(Date.now(), 2)), 150],
  [new Date(subDays(Date.now(), 3)), 175],
  [new Date(subDays(Date.now(), 4)), 200],
  [new Date(subDays(Date.now(), 5)), 255],
  [new Date(subDays(Date.now(), 6)), 250]
]

const noData = [
  [new Date(subDays(Date.now(), 6)), 25],
  [new Date(subDays(Date.now(), 5)), 25],
  [new Date(subDays(Date.now(), 4)), 25],
  [new Date(subDays(Date.now(), 3)), 25],
  [new Date(subDays(Date.now(), 2)), 25],
  [new Date(subDays(Date.now(), 1)), 25],
  [new Date(Date.now()), 25]
]

const commitmentTicks = [
  new Date(removeHours(subDays(Date.now(), 6))),
  new Date(removeHours(subDays(Date.now(), 5))),
  new Date(removeHours(subDays(Date.now(), 4))),
  new Date(removeHours(subDays(Date.now(), 3))),
  new Date(removeHours(subDays(Date.now(), 2))),
  new Date(removeHours(subDays(Date.now(), 1))),
  new Date(removeHours(subDays(Date.now(), 0)))
]

const investmentTicks = [
  new Date(removeHours(subDays(Date.now(), 0))),
  new Date(removeHours(subDays(Date.now(), 1))),
  new Date(removeHours(subDays(Date.now(), 2))),
  new Date(removeHours(subDays(Date.now(), 3))),
  new Date(removeHours(subDays(Date.now(), 4))),
  new Date(removeHours(subDays(Date.now(), 5))),
  new Date(removeHours(subDays(Date.now(), 6)))
]

export const commitmentChartData = [
  [
    { type: 'date', label: 'date' },
    { type: 'number', label: 'commitments' }
  ],
  ...data
]

export const commitmentChartOption = {
  chartType: 'ColumnChart',
  data: prepareChartData(commitmentChartData),
  height: 250,
  options: {
    backgroundColor: 'transparent',
    chartArea: {
      height: '80%',
      width: '100%'
    },
    colors: ['#0c469c'],
    enableInteractivity: true,
    hAxis: {
      baselineColor: 'transparent',
      format: 'E',
      gridlines: {
        color: 'rgba(0, 0, 0, 0.54)'
      },
      ticks: commitmentTicks,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    legend: {
      position: 'none'
    },
    vAxis: {
      baselineColor: 'rgba(0, 0, 0, 0.54)',
      gridlines: {
        color: 'rgba(0, 0, 0, 0.54)',
        count: 3
      },
      textPosition: 'none',
      ticks: undefined
    }
  }
}

export const commitmentNoData = [
  [
    { type: 'date', label: 'Date' },
    { type: 'number', label: 'Count' }
  ],
  ...noData
]

export const commitmentChartNoDataOption = {
  chartType: 'ColumnChart',
  data: prepareChartData(commitmentNoData),
  height: 250,
  options: {
    backgroundColor: 'transparent',
    chartArea: {
      height: '80%',
      width: '100%'
    },
    colors: ['#0c469c'],
    enableInteractivity: false,
    hAxis: {
      baselineColor: 'transparent',
      format: 'E',
      gridlines: {
        color: 'transparent'
      },
      ticks: commitmentTicks,
      textStyle: {
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    legend: {
      position: 'none'
    },
    vAxis: {
      baselineColor: 'transparent',
      gridlines: {
        color: 'transparent',
        count: 3
      },
      textPosition: 'none',
      ticks: [1, 1000]
    }
  }
}

export const investmentGrowthChartData = [
  [
    { type: 'date', label: 'date' },
    { type: 'number', label: 'investment' }
  ],
  ...data
]

export const investmentGrowthChartOptions = {
  chartType: 'LineChart',
  data: prepareChartData(investmentGrowthChartData),
  options: {
    backgroundColor: 'transparent',
    chart: {
      title: 'Investment Growth Chart'
    },
    hAxis: {
      format: 'E',
      ticks: investmentTicks,
      baselineColor: 'transparent',
      textStyle: {
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    vAxis: {
      baselineColor: 'transparent',
      gridlines: {
        count: 5
      },
      textStyle: {
        color: 'rgba(0, 0, 0, 0.87)'
      }
    },
    colors: ['#0c469c'],
    height: 220,
    chartArea: {
      width: '85%',
      height: '80%',
      left: '20px'
    },
    legend: 'none'
  }
}

export const investmentChartNoDataText =
  'There is no investment at the moment. Once you receive investments in your deal you will be able to see all the charts.'

export const baseAccountsUnderCustodyChartOptions = {
  chartType: 'PieChart',
  height: '100%',
  width: '100%',
  options: {
    pieHole: 0.35,
    colors: ['#109619', '#3266CC'],
    backgroundColor: 'transparent',
    legend: {
      position: 'right',
      textStyle: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.87)',
        fontName: 'Poppins'
      }
    },
    enableInteractivity: false,
    chartArea: {
      width: '100%',
      height: '80%',
      left: 0,
      right: 0,
      bottom: 0,
      top: '10%'
    },
    pieSliceText: 'value + %'
  }
}
