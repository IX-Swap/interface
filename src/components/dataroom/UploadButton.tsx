import React from 'react'
import { UploadRendererProps } from 'components/dataroom/DataroomUploadAndAppend'
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
      size='large'
      color='primary'
      disabled={isLoading}
      disableElevation
    >
      {isLoading ? 'Uploading...' : 'Upload'}
    </Button>
  )
}
