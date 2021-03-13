import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { Section } from 'app/pages/_identity/components/Section/Section'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { ViewButton } from 'app/pages/_identity/components/ViewButton/ViewButton'
import { CompanyInfoView } from 'app/pages/_identity/components/CompanyInfoView/CompanyInfoView'
import { VSpacer } from 'components/VSpacer'
import { EditButton } from 'app/pages/_identity/components/EditButton/EditButton'

export interface CorporatesPreviewProps {
  type: 'investor' | 'issuer'
}

export const CorporatesPreview: React.FC<CorporatesPreviewProps> = props => {
  const { type } = props
  const { data, status } = useAllCorporates({ type })
  const { paths } = useIdentitiesRouter()

  if (status === 'loading') {
    return null
  }

  if (data.list.length === 0) {
    return <div>No corporate</div>
    // return (
    //   <NoIdentity text='Create Corporate Identity' link='createCorporate' />
    // )
  }

  return (
    <Grid data-testid='corporate-preview' container item>
      <Grid item xs={12}>
        <Typography variant='h4'>
          Corporate {type === 'investor' ? 'Investor' : 'Issuer'}
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
                  link={paths.corporate}
                  params={{
                    identityId: identity._id,
                    label: identity.companyLegalName
                  }}
                />
                <Box mx={1} component='span' />
                <EditButton
                  link={paths.editCorporate}
                  params={{
                    identityId: identity._id,
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
