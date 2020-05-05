import React from 'react'
import { Switch, withRouter, Route } from 'react-router-dom'
import {
  Grid,
  Paper,
  Box,
  Typography,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'
import useStyles from 'pages/exchange/styles'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import BankCreateComponent from './bank/BankCreateComponent'
import BankListComponent from './bank/BankListComponent'
import { AccountProvider } from 'context/AccountContext'
import { AssetsProvider } from 'context/AssetsContext'
import { IdentityProvider } from 'context/IdentityContext'

function Accounts (props) {
  return (
    <Grid container title='Accounts' justify='center' alignItems='center'>
      <Switch>
        <AssetsProvider>
          <AccountProvider>
            <IdentityProvider>
              <AccountRoutes />
            </IdentityProvider>
          </AccountProvider>
        </AssetsProvider>
      </Switch>
    </Grid>
  )
}

function AccountRoutes ({ props }) {
  return (
    <>
      <Route exact path='/accounts' component={() => <AccountsPanel />} />
      <Route
        exact
        path='/accounts/bank-create'
        component={BankCreateComponent}
      />
    </>
  )
}

function AccountsPanel ({ history, state, setMarket }) {
  const { handleChange, theme, classes, value } = useAccountsLogic()

  const location = history

  return (
    <Grid container justify='center'>
      <Grid item lg={9}>
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
              <Tab label='CASH' {...a11yProps(1)} />
              <Tab label='DIGITAL SECURITIES' {...a11yProps(2)} />
              <Tab label='REPORT' {...a11yProps(3)} />
              <Tab label='TRANSACTIONS' {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            SOME KIND OF OVERVIEW
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <BankListComponent />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            WALLETS
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            REPORTS
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            TRANSACTIONS
          </TabPanel>
        </Paper>
      </Grid>
    </Grid>
  )
}

function useAccountsLogic () {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // const handleChangeIndex = index => {
  //   setValue(index)
  // }

  return { handleChange, value, classes, theme }
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

export default withRouter(Accounts)
