import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useLocation
} from 'react-router-dom'

import routes from './routes'
import { Grid, Container } from '@material-ui/core'
import PageTitle from '../../components/page-title'

const Routes = ({ parent }: { parent: string }) => (
  <Switch>
    <Route
      exact
      path={parent + '/'}
      component={() => <Redirect to={parent + '/balances'} />}
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

const Accounts = () => {
  const match = useRouteMatch()
  const location = useLocation()

  const pageTitle = () => {
    const x = location.pathname
      .replace(match.path, '/')
      .split('/')
      .filter(Boolean)
    const routeString = ['', ...x].join('/')
    const route = routes.find((e) => routeString.startsWith(e.path))

    return route?.label ?? 'Accounts'
  }

  return (
    <Container>
      <Grid container title='Accounts' direction='column'>
        <Grid item>
          <PageTitle title={pageTitle()} />
        </Grid>
        <Grid item>
          <MemoedRoutes parent={match.path} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Accounts
