import React from 'react'
import { CorporateIdentity } from 'v2/types/identity'
import { Grid } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import { declarations } from 'v2/app/pages/identity/const/declarations'
import { CompanyInfoView } from 'v2/app/pages/identity/components/CompanyInfoView'
import { AddressView } from 'v2/app/pages/identity/components/AddressView'
import { IdentityDocumentsView } from 'v2/app/pages/identity/components/IdentityDocumentsView'
import { DeclarationView } from 'v2/app/pages/identity/components/DeclarationView'
import { CorporateProfilesView } from 'v2/app/pages/identity/components/CorporateProfilesView'

export interface CorporateViewProps {
  data: CorporateIdentity
}

export const CorporateView = (props: CorporateViewProps) => {
  const { data } = props

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Section title='Company Information'>
          <CompanyInfoView data={data} />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Company Address'>
          <AddressView data={data.companyAddress} />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Company Representative'>
          <CorporateProfilesView data={data.representatives} user={data.user} />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Company Director'>
          <CorporateProfilesView data={data.directors} user={data.user} />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Beneficial Owner'>
          <CorporateProfilesView
            data={data.beneficialOwners}
            user={data.user}
          />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Documents'>
          <IdentityDocumentsView data={data.documents} type='corporate' />
        </Section>
      </Grid>

      <Grid item xs={12}>
        <Section title='Declaration & Acknowledgement' subtitle='Confirmation'>
          <DeclarationView
            declarations={declarations.corporate}
            data={data.declarations}
          />
        </Section>
      </Grid>
    </Grid>
  )
}
