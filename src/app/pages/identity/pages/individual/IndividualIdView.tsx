import React from 'react'
import { Grid } from '@material-ui/core'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { EditButton } from 'app/pages/identity/components/EditButton'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { VSpacer } from 'components/VSpacer'
import { IndividualView } from 'app/pages/identity/components/IndividualView'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'

export const IndividualIdView: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid item>
        <RejectionMessage data={data} />
      </Grid>
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
