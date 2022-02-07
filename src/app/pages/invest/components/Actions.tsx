import React from 'react'
import { Commitment } from 'types/commitment'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@mui/material'
import { CommitmentRoute } from 'app/pages/invest/router/config'

export interface ActionsProps {
  item: Commitment
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <Button
      component={AppRouterLinkComponent}
      to={CommitmentRoute.view}
      params={{ commitmentId: item._id }}
      size='small'
      variant='outlined'
    >
      View
    </Button>
  )
}
