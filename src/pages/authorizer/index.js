//
import React, { Suspense } from 'react'
import { withRouter, Route, RouteProps } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Grid, Button, Container, Paper, Box } from '@material-ui/core'
import PageTitle from 'components/PageTitle'

const Banks = React.lazy(() => import('./banks'))
const Deposits = React.lazy(() => import('./deposits'))
const DepositsView = React.lazy(() => import('./deposits/view'))
const Withdrawals = React.lazy(() => import('./withdrawals'))
const WithdrawalsView = React.lazy(() => import('./withdrawals/view'))
const DSWithdrawals = React.lazy(() => import('./ds-withdrawals'))
const DSWithdrawalsView = React.lazy(() => import('./ds-withdrawals/view'))
const DSOs = React.lazy(() => import('./digital-securities'))
const DSOView = React.lazy(() => import('./digital-securities/view'))
const IndividualIdentities = React.lazy(() =>
  import('./individual-identities')
)
const CorporateIdentities = React.lazy(() => import('./corporate-identities'))
const Commitments = React.lazy(() => import('./commitments'))
const BankView = React.lazy(() => import('pages/accounts/bank/view'))

const BankSummary = ({ location }) => {
  const { data } = location.state || {}
  if (!data) return <span>nothing to display</span>
  return (
    <Grid container component={Paper}>
      <Container>
        <Box m={4}>
          <BankView bank={data} />
        </Box>
      </Container>
    </Grid>
  )
}

const routes = [
  {
    route: '/authorizer/banks',
    title: 'Banks',
    component: Banks
  },
  {
    route: '/authorizer/deposits',
    title: 'Deposits',
    exact: true,
    component: Deposits
  },
  {
    route: '/authorizer/deposits/view',
    title: 'View Deposit',
    component: DepositsView,
    hasBack: true
  },
  {
    route: '/authorizer/withdrawals',
    title: 'Withdrawals',
    exact: true,
    component: Withdrawals
  },
  {
    route: '/authorizer/withdrawals/view',
    title: 'View Withdrawal',
    component: WithdrawalsView,
    hasBack: true
  },
  {
    route: '/authorizer/ds-withdrawals',
    title: 'DS Withdrawals',
    component: DSWithdrawals,
    exact: true
  },
  {
    route: '/authorizer/ds-withdrawals/view',
    title: 'View DS Withdrawal',
    component: DSWithdrawalsView,
    hasBack: true
  },
  {
    route: '/authorizer/individual-identities',
    title: 'Individual Identities',
    component: IndividualIdentities
  },
  {
    route: '/authorizer/corporate-identities',
    title: 'Corporate Identities',
    component: CorporateIdentities
  },
  {
    route: '/authorizer/digital-securities/:id',
    title: 'View Digital Security',
    component: DSOView
  },
  {
    route: '/authorizer/digital-securities',
    title: 'Offerings',
    exact: true,
    component: DSOs
  },
  {
    route: '/authorizer/commitments',
    title: 'Commitments',
    component: Commitments
  },
  {
    route: '/authorizer/summary',
    title: 'Summary',
    component: BankSummary,
    hasBack: true
  }
]

const Routes = () => (
  <Suspense fallback={<span>loading</span>}>
    {routes.map((route, index) => (
      <Route
        key={route.title}
        path={route.route}
        component={route.component}
        exact={route.exact || index === routes.length - 1}
      />
    ))}
  </Suspense>
)

const getTitle = path => {
  switch (path) {
    case '/authorizer/banks':
      return 'Banks'
    case '/authorizer/deposits':
      return 'Deposits'
    case '/authorizer/withdrawals':
      return 'Withdrawals'
    case '/authorizer/individual-identities':
      return 'Individual Identities'
    case '/authorizer/corporate-identities':
      return 'Corporate Identities'
    case '/authorizer/ds-withdrawals':
      return 'DS Withdrawals'
    case '/authorizer/digital-securities':
      return 'Digital Securities'
    case '/authorizer/commitments':
      return 'Commitments'
    case '/authorizer/summary':
      return 'Summary'
    case '/authorizer/deposits/view':
      return 'View Deposit'
    case '/authorizer/withdrawals/view':
      return 'View Withdrawal'
    case '/authorizer/ds-withdrawals/view':
      return 'View DS Withdrawal'
    default:
      return ''
  }
}

function Authorizer (props) {
  const { location, history } = props

  const hasBack = a =>
    [
      '/authorizer/withdrawals/view',
      '/authorizer/deposits/view',
      '/authorizer/summary',
      '/authorizer/ds-withdrawals/view'
    ].includes(a)

  return (
    <>
      <Grid container title='Accounts' justify='center' alignItems='center'>
        <Grid container item xs={12} alignItems='center'>
          <Grid item>
            {hasBack(location.pathname) && (
              <Button type='button' onClick={() => history.goBack()}>
                <ArrowBackIosIcon />
              </Button>
            )}
          </Grid>
          <Grid item>
            {location && <PageTitle title={getTitle(location.pathname)} />}
          </Grid>
        </Grid>
        <Routes />
      </Grid>
    </>
  )
}

export default withRouter(Authorizer)
