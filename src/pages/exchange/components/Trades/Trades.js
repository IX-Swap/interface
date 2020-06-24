import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import moment from 'moment'

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody
} from '@material-ui/core'

import useStyles from 'pages/exchange/styles'
import NumberFormat from 'react-number-format'

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

export default function Trades ({ trades }) {
  const { handleChange, theme, classes, value } = useTradesLogic()

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
          <Tab label='MARKET TRADES' {...a11yProps(0)} />
          <Tab label='YOUR TRADES' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <TradesTable trades={trades.market} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <TradesTable trades={trades.yours} />
      </TabPanel>
    </Paper>
  )
}

function TradesTable ({ trades }) {
  const classes = useStyles()
  return (
    <TableContainer>
      <Table size='small' aria-label='list of the markets'>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>TIME</b>
            </TableCell>
            <TableCell align='right'>
              <b>PRICE</b>
            </TableCell>
            <TableCell align='right'>
              <b>AMOUNT</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((t, i) => (
            <TableRow key={i} className={classes.tableRow}>
              <TableCell component='th' scope='row'>
                {moment(t.time).format('l:LTS')}
              </TableCell>
              <TableCell align='right'>{t.price}</TableCell>
              <TableCell align='right'>
                <NumberFormat
                  value={t.amount}
                  displayType='text'
                  thousandSeparator
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function useTradesLogic () {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return { handleChange, value, classes, theme }
}
