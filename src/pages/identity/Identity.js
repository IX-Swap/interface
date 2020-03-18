import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdentityDashboard from './pages/identity-dashboard/IdentityDashboard'
import IdentificationStepOne from './pages/identification-step-one/IdentificationStepOne'
import { IdentityProvider } from 'context/IdentityContext'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

export default function Identity () {
  return (
    <IdentityProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Switch>
          <Route path='/app/identity' exact component={IdentityDashboard} />
          <Route path='/app/identity/identification-steps/1' exact component={IdentificationStepOne} />
        </Switch>
      </MuiPickersUtilsProvider>
    </IdentityProvider>
  )
}
