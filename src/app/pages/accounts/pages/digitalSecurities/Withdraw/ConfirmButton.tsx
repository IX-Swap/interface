import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export interface ConfirmButtonProps {
  disabled: boolean
  isSuccess: boolean
}

export const ConfirmButton = ({ disabled, isSuccess }: ConfirmButtonProps) => {
  const { reset } = useFormContext()

  useEffect(() => {
    isSuccess && reset()
  }, [isSuccess, reset])

  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          disableElevation
          type='submit'
          variant='contained'
          color='primary'
          disabled={disabled}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  )
}
