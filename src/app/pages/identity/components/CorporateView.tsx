import React from 'react'
import { CorporateIdentity } from 'types/identity'
import { Grid } from '@material-ui/core'
import { Section } from 'app/pages/identity/components/Section'
import { CompanyInfoView } from 'app/pages/identity/components/CompanyInfoView'
import { AddressView } from 'app/pages/identity/components/AddressView'
import { IdentityDocumentsView } from 'app/pages/identity/components/IdentityDocumentsView'
import { DeclarationView } from 'app/pages/identity/components/DeclarationView'
import { CorporateProfilesView } from 'app/pages/identity/components/CorporateProfilesView'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { privateClassNames } from 'helpers/classnames'

export interface CorporateViewProps {
  data: CorporateIdentity
}

export const CorporateView = (props: CorporateViewProps) => {
  const { data } = props

  useSetPageTitle(data.companyLegalName)

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

      <Grid item xs={12} className={privateClassNames()}>
        <Section title='Company Representative'>
          <CorporateProfilesView data={data.representatives} user={data.user} />
        </Section>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
        <Section title='Company Director'>
          <CorporateProfilesView data={data.directors} user={data.user} />
        </Section>
      </Grid>

      <Grid item xs={12} className={privateClassNames()}>
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
          <DeclarationView data={data.declarations} type='corporate' />
        </Section>
      </Grid>
    </Grid>
  )
}
