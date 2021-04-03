import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'

import { ViewButton } from 'app/pages/identity/components/ViewButton/ViewButton'
import { CompanyInfoView } from 'app/pages/identity/components/CompanyInfoView/CompanyInfoView'
import { VSpacer } from 'components/VSpacer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { NoIdentity } from 'app/pages/identity/components/NoIdentity/NoIdentity'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { Section } from 'app/pages/identity/components/Section/Section'

export interface CorporatesPreviewProps {
  type: 'investor' | 'issuer'
}

export const CorporatesPreview: React.FC<CorporatesPreviewProps> = props => {
  const { type } = props
  const isIssuer = type === 'issuer'
  const { data, status } = useAllCorporates({ type })

  if (status === 'loading') {
    return null
  }

  if (data.list.length === 0) {
    return (
      <NoIdentity
        text={`You have not created corporate ${
          isIssuer ? 'issuer' : 'investor'
        } identity yet`}
      />
    )
  }

  return (
    <Grid data-testid='corporate-preview' container item>
      <Grid item xs={12}>
        <Typography variant='h4'>
          Corporate {isIssuer ? 'Issuer' : 'Investor'}
        </Typography>
      </Grid>

      <Grid item>
        <VSpacer size='medium' />
      </Grid>

      {data.list.map(identity => (
        <Grid item xs={12} key={identity._id} style={{ marginBottom: 20 }}>
          <Section
            title={`[${identity.status}] ${identity.companyLegalName}`}
            actions={
              <Fragment>
                <ViewButton
                  link={
                    isIssuer
                      ? IdentityRoute.viewIssuer
                      : IdentityRoute.viewCorporate
                  }
                  params={{
                    identityId: identity._id,
                    userId: identity.user._id,
                    label: identity.companyLegalName
                  }}
                />
                <Box mx={1} component='span' />
                <EditButton
                  link={
                    isIssuer
                      ? IdentityRoute.editIssuer
                      : IdentityRoute.editCorporate
                  }
                  params={{
                    identityId: identity._id,
                    userId: identity.user._id,
                    label: identity.companyLegalName
                  }}
                />
              </Fragment>
            }
          >
            <CompanyInfoView data={identity} />
          </Section>
        </Grid>
      ))}
    </Grid>
  )
}
