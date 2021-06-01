import * as yup from 'yup'

export const placeOrderFormValidationSchema = (balance: number) => {
  return yup.object().shape({
    price: yup
      .number()
      .when('total', (total: number, schema: yup.NumberSchema) =>
        total > balance ? schema.max(0, 'Insufficient balance') : schema
      )
      .required(),
    amount: yup
      .number()
      .when(
        ['total', 'price'],
        (total: number, price: number, schema: yup.NumberSchema) =>
          total > balance
            ? schema.max(balance / price, 'Insufficient balance')
            : schema
      )
      .required(),
    total: yup.number().required()
  })
}
