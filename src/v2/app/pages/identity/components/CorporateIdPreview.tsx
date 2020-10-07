import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { Section } from 'v2/app/pages/identity/components/Section'
import { useCorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { corporateIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import { ViewButton } from 'v2/app/pages/identity/components/ViewButton'
import { getIdentityFormDefaultValue } from 'v2/app/pages/identity/utils'

export const CorporateIdPreview: React.FC = () => {
  const { Form } = useCorporateIdentityForm()
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
    <Grid container item direction='column' spacing={2}>
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
                  params={{ identityId: identity._id }}
                />
              }
            >
              <Form
                validationSchema={corporateIdentityFormValidationSchema}
                onSubmit={console.log}
                defaultValues={getIdentityFormDefaultValue(
                  identity,
                  'corporate'
                )}
              >
                <Grid container>
                  <CompanyInformation
                    corporate={identity}
                    useOwnEmail={false}
                    isEditing={false}
                  />
                </Grid>
              </Form>
            </Section>
          </Grid>
        )
      })}
    </Grid>
  )
}
