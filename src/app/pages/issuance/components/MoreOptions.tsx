import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './MoreOptions.styles'

export const MoreOptions = () => {
  const { link } = useStyles()
  const { paths } = useIssuanceRouter()

  const {
    params: { dsoId, issuerId }
  } = useIssuanceRouter()

  if (dsoId === undefined || issuerId === undefined) {
    return null
  }

  return (
    <Grid>
      <VSpacer size='medium' />
      <Typography variant='h5'>More Options</Typography>
      <VSpacer size='small' />
      <Grid container spacing={0} direction='column'>
        <AppRouterLink
          to={paths.view}
          params={{
            dsoId,
            issuerId
          }}
          color='primary'
          underline='hover'
          className={link}
          variant='body1'
        >
          View this DSO
        </AppRouterLink>

        <AppRouterLink
          to={paths.list}
          color='primary'
          underline='hover'
          className={link}
          variant='body1'
        >
          View My DSOs
        </AppRouterLink>

        <AppRouterLink
          to={paths.create}
          color='primary'
          underline='hover'
          className={link}
          variant='body1'
        >
          Create New DSO
        </AppRouterLink>

        <AppRouterLink
          to={paths.edit}
          params={{
            dsoId,
            issuerId
          }}
          color='primary'
          underline='hover'
          variant='body1'
          className={link}
        >
          Edit DSO
        </AppRouterLink>
      </Grid>
    </Grid>
  )
}
