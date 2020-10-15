import React from 'react'
import { Button } from '@material-ui/core'
import { useReject } from '../hooks/useReject'
import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'

export interface RejectButtonProps {
  itemId: string
}

export const RejectButton = (props: RejectButtonProps) => {
  const feature = useAuthorizerCategory()
  const uri = authorizerItemMap[feature].uri
  const [reject, { isLoading }] = useReject({ id: props.itemId, uri })
  const handleClick = async () => await reject()

  return (
    <Button
      size='large'
      color='secondary'
      variant='contained'
      onClick={handleClick}
      disabled={isLoading}
    >
      Reject
    </Button>
  )
}
