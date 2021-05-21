import { Submit } from 'components/form/Submit'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useStyles } from 'app/pages/exchange/market/components/PlaceOrderSubmit/PlaceOrderSubmit.style'

export const PlaceOrderSubmit = () => {
  const classes = useStyles()
  const { watch, errors } = useFormContext()
  const price = watch('price')
  const amount = watch('amount')
  const isSubmitDisabled =
    errors.amount !== undefined ||
    errors.price !== undefined ||
    amount === undefined ||
    price === undefined ||
    price === null ||
    amount === null

  return (
    <Submit
      data-testid='submit'
      size='large'
      variant='contained'
      className={classes.button}
      disabled={isSubmitDisabled}
    >
      PLACE ORDER
    </Submit>
  )
}
