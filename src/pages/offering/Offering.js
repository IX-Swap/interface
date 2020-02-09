import React, { useState } from 'react'
import {
  Grid
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import {
  ResponsiveContainer,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// styles
import useStyles from './styles'

// components
import mock from '../primary/mock-primary-data'
import Widget from '../../components/Widget'
import PageTitle from '../../components/PageTitle'
import { Typography } from '../../components/Wrappers'
import Dot from '../../components/Sidebar/components/Dot'
import TransactionsTable from './components/TransactionsTable'

const mainChartData = getMainChartData()
const PieChartData = [
  { name: 'Group A', value: 400, color: 'primary' },
  { name: 'Group B', value: 300, color: 'secondary' },
  { name: 'Group C', value: 300, color: 'warning' },
  { name: 'Group D', value: 200, color: 'success' }
]

// use mock data
const { overview, information, issuer, contract, investors, distributors  } = mock.primaryOfferings[0]

export default function Offering (props) {
  var classes = useStyles()
  var theme = useTheme()
  var offer = props.location.pathname.split('/')[3]

  return (
    <>
      <PageTitle title={offer} button='Invest' />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title='Summary'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size='xl' weight='medium'>
                {issuer.companyName}
              </Typography>
              <LineChart
                width={55}
                height={30}
                data={[
                  { value: 10 },
                  { value: 15 },
                  { value: 10 },
                  { value: 17 },
                  { value: 18 }
                ]}
                margin={{ left: theme.spacing(2) }}
              >
                <Line
                  type='natural'
                  dataKey='value'
                  stroke={theme.palette.success.main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
            >
              <Grid item>
                <Typography color='text' colorBrightness='secondary'>
                  Investors
                </Typography>
                <Typography size='md'>{investors.length}</Typography>
              </Grid>
              <Grid item>
                <Typography color='text' colorBrightness='secondary'>
                  Raised
                </Typography>
                <Typography size='md'>{information.percentRaised}</Typography>
              </Grid>
              <Grid item>
                <Typography color='text' colorBrightness='secondary'>
                  Target Raise
                </Typography>
                <Typography size='md'>{information.target}</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title='Introduction'
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <Typography color='text' colorBrightness='secondary'>
               {information.description}
            </Typography>
          </Widget>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <Widget title='Cap Table' upperTitle className={classes.card}>
            <Grid container spacing={0}>
              <Grid item lg={5} xs={4}>
                <ResponsiveContainer width='100%' height={144}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie
                      data={PieChartData}
                      innerRadius={40}
                      outerRadius={50}
                      dataKey='value'
                    >
                      {PieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item lg={6} xs={4}>
                <div className={classes.pieChartLegendWrapper}>
                  {PieChartData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography style={{ whiteSpace: 'nowrap' }}>
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color='text' colorBrightness='secondary'>
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
       
        {/* {mock.bigStat.map(stat => (
          <Grid item md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))} */}
        <Grid item xs={12}>
          <Widget
            title={`${overview.serialNumber} Transfers`}
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <TransactionsTable data={contract.transactions} />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}

// #######################################################################
function getRandomData (length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill()
  let lastValue

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1)

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1)
    }

    lastValue = randomValue

    return { value: randomValue }
  })
}

function getMainChartData () {
  var resultArray = []
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000)
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500)
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500)

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value
    })
  }

  return resultArray
}
