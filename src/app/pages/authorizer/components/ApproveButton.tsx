import React from 'react'
import { Button } from '@material-ui/core'

export interface ApproveButtonProps {
  disabled: boolean
  approve: Function
}

export const ApproveButton = (props: ApproveButtonProps) => {
  const { disabled, approve } = props

  const handleClick = async () => approve()

  return (
    <Button
      size='large'
      color='secondary'
      variant='contained'
      onClick={handleClick}
      disabled={disabled}
    >
      Approve
    </Button>
  )
}
