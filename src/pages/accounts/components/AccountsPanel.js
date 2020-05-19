// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'pages/exchange/styles';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';

import BankComponent from '../bank';
import Overview from '../overview/Overview';

function useAccountsLogic() {
  const classes = useStyles();
  const theme = useTheme();

  return { classes, theme };
}

type TabProps = {
  id: string,
  'aria-controls': string,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index): TabProps {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function AccountsPanel({ location }: any) {
  const { classes } = useAccountsLogic();
  const routes = [
    {
      route: '/accounts',
      label: 'OVERVIEW',
      component: <Overview />,
    },
    {
      route: '/accounts/banks',
      label: 'CASH',
      component: <BankComponent />,
    },
    {
      route: '/accounts/wallets',
      label: 'DIGITAL SECURITIES',
      component: <span>WALLETS</span>,
    },
    {
      route: '/accounts/reports',
      label: 'REPORT',
      component: <span>REPORTS</span>,
    },
    {
      route: '/accounts/transactions',
      label: 'TRANSACTIONS',
      component: <span>TRANSACTIONS</span>,
    },
  ];

  let { pathname } = location;
  const matched = (path: string): boolean => routes.some((p) => p === path);

  // TODO: remove this hack, use proper routing
  while (!matched(pathname) && pathname !== '/') {
    pathname = pathname.split('/').filter(Boolean);
    pathname.pop();
    pathname = `/${pathname.join('/')}`;
  }

  return (
    <Grid container justify="center">
      <Grid item lg={9}>
        <Paper className={classes.paper} elevation={0}>
          <AppBar position="static" color="default" elevation={1}>
            <Tabs
              value={pathname}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {routes.map((route, index) => 
                <Tab
                  component={Link}
                  to={route.route}
                  value={route.route}
                  label={route.label}
                  {...a11yProps(index)}
                />
              )}
            </Tabs>
          </AppBar>
          <Switch>
            {routes.map((route, index) => 
              <Route exact={index === 0} path={route.route} render={() => route.component} />
            )}
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withRouter(AccountsPanel);
