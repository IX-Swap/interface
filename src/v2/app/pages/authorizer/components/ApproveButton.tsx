import React from 'react'
import { Button } from '@material-ui/core'
import { useWatch } from 'react-hook-form'
import { AuthorizerFormValues } from './AuthorizerForm'
import {
  ApproveArgs,
  useApprove
} from 'v2/app/pages/authorizer/hooks/useApprove'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'
import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'

export interface ApproveButtonProps {
  itemId: string
}

export const ApproveButton = (props: ApproveButtonProps) => {
  const values = useWatch<AuthorizerFormValues>({
    name: ['comment', 'sharedWithUser']
  })
  const feature = useAuthorizerCategory()
  const uri = authorizerItemMap[feature].uri
  const [approve, { isLoading }] = useApprove({ uri, id: props.itemId })
  const handleClick = async () => await approve(values as ApproveArgs)
  const disabled =
    isLoading ||
    values.comment === undefined ||
    values.sharedWithUser === undefined

  return (
    <Button
      size='large'
      color='primary'
      variant='contained'
      onClick={handleClick}
      disabled={disabled}
    >
      Approve
    </Button>
  )
}
