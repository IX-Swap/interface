import React from 'react'
import { IndividualIdentity } from 'v2/types/identity'
import { Grid } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import { IndividualInfoView } from 'v2/app/pages/identity/components/IndividualInfoView'
import { AddressView } from 'v2/app/pages/identity/components/AddressView'
import { FinancialView } from 'v2/app/pages/identity/FinancialView'
import { IdentityDocumentsView } from 'v2/app/pages/identity/components/IdentityDocumentsView'
import { DeclarationView } from 'v2/app/pages/identity/components/DeclarationView'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'
import { getPersonName } from 'v2/helpers/strings'

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

      <Grid item xs={12}>
        <Section title='Address'>
          <AddressView data={data.address} />
        </Section>
      </Grid>

      <Grid item xs={12}>
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
          <DeclarationView type='individual' data={data.declarations} />
        </Section>
      </Grid>
    </Grid>
  )
}
