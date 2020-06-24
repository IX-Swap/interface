import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from 'react-router-dom'

import routes from './routes'

const Routes = ({ parent }: { parent: string }) => (
  <Switch>
    <Route
      exact
      path={parent + '/'}
      component={() => <Redirect to={parent + '/banks'} />}
    />
    {routes.map(({ path, component, exact }) => (
      <Route
        key={path}
        path={`${parent}${path}`}
        component={component}
        exact={exact}
      />
    ))}
  </Switch>
)

const MemoedRoutes = React.memo(Routes)

const Authorizer = () => {
  const match = useRouteMatch()

  return (
    <>
      <MemoedRoutes parent={match.path} />
    </>
  )
}

export default Authorizer
