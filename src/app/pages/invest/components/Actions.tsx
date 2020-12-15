import React from 'react'
import { Commitment } from 'types/commitment'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@material-ui/core'
import { useCommitmentRouter } from 'app/pages/invest/routers/commitmentsRouter'

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
