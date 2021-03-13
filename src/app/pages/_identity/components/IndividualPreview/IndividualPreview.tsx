import React, { Fragment } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Section } from 'app/pages/identity/components/Section'
import { ViewButton } from 'app/pages/identity/components/ViewButton'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { IndividualInfoView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualInfoView/IndividualInfoView'
import { VSpacer } from 'components/VSpacer'
import { EditButton } from 'app/pages/_identity/components/EditButton/EditButton'

export const IndividualPreview = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (data === undefined) {
    return <div>No individual</div>
    // return (
    //   <NoIdentity text='Create Individual Identity' link='createIndividual' />
    // )
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
              <ViewButton link={paths.individual} params={{ label: name }} />
              <Box mx={1} component='span' />
              <EditButton
                link={paths.editIndividual}
                params={{ label: name }}
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
