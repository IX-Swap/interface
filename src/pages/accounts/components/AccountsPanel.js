// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
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

const Overview = React.lazy(() => import('../overview/Overview'));

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
    '/accounts',
    '/accounts/banks',
    '/accounts/wallets',
    '/accounts/reports',
    '/accounts/transactions',
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
              <Tab
                component={Link}
                to={routes[0]}
                value={routes[0]}
                label="OVERVIEW"
                {...a11yProps(0)}
              />
              <Tab
                component={Link}
                to={routes[1]}
                value={routes[1]}
                label="CASH"
                {...a11yProps(1)}
              />
              <Tab
                component={Link}
                to={routes[2]}
                value={routes[2]}
                label="DIGITAL SECURITIES"
                {...a11yProps(2)}
              />
              <Tab
                component={Link}
                to={routes[3]}
                value={routes[3]}
                label="REPORT"
                {...a11yProps(3)}
              />
              <Tab
                component={Link}
                to={routes[4]}
                value={routes[4]}
                label="TRANSACTIONS"
                {...a11yProps(4)}
              />
            </Tabs>
          </AppBar>
          <Switch>
            <Suspense fallback={<span>loading</span>}>
              <Route exact path={routes[0]} render={() => <Overview />} />
              <Route path={routes[1]} render={() => <BankComponent />} />
              <Route path={routes[2]} render={() => <span>WALLETS</span>} />
              <Route path={routes[3]} render={() => <span>REPORTS</span>} />
              <Route
                path={routes[4]}
                render={() => <span>TRANSACTIONS</span>}
              />
            </Suspense>
          </Switch>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withRouter(AccountsPanel);
