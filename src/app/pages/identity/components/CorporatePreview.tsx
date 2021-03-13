import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { Section } from 'app/pages/identity/components/Section'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { NoIdentity } from 'app/pages/identity/components/NoIdentity'
import { ViewButton } from 'app/pages/identity/components/ViewButton'
import { CompanyInfoView } from 'app/pages/identity/components/CompanyInfoView'
import { VSpacer } from 'components/VSpacer'

export const CorporatePreview: React.FC = () => {
  const { data, status } = useAllCorporates({})
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
    <Grid data-testid='corporate-preview' container item>
      <Grid item xs={12}>
        <Typography variant='h4'>Corporate Identities</Typography>
      </Grid>

      <Grid item>
        <VSpacer size='medium' />
      </Grid>

      {data.list.map(identity => (
        <Grid item xs={12} key={identity._id} style={{ marginBottom: 20 }}>
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
            <CompanyInfoView data={identity} />
          </Section>
        </Grid>
      ))}
    </Grid>
  )
}
