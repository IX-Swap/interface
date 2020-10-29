import React from 'react'
import { Button } from '@material-ui/core'
import { useAuthorizerAction } from 'v2/app/pages/authorizer/hooks/useAuthorizerAction'

export interface ApproveButtonProps {
  itemId: string
  disabled: boolean
}

export const ApproveButton = (props: ApproveButtonProps) => {
  const [approve, { isLoading }] = useAuthorizerAction(props.itemId, 'approve')
  const handleClick = async () => await approve()
  const disabled = isLoading || props.disabled

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
