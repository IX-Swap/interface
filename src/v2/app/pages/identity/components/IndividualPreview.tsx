import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import { ViewButton } from 'v2/app/pages/identity/components/ViewButton'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { NoIdentity } from 'v2/app/pages/identity/components/NoIdentity'
import { IndividualInfoView } from 'v2/app/pages/identity/components/IndividualInfoView'

export const IndividualPreview: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading') {
    return null
  }

  if (data === undefined) {
    return (
      <NoIdentity text='Create Individual Identity' link='createIndividual' />
    )
  }

  const name = `${data.firstName} ${data.lastName}`

  return (
    <Grid container item direction='column' spacing={2}>
      <Grid item>
        <Typography variant='h4'>Individual</Typography>
      </Grid>
      <Grid item>
        <Section
          title={name}
          actions={
            <ViewButton link={paths.individual} params={{ label: name }} />
          }
        >
          <IndividualInfoView data={data} />
        </Section>
      </Grid>
    </Grid>
  )
}
