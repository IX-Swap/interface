import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid } from '@material-ui/core'
import { useDSOById } from 'v2/app/pages/invest/hooks/useDSOById'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { VSpacer } from 'v2/components/VSpacer'

export const ViewDSO = () => {
  const { dsoId } = useParams<{
    dsoId: string
  }>()
  const { isLoading, data } = useDSOById(dsoId)
  const { paths } = useIssuanceRouter()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item container justify='flex-end'>
        <Button color='primary' variant='contained'>
          <AppRouterLink to={paths.edit} params={{ dsoId }}>
            Edit
          </AppRouterLink>
        </Button>
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <DSOForm data={data} />
      </Grid>
    </Grid>
  )
}
