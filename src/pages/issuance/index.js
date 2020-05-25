import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Issuance = () => <p>Issuance</p>;

export default function IssuancePage() {
  return (
    <Switch>
      <Route path="/issuance" exact component={Issuance} />
    </Switch>
  );
}
