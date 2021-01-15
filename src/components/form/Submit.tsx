import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

export interface SubmitProps extends ButtonProps {
  watchIsDirty?: boolean
}

export const Submit: React.FC<SubmitProps> = props => {
  const { watchIsDirty = true, children, variant = 'contained', color = 'primary', ...rest } = props
  const { formState } = useFormContext()
  const { isSubmitting, isDirty } = formState

  return (
    <Button
      disableElevation
      variant={variant}
      color={color}
      disabled={watchIsDirty ? !isDirty : false || isSubmitting}
      type='submit'
      {...rest}
    >
      {children}
    </Button>
  )
}
