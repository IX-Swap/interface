import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { InvestProvider } from './modules';

const DsoBoard = React.lazy(() => import('pages/invest/pages/dso-board'));
const DsoView = React.lazy(() => import('pages/invest/pages/dso-view'));
const AddCommitment = React.lazy(() => import('pages/invest/pages/commit'));
const ViewCommitment = React.lazy(() =>
  import('pages/invest/pages/view-commitment')
);

const Invest = () => (
  <InvestProvider>
    <Suspense fallback={<span>loading</span>}>
      <Switch>
        <Route path="/invest" exact component={DsoBoard} />
        <Route path="/invest/view" exact component={DsoView} />
        <Route path="/invest/commit" exact component={AddCommitment} />
        <Route
          path="/invest/view-commitment"
          exact
          component={ViewCommitment}
        />
      </Switch>
    </Suspense>
  </InvestProvider>
);

export default Invest;
