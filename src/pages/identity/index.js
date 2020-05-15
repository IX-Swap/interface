import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import IndividualIdentity from './pages/individual';
import CorporateIdentity from './pages/corporate';
import CreateIdentity from './pages/create';

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em',
  },
}));

const Identity = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h2" className={classes.pageTitle}>
        Identity
      </Typography>
      <Switch>
        <Route
          path="/identity/individual"
          exact
          component={IndividualIdentity}
        />
        <Route path="/identity/corporate" exact component={CorporateIdentity} />
        <Route path="/identity/create" exact component={CreateIdentity} />

        <Redirect to="/identity" />
      </Switch>
    </Container>
  );
};

export default Identity;
