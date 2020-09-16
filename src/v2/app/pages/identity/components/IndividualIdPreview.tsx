import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { Section } from 'v2/app/pages/identity/components/Section'
import { individualIdentityFormValidationSchema } from 'v2/app/pages/identity/components/validation'
import UserInfoComponent from 'v2/app/pages/identity/components/UserInfo'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/pages/IdentitiesList'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import { getIdentityFormDefaultValue } from 'v2/app/pages/identity/utils'

export const IndividualIdPreview: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { routes } = useIdentitiesRouter()
  const { Form } = useIndividualIdentityForm()

  if (status === 'loading') {
    return null
  }

  if (data === undefined) {
    return (
      <NoIdentity text='Create Individual Identity' link='createIndividual' />
    )
  }

  const viewIndividualIdentity = (
    <Button color='primary'>
      <AppRouterLink to={routes.individual}>View</AppRouterLink>
    </Button>
  )

  return (
    <Grid container item direction='column'>
      <Section
        title={`${data.firstName} ${data.lastName}`}
        actions={viewIndividualIdentity}
      >
        <Form
          defaultValues={getIdentityFormDefaultValue(data, 'individual')}
          validationSchema={individualIdentityFormValidationSchema}
          onSubmit={alert}
        >
          <Grid container>
            <UserInfoComponent isEditing={false} useOwnEmail />
          </Grid>
        </Form>
      </Section>
    </Grid>
  )
}
