import React from 'react'
import { Grid } from '@material-ui/core'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { VSpacer } from 'v2/components/VSpacer'
import { IndividualView } from 'v2/app/pages/identity/components/IndividualView'

export const IndividualIdView: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid container item justify='flex-end' alignItems='center'>
        <EditButton link={paths.editIndividual} />
      </Grid>
      <Grid item container>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <IndividualView data={data} />
      </Grid>
    </Grid>
  )
}
