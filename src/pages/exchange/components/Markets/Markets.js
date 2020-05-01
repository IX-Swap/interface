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
  Typography,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'
import useStyles from 'pages/exchange/styles'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'

export default function Markets ({ state, setMarket }) {
  const {
    handleChange,
    handleChangeIndex,
    theme,
    classes,
    value
  } = useMarketsLogic()

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
          <Tab label='EQUITY MARKETS' {...a11yProps(0)} />
          <Tab label='DEBT MARKETS' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Equity state={state} setMarket={setMarket} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          DEBT MARKETS HERE
        </TabPanel>
      </SwipeableViews>
    </Paper>
  )
}

function useMarketsLogic () {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  return { handleChange, handleChangeIndex, value, classes, theme }
}

function Equity ({ state, setMarket }) {
  const classes = useStyles()
  return (
    <Grid item>
      <Box>
        <TableContainer>
          <Table size='small' aria-label='list of the markets'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>MARKET</b>
                </TableCell>
                <TableCell align='right'>
                  <b>24 HOURS</b>
                </TableCell>
                <TableCell align='right'>
                  <b>PRICE</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.markets.map((m, i) => (
                <TableRow
                  key={i}
                  onClick={() => setMarket(m)}
                  className={classes.tableRow}
                >
                  <TableCell component='th' scope='row'>
                    {m}
                  </TableCell>
                  <TableCell align='right'>{state[m].market.change}%</TableCell>
                  <TableCell align='right'>${state[m].market.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  )
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
