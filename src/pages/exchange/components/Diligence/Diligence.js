import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import useStyles from 'pages/exchange/styles'

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

export default function Trades () {
  const {
    handleChange,
    handleChangeIndex,
    theme,
    classes,
    value
  } = useTradesLogic()

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
          <Tab label='OVERVIEW' {...a11yProps(0)} />
          <Tab label='CAPITAL STRUCTURE' {...a11yProps(1)} />
          <Tab label='TEAM' {...a11yProps(2)} />
          <Tab label='DATA ROOM' {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          OVERVIEW HERE
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          CAPITAL STRUCUTRE HERE
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          TEAM HERE
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          DATA ROOM HERE
        </TabPanel>
      </SwipeableViews>
    </Paper>
  )
}

function useTradesLogic () {
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
