import React from 'react'
import { Button } from '@material-ui/core'
import { MutateFunction } from 'react-query/types/core'

export interface ApproveButtonProps {
  disabled: boolean
  approve: MutateFunction<any, any, any, any>
}

export const ApproveButton = (props: ApproveButtonProps) => {
  const { disabled, approve } = props

  const handleClick = async () => await approve()

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
