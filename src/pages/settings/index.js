import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import SettingsLanding from './pages';
import ChangPassword from './pages/change-password';

const Settings = () => (
  <Container>
    <Switch>
      <Route path="/settings" exact component={SettingsLanding} />
      <Route path="/settings/change-password" exact component={ChangPassword} />
    </Switch>
  </Container>
);

export default Settings;
