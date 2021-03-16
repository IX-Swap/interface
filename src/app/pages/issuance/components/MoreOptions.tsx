import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './MoreOptions.styles'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'

export const MoreOptions = () => {
  const { link } = useStyles()
  const { paths } = useIssuanceRouter()

  const {
    params: { dsoId, issuerId }
  } = useIssuanceRouter()

  const { data } = useDSOById(dsoId, issuerId)

  if (data === undefined) {
    return null
  }

  if (typeof dsoId === 'undefined') {
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
            dsoId: dsoId
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
            dsoId: dsoId
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
