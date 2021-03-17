import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Section } from 'app/pages/identity/components/Section'
import { ViewButton } from 'app/pages/identity/components/ViewButton'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { IndividualInfoView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualInfoView/IndividualInfoView'
import { VSpacer } from 'components/VSpacer'
import { EditButton } from 'app/pages/_identity/components/EditButton/EditButton'
import { NoIdentity } from 'app/pages/identity/components/NoIdentity'
import { IdentityRoute } from 'app/pages/_identity/router/config'

export const IndividualPreview = () => {
  const { data, status } = useIndividualIdentity()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (data === undefined) {
    return <NoIdentity text='You have not created individual identity yet' />
  }

  const name = `[${data.status}] ${data.firstName} ${data.lastName}`

  return (
    <Grid container item direction='column'>
      <Grid item>
        <Typography variant='h4'>Individual Investor</Typography>
      </Grid>
      <Grid item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <Section
          title={name}
          actions={
            <Fragment>
              <ViewButton
                link={IdentityRoute.viewIndividual}
                params={{ label: name, identityId: data._id }}
              />
              <Box mx={1} component='span' />
              <EditButton
                link={IdentityRoute.editIndividual}
                params={{ label: name, identityId: data._id }}
              />
            </Fragment>
          }
        >
          <IndividualInfoView data={data} />
        </Section>
      </Grid>
    </Grid>
  )
}
