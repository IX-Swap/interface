import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdentityDashboard from './pages/identity-dashboard/IdentityDashboard'
import IdentificationStepOne from './pages/identification-step-one/IdentificationStepOne'
import { IdentityProvider } from 'context/IdentityContext'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import IdentificationStepTwo from './pages/identification-step-two/IdentificationStepTwo'
import IdentificationStepThree from './pages/identification-step-three/IdentificationStepThree'
import FinancialsStepOne from './pages/financials-step-one/FinancialsStepOne'
import FinancialsStepTwo from './pages/financials-step-two/FinancialsStepTwo'
import FinancialsStepThree from './pages/financials-step-three/FinancialsStepThree'

export default function Identity () {
  return (
    <IdentityProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Switch>
          <Route path='/app/identity' exact component={IdentityDashboard} />
          <Route path='/app/identity/identification-steps/1' exact component={IdentificationStepOne} />
          <Route path='/app/identity/identification-steps/2' exact component={IdentificationStepTwo} />
          <Route path='/app/identity/identification-steps/3' exact component={IdentificationStepThree} />
          <Route path='/app/identity/financials-steps/1' exact component={FinancialsStepOne} />
          <Route path='/app/identity/financials-steps/2' exact component={FinancialsStepTwo} />
          <Route path='/app/identity/financials-steps/3' exact component={FinancialsStepThree} />
        </Switch>
      </MuiPickersUtilsProvider>
    </IdentityProvider>
  )
}
