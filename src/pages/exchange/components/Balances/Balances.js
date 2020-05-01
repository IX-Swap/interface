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
  Typography
} from '@material-ui/core'

import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'
import useStyles from 'pages/exchange/styles'

export default function Balances ({ balances }) {
  const {
    handleChange,
    handleChangeIndex,
    theme,
    classes,
    value
  } = useBalancesLogic()

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
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <BalancesTab balances={balances} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Portfolio
        </TabPanel>
      </SwipeableViews>
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

  const handleChangeIndex = index => {
    setValue(index)
  }

  return { handleChange, handleChangeIndex, value, classes, theme }
}

function BalancesTab ({ balances }) {
  const classes = useStyles()
  const assets = Object.keys(balances)
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
              {assets.map((m, i) => (
                <TableRow key={i} className={classes.tableRow}>
                  <TableCell component='th' scope='row'>
                    {m}
                  </TableCell>
                  <TableCell align='right'>{balances[m]}</TableCell>
                  <TableCell align='right'>{balances[m]}</TableCell>
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
