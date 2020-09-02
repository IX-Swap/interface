import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import routes from 'v2/app/pages/identity/routes'
import { Container } from '@material-ui/core'

const Routes = ({ parent }: { parent: string }) => (
  <Container>
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
  </Container>
)

const MemoedRoutes = React.memo(Routes)

const Identity = () => {
  const match = useRouteMatch()

  return <MemoedRoutes parent={match.path} />
}

export default Identity
