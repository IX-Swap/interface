import React from 'react'
import { Button } from '@material-ui/core'
import { useWatch } from 'react-hook-form'
import { AuthorizerFormValues } from './AuthorizerForm'
import { useAuthorizerTableStore } from '../context'
import { ApproveArgs, useApprove } from '../hooks/useApprove'

export interface ApproveButtonProps {
  itemId: string
}

export const ApproveButton = (props: ApproveButtonProps) => {
  const values = useWatch<AuthorizerFormValues>({
    name: ['comment', 'sharedWithUser']
  })
  const disabled =
    values.comment === undefined || values.sharedWithUser === undefined
  const { uri } = useAuthorizerTableStore()
  const [approve] = useApprove({ uri, id: props.itemId })
  const handleClick = async () => await approve(values as ApproveArgs)

  return (
    <Button
      color='primary'
      variant='contained'
      onClick={handleClick}
      disabled={disabled}
    >
      Approve
    </Button>
  )
}
