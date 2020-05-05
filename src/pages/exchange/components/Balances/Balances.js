import React from 'react'
import {
  Grid,
  Paper,
  Box,
  TableCell,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  AppBar,
  Tabs,
  Tab,
  Typography,
  CircularProgress
} from '@material-ui/core'

import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import useStyles from 'pages/exchange/styles'
import NumberFormat from 'react-number-format'

export default function Balances ({ state }) {
  const { handleChange, theme, classes, value } = useBalancesLogic()

  return (
    <Paper className={classes.paper} elevation={0}>
      <AppBar position='static' color='default' elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='BALANCES' {...a11yProps(0)} />
          <Tab label='REPORT' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <BalancesTab state={state} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Portfolio
      </TabPanel>
    </Paper>
  )
}

function useBalancesLogic () {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return { handleChange, value, classes, theme }
}

function BalancesTab ({ state }) {
  const classes = useStyles()
  const { tabsTemplate } = useTabsTemplate(state)
  return (
    <Grid item>
      <Box>
        <TableContainer>
          <Table size='small' aria-label='list of the markets'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>SYMBOL</b>
                </TableCell>
                <TableCell align='right'>
                  <b>BALANCE</b>
                </TableCell>
                <TableCell align='right'>
                  <b>VALUE</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tabsTemplate ? tabsTemplate : <CircularProgress />}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  )

  function useTabsTemplate (state) {
    const tabsTemplate = []
    const keys = Object.keys(state.accounts)

    keys.forEach((a, i) => {
      let pair = a + ':SGD'
      let balance = state.accounts[a].balance
      let value = state.markets[pair]
        ? state.markets[pair].market.price * balance
        : state.accounts[a].balance
      tabsTemplate.push(
        <TableRow key={i} className={classes.tableRow}>
          <TableCell component='th' scope='row'>
            {a}
          </TableCell>
          <TableCell align='right'>
            <NumberFormat
              value={balance}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align='right'>
            <NumberFormat
              value={value}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </TableCell>
        </TableRow>
      )
    })
    return { tabsTemplate }
  }
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}
