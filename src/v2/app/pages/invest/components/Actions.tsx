import React from 'react'
import { Commitment } from 'v2/types/commitment'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { Button } from '@material-ui/core'
import { useCommitmentRouter } from 'v2/app/pages/invest/routers/commitmentsRouter'

export interface ActionsProps {
  item: Commitment
}

export const Actions = ({ item }: ActionsProps) => {
  const { paths } = useCommitmentRouter()

  return (
    <AppRouterLink
      to={paths.commitmentView}
      params={{ commitmentId: item._id }}
    >
      <Button>View</Button>
    </AppRouterLink>
  )
}
