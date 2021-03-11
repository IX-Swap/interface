import React from 'react'
import { IndividualIdentity } from 'types/identity'
import { Grid } from '@material-ui/core'
import { Section } from 'app/pages/identity/components/Section'
import { IndividualInfoView } from 'app/pages/identity/components/IndividualInfoView'
import { AddressView } from 'app/pages/identity/components/AddressView'
import { FinancialView } from 'app/pages/identity/FinancialView'
import { IdentityDocumentsView } from 'app/pages/_identity/components/IdentityDocumentsView/IdentityDocumentsView'
import { DeclarationView } from 'app/pages/identity/components/DeclarationView'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { privateClassNames } from 'helpers/classnames'

export interface IndividualViewProps {
  data: IndividualIdentity
}

export const IndividualView = (props: IndividualViewProps) => {
  const { data } = props

  useSetPageTitle(getPersonName(data))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Section title='Identity'>
          <IndividualInfoView data={data} />
        </Section>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <Section title='Address'>
          <AddressView data={data.address} />
        </Section>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <Section title='Financials'>
          <FinancialView data={data} />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Documents'>
          <IdentityDocumentsView data={data.documents} type='individual' />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Declarations'>
          <DeclarationView type='individual' data={data} />
        </Section>
      </Grid>
    </Grid>
  )
}
