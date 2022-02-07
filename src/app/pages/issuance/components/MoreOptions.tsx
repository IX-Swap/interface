import React from 'react'
import { Grid, Typography } from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './MoreOptions.styles'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'

export const MoreOptions = () => {
  const { link } = useStyles()
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()

  const { data } = useDSOById(dsoId, issuerId)

  if (data === undefined) {
    return null
  }

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
          to={IssuanceRoute.view}
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
          to={IssuanceRoute.deployToken}
          params={{
            dsoId,
            issuerId
          }}
          color='primary'
          underline='hover'
          className={link}
          variant='body1'
        >
          Deploy Token
        </AppRouterLink>

        <AppRouterLink
          to={IssuanceRoute.list}
          color='primary'
          underline='hover'
          className={link}
          variant='body1'
        >
          View My DSOs
        </AppRouterLink>

        <AppRouterLink
          to={IssuanceRoute.create}
          color='primary'
          underline='hover'
          className={link}
          variant='body1'
        >
          Create New DSO
        </AppRouterLink>

        <AppRouterLink
          to={IssuanceRoute.edit}
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
