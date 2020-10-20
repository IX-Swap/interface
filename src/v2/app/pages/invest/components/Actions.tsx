import React from 'react'
import { Commitment } from 'v2/types/commitment'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { Button } from '@material-ui/core'
import { useCommitmentRouter } from 'v2/app/pages/invest/routers/commitmentsRouter'

export interface ActionsProps {
  item: Commitment
}

export const Actions = ({ item }: ActionsProps) => {
  const { paths } = useCommitmentRouter()

  return (
    <Button
      component={AppRouterLinkComponent}
      to={paths.commitmentView}
      params={{ commitmentId: item._id }}
      size='small'
      variant='outlined'
    >
      View
    </Button>
  )
}
