import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { IdentityProvider } from './modules'

const IndentityLanding = React.lazy(() => import('./pages/landing'))
const IndividualIdentity = React.lazy(() => import('./pages/individual'))
const CorporateIdentity = React.lazy(() => import('./pages/corporate'))

const useStyles = makeStyles(() => ({
  pageTitle: {
    lineHeight: '2em'
  }
}))

const routes = [
  {
    title: 'Identity',
    route: '/identity',
    component: IndentityLanding
  },
  {
    title: 'Corporate Identity',
    route: '/identity/corporate',
    component: CorporateIdentity
  },
  {
    title: 'Individual Identity',
    route: '/identity/individual',
    component: IndividualIdentity
  }
]

const Identity = () => {
  const classes = useStyles()

  return (
    <IdentityProvider>
      <Container>
        <Typography variant='h2' className={classes.pageTitle}>
          Identity
        </Typography>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            {routes.map((route, index) => (
              <Route
                exact={index === 0}
                key={route.title}
                path={route.route}
                component={route.component}
              />
            ))}
          </Suspense>
          <Redirect to='/identity' />
        </Switch>
      </Container>
    </IdentityProvider>
  )
}

export default Identity
