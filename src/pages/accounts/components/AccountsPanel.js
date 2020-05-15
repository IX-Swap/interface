// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'pages/exchange/styles';
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

import BankListComponent from '../bank/BankListComponent';
import Overview from '../overview/Overview';

function useAccountsLogic() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return { handleChange, value, classes, theme };
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

export default function AccountsPanel() {
  const { handleChange, theme, classes, value } = useAccountsLogic();

  return (
    <Grid container justify="center">
      <Grid item lg={9}>
        <Paper className={classes.paper} elevation={0}>
          <AppBar position="static" color="default" elevation={1}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="OVERVIEW" {...a11yProps(0)} />
              <Tab label="CASH" {...a11yProps(1)} />
              <Tab label="DIGITAL SECURITIES" {...a11yProps(2)} />
              <Tab label="REPORT" {...a11yProps(3)} />
              <Tab label="TRANSACTIONS" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Overview />
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
  );
}
