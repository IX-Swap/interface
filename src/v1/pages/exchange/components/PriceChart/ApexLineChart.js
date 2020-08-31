import React from 'react'
import ApexCharts from 'react-apexcharts'
import { useTheme } from '@material-ui/styles'

export default function ApexLineChart ({ series }) {
  var theme = useTheme()

  return (
    <ApexCharts
      options={themeOptions(theme, series[0].dates)}
      series={series}
      height={200}
    />
  )
}

// ############################################################
function themeOptions (theme, dates) {
  return {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: dates
    },
    yaxis: {
      position: 'right',
      orient: 'right'
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    fill: {
      colors: [theme.palette.primary.light, theme.palette.success.light]
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
    // chart: {
    //   toolbar: {
    //     show: false
    //   }
    // },
    legend: {
      show: false
    }
  }
}
