import React from 'react'
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom'

import routes from './routes'
import PageTitle from '../../../../components/page-title'
import { Grid, Box, Paper } from '@material-ui/core'
import { useObserver } from 'mobx-react'
import { useStore } from './store'

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

const TitleView = () => {
  const store = useStore()
  return useObserver(() => <PageTitle subPage title={store.title} />)
}

const AccountsBanks = () => {
  const match = useRouteMatch()
  const location = useLocation()

  const matchTrimmed = match.path.split('/').filter(Boolean).join('/')
  const locationTrimmed = location.pathname.split('/').filter(Boolean).join('/')

  return (
    <Grid container direction='column'>
      {matchTrimmed !== locationTrimmed && (
        <Grid item>
          <TitleView />
          <Box pb={2} />
        </Grid>
      )}
      <Grid item>
        <Paper>
          <MemoedRoutes parent={match.path} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default AccountsBanks
