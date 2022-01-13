import { Button } from '@material-ui/core'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'

export interface DSOFinishLaterButtonProps {
  dso: DigitalSecurityOffering | undefined
  onSubmit: () => Promise<void>
  isLoading: boolean
}

export const DSOFinishLaterButton = (props: DSOFinishLaterButtonProps) => {
  const { dso, onSubmit, isLoading } = props

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={onSubmit}
      disabled={isLoading}
    >
      {dso === undefined ? 'Save draft' : 'Save'}
    </Button>
  )
}
