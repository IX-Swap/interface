import { subDays } from 'date-fns'
import { prepareChartData } from 'helpers/prepareChartData'
import { removeHours } from 'helpers/getWeekDays'

export const commitmentChartData = [
  [
    { type: 'date', label: 'date' },
    { type: 'number', label: 'commitments' }
  ],
  [new Date('2021-01-03T16:00:00.000Z'), 100],
  [new Date('2021-01-02T16:00:00.000Z'), 125],
  [new Date('2021-01-01T16:00:00.000Z'), 150],
  [new Date('2020-12-31T16:00:00.000Z'), 175],
  [new Date('2020-12-30T16:00:00.000Z'), 200],
  [new Date('2020-12-29T16:00:00.000Z'), 225],
  [new Date('2020-12-28T16:00:00.000Z'), 250]
]

export const commitmentChartOption = {
  chartType: 'ColumnChart',
  data: [
    [
      {
        label: 'date',
        type: 'date'
      },
      {
        label: 'commitments',
        type: 'number'
      }
    ],
    [new Date('2021-01-03T16:00:00.000Z'), 100],
    [new Date('2021-01-02T16:00:00.000Z'), 125],
    [new Date('2021-01-01T16:00:00.000Z'), 150],
    [new Date('2020-12-31T16:00:00.000Z'), 175],
    [new Date('2020-12-30T16:00:00.000Z'), 200],
    [new Date('2020-12-29T16:00:00.000Z'), 225],
    [new Date('2020-12-28T16:00:00.000Z'), 250]
  ],
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
      ticks: [
        new Date('2020-12-28T16:00:00.000Z'),
        new Date('2020-12-29T16:00:00.000Z'),
        new Date('2020-12-30T16:00:00.000Z'),
        new Date('2020-12-31T16:00:00.000Z'),
        new Date('2021-01-01T16:00:00.000Z'),
        new Date('2021-01-02T16:00:00.000Z'),
        new Date('2021-01-03T16:00:00.000Z')
      ]
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
  [new Date(subDays(Date.now(), 6)), 25],
  [new Date(subDays(Date.now(), 5)), 25],
  [new Date(subDays(Date.now(), 4)), 25],
  [new Date(subDays(Date.now(), 3)), 25],
  [new Date(subDays(Date.now(), 2)), 25],
  [new Date(subDays(Date.now(), 1)), 25],
  [new Date(Date.now()), 25]
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
      ticks: [
        new Date(removeHours(subDays(Date.now(), 6))),
        new Date(removeHours(subDays(Date.now(), 5))),
        new Date(removeHours(subDays(Date.now(), 4))),
        new Date(removeHours(subDays(Date.now(), 3))),
        new Date(removeHours(subDays(Date.now(), 2))),
        new Date(removeHours(subDays(Date.now(), 1))),
        new Date(removeHours(subDays(Date.now(), 0)))
      ]
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
  [new Date('2021-01-03T16:00:00.000Z'), 100],
  [new Date('2021-01-02T16:00:00.000Z'), 125],
  [new Date('2021-01-01T16:00:00.000Z'), 150],
  [new Date('2020-12-31T16:00:00.000Z'), 175],
  [new Date('2020-12-30T16:00:00.000Z'), 200],
  [new Date('2020-12-29T16:00:00.000Z'), 225],
  [new Date('2020-12-28T16:00:00.000Z'), 250]
]

export const investmentGrowthChartOptions = {
  chartType: 'LineChart',
  data: prepareChartData(investmentGrowthChartData),
  options: {
    chart: {
      title: 'Investment Growth Chart'
    },
    hAxis: {
      format: 'E',
      ticks: [
        new Date('2021-01-03T16:00:00.000Z'),
        new Date('2021-01-02T16:00:00.000Z'),
        new Date('2021-01-01T16:00:00.000Z'),
        new Date('2020-12-31T16:00:00.000Z'),
        new Date('2020-12-30T16:00:00.000Z'),
        new Date('2020-12-29T16:00:00.000Z'),
        new Date('2020-12-28T16:00:00.000Z')
      ],
      baselineColor: 'transparent'
    },
    vAxis: {
      baselineColor: 'transparent',
      gridlines: {
        count: 5
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
