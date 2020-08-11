import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import routes from './routes'

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
    Invest
  </Switch>
)

const MemoedRoutes = React.memo(Routes)

const Invest = () => {
  const match = useRouteMatch()

  return <MemoedRoutes parent={match.path} />
}

export default Invest
