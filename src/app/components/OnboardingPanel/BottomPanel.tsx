import { CorporateOnboardingSteps } from 'app/components/OnboardingPanel/CorporateOnboardingSteps'
import { HomeOnboardingSteps } from 'app/components/OnboardingPanel/HomeOnboardingSteps'
import { IndividualOnboardingSteps } from 'app/components/OnboardingPanel/IndividualOnboardingSteps'
import { IssuerOnboardingSteps } from 'app/components/OnboardingPanel/IssuerOnboardingSteps'
import { IdentityRoute } from 'app/pages/identity/router/config'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

export const BottomPanel = () => {
  return (
    <Switch>
      <Route
        path={[
          IdentityRoute.viewIndividual,
          IdentityRoute.createIndividual,
          IdentityRoute.editIndividual
        ]}
      >
        <IndividualOnboardingSteps />
      </Route>
      <Route
        path={[
          IdentityRoute.viewCorporate,
          IdentityRoute.createCorporate,
          IdentityRoute.editCorporate
        ]}
      >
        <CorporateOnboardingSteps />
      </Route>
      <Route
        path={[
          IdentityRoute.viewIssuer,
          IdentityRoute.createIssuer,
          IdentityRoute.editIssuer,
          IdentityRoute.createDetailsOfIssuance
        ]}
      >
        <IssuerOnboardingSteps />
      </Route>
      <Route>
        <HomeOnboardingSteps />
      </Route>
    </Switch>
  )
}
