import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { IdentityProvider } from './modules';
import IndentityLanding from './pages/landing';
import IndividualIdentity from './pages/individual';
import CorporateIdentity from './pages/corporate';

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em',
  },
}));

const Identity = () => {
  const classes = useStyles();

  return (
    <IdentityProvider>
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
          <Route
            path="/identity/corporate"
            exact
            component={CorporateIdentity}
          />
          <Route path="/identity" exact component={IndentityLanding} />

          <Redirect to="/identity" />
        </Switch>
      </Container>
    </IdentityProvider>
  );
};

export default Identity;
