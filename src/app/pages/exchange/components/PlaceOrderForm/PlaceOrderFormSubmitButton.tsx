import { Grid } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm.styles'
import { Submit } from 'components/form/Submit'
import { isNotNullish } from 'helpers/numbers'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface PlaceOrderFormSubmitButtonProps {
  createOrderStatus?: string
  isFetching: boolean
  isDisabled: boolean
  balance: number
  activeTabNameIdx: number
}

export const PlaceOrderFormSubmitButton = ({
  createOrderStatus,
  isFetching,
  isDisabled,
  balance,
  activeTabNameIdx
}: PlaceOrderFormSubmitButtonProps) => {
  const classes = useStyles(activeTabNameIdx)
  const { watch } = useFormContext()
  const price = watch('price')
  const amount = watch('amount')

  return (
    <Grid item className={classes.buttonWrapper}>
      <Submit
        createOrderStatus={createOrderStatus}
        disabled={
          isFetching ||
          isDisabled ||
          balance <= 0 ||
          !isNotNullish(price) ||
          !isNotNullish(amount)
        }
        data-testid='submit'
        size='large'
        variant='contained'
        className={classes.button}
      >
        PLACE ORDER
      </Submit>
    </Grid>
  )
}
