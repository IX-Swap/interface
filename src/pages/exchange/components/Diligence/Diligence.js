import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import useStyles from 'pages/exchange/styles'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'

import { AppBar, Tabs, Tab, Typography, Box, Paper, Grid } from '@material-ui/core'

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

export default function Diligence ({ state, market }) {
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
          <Tab label='OVERVIEW' {...a11yProps(0)} />
          <Tab label='TEAM' {...a11yProps(1)} />
          <Tab label='DATA ROOM' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Overview overview={state.markets[market].diligence.overview} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Team team={state.markets[market].diligence.team} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Dataroom dataRoom={state.markets[market].diligence.dataRoom} />
      </TabPanel>
      {/* </SwipeableViews> */}
    </Paper>
  )
}

function Overview ({ overview }) {
  return <Box>{overview.description}</Box>
}

function Team ({ team }) {
  const classes = useStyles()

  const template = team.map((person, i) => (
    <Grid key={i} item md={5}>
      <Paper className={classes.paper} elevation={0}>
        <Box p={1}>
          <Grid
            container
            justify='center'
            alignItems='center'
            alignContent='center'
          >
            <Grid item md={12}>
              <center>
                <img
                  alt=' is good for now'
                  className={classes.roundImage}
                  height={100}
                  src={person.photo}
                />
              </center>
            </Grid>
            <Grid item md={12}>
              <center>
                <b>Name:</b> {person.name}
              </center>
            </Grid>
            <Grid item md={12}>
              <center>
                <b>Position:</b> {person.job}
              </center>
            </Grid>
            <Grid item md={12}>
              <center>
                <b>Email:</b> {person.email}
              </center>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  ))

  return (
    <Grid container justify='center' spacing={1}>
      {template}
    </Grid>
  )
}

function Dataroom ({ dataRoom }) {
  const template = dataRoom.map((file, i) => (
    <Grid key={i} item md={3}>
      <center>
        <InsertDriveFileIcon />
        <p>{file.fileName}</p>
      </center>
    </Grid>
  ))
  return <Grid container>{template}</Grid>
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
