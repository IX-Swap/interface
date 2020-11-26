import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

export const Submit: React.FC<ButtonProps> = props => {
  const { children, variant = 'contained', color = 'primary', ...rest } = props
  const { formState } = useFormContext()
  const { isSubmitting, isDirty } = formState

  return (
    <Button
      {...rest}
      disableElevation
      variant={variant}
      color={color}
      disabled={!isDirty || isSubmitting}
      type='submit'
    >
      {children}
    </Button>
  )
}
