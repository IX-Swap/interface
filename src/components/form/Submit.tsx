import React, { useEffect } from 'react'
import { Button, ButtonProps } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

export interface SubmitProps extends ButtonProps {
  watchIsDirty?: boolean
  createOrderStatus?: string
}

export const Submit: React.FC<SubmitProps> = props => {
  const {
    watchIsDirty = true,
    children,
    variant = 'contained',
    color = 'primary',
    createOrderStatus = '',
    disabled,
    ...rest
  } = props
  const { formState, reset } = useFormContext()
  const { isSubmitting, isDirty, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful && createOrderStatus === 'success') {
      reset()
    }
  }, [isSubmitSuccessful, createOrderStatus]) // eslint-disable-line

  return (
    <Button
      disableElevation
      variant={variant}
      color={color}
      disabled={
        Boolean(disabled) || (watchIsDirty ? !isDirty : false || isSubmitting)
      }
      type='submit'
      {...rest}
    >
      {children}
    </Button>
  )
}
