import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { Section } from 'v2/app/pages/identity/components/Section'
import { useCorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { corporateIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'

export const CorporateIdPreview: React.FC = () => {
  const { Form } = useCorporateIdentityForm()
  const { data, status } = useAllCorporateIdentities()
  const { routes } = useIdentitiesRouter()

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
        const viewCorporateIdentity = (
          <Button color='primary'>
            <AppRouterLink
              to={routes.corporate}
              params={{ identityId: identity._id }}
            >
              View
            </AppRouterLink>
          </Button>
        )

        return (
          <Grid item xs={12} key={identity._id}>
            <Section
              title={identity.companyLegalName}
              actions={viewCorporateIdentity}
            >
              <Form
                validationSchema={corporateIdentityFormValidationSchema}
                onSubmit={console.log}
                defaultValues={identity}
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
