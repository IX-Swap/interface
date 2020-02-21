import React from 'react'
import {
  Grid
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import {
  ResponsiveContainer,
  // AreaChart,
  LineChart,
  Line,
  // Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import * as Icons from '@material-ui/icons'

// styles
import useStyles from './styles'

// components
import mock from '../primary/mock-primary-data'
import Widget from '../../components/Widget'
import PageTitle from '../../components/PageTitle'
import { Typography } from '../../components/Wrappers'
import Dot from '../../components/Sidebar/components/Dot'
import TransactionsTable from './components/TransactionsTable'

// const mainChartData = getMainChartData()
const PieChartData = [
  { name: 'Seaside Capital Fund', value: 50000000, color: 'primary' },
  { name: 'Cho Family', value: 10000000, color: 'secondary' },
  { name: 'Telstra Group', value: 20000000, color: 'warning' },
  { name: 'Lighthouse Captial', value: 10000000, color: 'success' }
]

// use mock data
const { overview, information, issuer, contract, investors, distributors  } = mock.dsoList[0]

export default function Offering (props) {
  var classes = useStyles()
  var theme = useTheme()
  var offer = props.location.pathname.split('/')[3]

  return (
    <>
      <PageTitle title={`${offer}`} />
      <Grid container spacing={4}>
        <Grid item lg={3} md={5} sm={6} xs={12}>
          <Widget
            title='Summary'
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size='xl' weight='medium'>
                EXAMPLE PTE LTD
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
        <Grid item lg={3} md={7} sm={6} xs={12}>
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
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Widget title='Cap Table' upperTitle className={classes.card}>
            <Grid container spacing={0}>
              <Grid item lg={3} md={3} xs={6}>
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
              <Grid item lg={6} md={7} xs={12}>
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
        <Grid item xs={6}>
          <Widget
            title={`${overview.serialNumber} Data Room`}
            upperTitle
            bodyClass={classes.tableWidget}
          >
            <div className={classes.visitsNumberContainer}>

              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <Icons.AccessAlarms />
                <Typography className={classes.materialIconText}>
                document-file-name.pdf
                </Typography>
              </Grid>
            </div>
            <div className={classes.visitsNumberContainer}>
              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <Icons.AccessAlarms />
                <Typography className={classes.materialIconText}>
                document-file-name.pdf
                </Typography>
              </Grid>
              </div>
              <div className={classes.visitsNumberContainer}>

              <Grid
                className={classes.materailIcon}
                item
                md={3}
                lg={2}
                sm={4}
                xs={12}
              >
                <Icons.AccessAlarms />
                <Typography className={classes.materialIconText}>
                document-file-name.pdf
                </Typography>
              </Grid>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={6}>
          <Widget
            title={`${overview.serialNumber} Information`}
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >

            <ul>
              <li>Band Protocol offers a unique approach to decentralized data oracle by making data readily available to be queried on-chain using delegated proof of stake to ensure data integrity. This offers many benefits
                </li>
              <li>Decentralized economic incentive:data providers have economic and reputation at stake to remain honest actors.</li>
              <li>
              Cheap:over 50% cheaper than current decentralized alternative with much less gas consumed. Band’s smart contracts are optimized for gas usage and require less than 30000 gas to process a query call.

              </li>
              <li>
              Scalable:costs for data providers remain constant regardless of how many dApps are using the data. Once a datapoint is put on-chain multiple smart contracts can consume the data without added cost to data providers.

              </li>
              <li>
              Fast instant query:logic can be processed within one transaction requiring 0 blockchain confirmation. Data is readily available on blockchain so consuming data can be done synchronously within the same transaction.
              </li>
              <li>
              Easy deployment:dApps can integrate with Band Protocol using a few lines of code with no major modification. Querying data on Band dataset is merely a function call on a predefined interface.

              </li>
              <li>
              Working products & traction:strong developer communities with live testnet and many developers have already started the integration on testnet.

              </li>
            </ul>
          </Widget>
        </Grid>
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
