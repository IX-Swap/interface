import React from 'react'
import { UploadRendererProps } from 'v2/components/dataroom/DataroomUploadAndAppend'
import { Button, ButtonProps } from '@material-ui/core'

export interface UploadButtonProps
  extends UploadRendererProps,
    Omit<ButtonProps, 'onClick'> {}

export const UploadButton = (props: UploadButtonProps) => {
  const { isLoading, ...rest } = props

  return (
    <Button
      {...rest}
      variant='contained'
      color='primary'
      disabled={isLoading}
      disableElevation
    >
      {isLoading ? 'Uploading...' : 'Upload'}
    </Button>
  )
}
