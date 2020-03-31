import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdentityDashboard from './pages/identity-dashboard'
import IdentificationStepOne from './pages/identification-step-one'
import { IdentityProvider } from 'context/IdentityContext'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import IdentificationStepTwo from './pages/identification-step-two'
import IdentificationStepThree from './pages/identification-step-three'
import FinancialsStepOne from './pages/financials-step-one'
import FinancialsStepTwo from './pages/financials-step-two'
import FinancialsStepThree from './pages/financials-step-three'
import { AccreditationProvider } from 'context/AccreditationContext'
import AccreditationStepOne from './pages/accredaditation-step-one'
import AccreditationStepTwo from './pages/accredaditation-step-two'
import AccreditationStepThree from './pages/accredaditation-step-three'
import UpdateIdentity from './pages/update-identitiy'
import Alert from '@material-ui/lab/Alert'

export default function Identity () {
  return (
    <IdentityProvider>
      <AccreditationProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Switch>
            <Route path='/app/identity' exact component={IdentityDashboard} />
            <Route path='/app/identity/edit' exact component={UpdateIdentity} />
            <Route
              path='/app/identity/identification-steps/1'
              exact
              component={IdentificationStepOne}
            />
            <Route
              path='/app/identity/identification-steps/2'
              exact
              component={IdentificationStepTwo}
            />
            <Route
              path='/app/identity/identification-steps/3'
              exact
              component={IdentificationStepThree}
            />
            <Route
              path='/app/identity/financials-steps/1'
              exact
              component={FinancialsStepOne}
            />
            <Route
              path='/app/identity/financials-steps/2'
              exact
              component={FinancialsStepTwo}
            />
            <Route
              path='/app/identity/financials-steps/3'
              exact
              component={FinancialsStepThree}
            />
            <Route
              path='/app/identity/accreditation-steps/1'
              exact
              component={AccreditationStepOne}
            />
            <Route
              path='/app/identity/accreditation-steps/2'
              exact
              component={AccreditationStepTwo}
            />
            <Route
              path='/app/identity/accreditation-steps/3'
              exact
              component={AccreditationStepThree}
            />
            <Route>
              <Alert severity='error'>Page not found</Alert>
            </Route>
          </Switch>
        </MuiPickersUtilsProvider>
      </AccreditationProvider>
    </IdentityProvider>
  )
}
