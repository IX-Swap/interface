import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import routes from 'v2/app/pages/issuance/routes'

const Routes = ({ parent }: { parent: string }) => (
  <Switch>
    {routes.map(({ path, component, exact }) => (
      <Route
        key={path}
        path={`${parent}${path}`}
        component={component}
        exact={exact}
      />
    ))}
    Issuance
  </Switch>
)

const MemoedRoutes = React.memo(Routes)

const Issuance = () => {
  const match = useRouteMatch()

  return <MemoedRoutes parent={match.path} />
}

export default Issuance
