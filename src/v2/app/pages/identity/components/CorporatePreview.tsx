import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { Section } from 'v2/app/pages/identity/components/Section'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import { ViewButton } from 'v2/app/pages/identity/components/ViewButton'
import { CompanyInfoView } from 'v2/app/pages/identity/components/CompanyInfoView'

export const CorporatePreview: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading') {
    return null
  }

  if (data.list.length === 0) {
    return (
      <NoIdentity text='Create Corporate Identity' link='createCorporate' />
    )
  }

  return (
    <Grid
      data-testid='corporate-preview'
      container
      item
      direction='column'
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant='h4'>Corporate Identities</Typography>
      </Grid>

      {data.list.map(identity => {
        return (
          <Grid item xs={12} key={identity._id}>
            <Section
              title={identity.companyLegalName}
              actions={
                <ViewButton
                  link={paths.corporate}
                  params={{
                    identityId: identity._id,
                    label: identity.companyLegalName
                  }}
                />
              }
            >
              <Grid container>
                <CompanyInfoView data={identity} />
              </Grid>
            </Section>
          </Grid>
        )
      })}
    </Grid>
  )
}
