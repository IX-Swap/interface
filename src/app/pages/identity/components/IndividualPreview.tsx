import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Section } from 'app/pages/identity/components/Section'
import { ViewButton } from 'app/pages/identity/components/ViewButton'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { NoIdentity } from 'app/pages/identity/components/NoIdentity'
import { IndividualInfoView } from 'app/pages/identity/components/IndividualInfoView'
import { VSpacer } from 'components/VSpacer'

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
    <Grid container item direction='column'>
      <Grid item>
        <Typography variant='h4'>Individual</Typography>
      </Grid>
      <Grid item>
        <VSpacer size='medium' />
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
