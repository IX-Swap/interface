import { CorporateOnboardingSteps } from 'app/components/OnboardingPanel/CorporateOnboardingSteps'
import { HomeOnboardingSteps } from 'app/components/OnboardingPanel/HomeOnboardingSteps'
import { IndividualOnboardingSteps } from 'app/components/OnboardingPanel/IndividualOnboardingSteps'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

export const BottomPanel = () => {
  const { paths: identityPaths } = useIdentitiesRouter()
  return (
    <Switch>
      <Route
        path={[
          identityPaths.individual,
          identityPaths.createIndividual,
          identityPaths.editIndividual
        ]}
      >
        <IndividualOnboardingSteps />
      </Route>
      <Route
        path={[
          identityPaths.corporate,
          identityPaths.createCorporate,
          identityPaths.editCorporate
        ]}
      >
        <CorporateOnboardingSteps />
      </Route>
      <Route>
        <HomeOnboardingSteps />
      </Route>
    </Switch>
  )
}
