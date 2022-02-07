import React from 'react'
import { UploadRendererProps } from 'components/dataroom/DataroomUploadAndAppend'
import { Button, ButtonProps } from '@mui/material'

export interface UploadButtonProps
  extends UploadRendererProps,
    Omit<ButtonProps, 'onClick'> {}

export const UploadButton = (props: UploadButtonProps) => {
  const {
    isLoading,
    variant = 'contained',
    size = 'large',
    color = 'primary',
    disableElevation = true,
    ...rest
  } = props

  return (
    <Button
      {...rest}
      variant={variant}
      size={size}
      color={color}
      disabled={isLoading}
      disableElevation={disableElevation}
    >
      {isLoading ? 'Uploading...' : 'Upload'}
    </Button>
  )
}
