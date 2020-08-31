import React from 'react'
import { Button } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'

export const SubmitButton: React.FC = props => {
  const { children } = props
  const { formState } = useFormContext()

  return (
    <Button
      disableElevation
      variant='contained'
      color='primary'
      disabled={!formState.isValid || formState.isSubmitting}
      type='submit'
    >
      {children}
    </Button>
  )
}
