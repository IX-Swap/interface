import * as yup from 'yup'
import {
  DepositCashFormValues,
  DepositDSFormValues,
  WithdrawCashFormValues,
  WithdrawDSFormValues,
  AddressValues,
  BankFormValues
} from 'app/pages/accounts/types'
import { MIN_INVESTMENT_AMOUNT } from 'config/defaults'

export const withdrawValidator = (
  amount: number | undefined,
  available: number = 0,
  minWithdraw: number = 0,
  maxWithdraw: number = Infinity
) => {
  let message: string | undefined
  if (amount === undefined) {
    message = `Required`
  } else if (amount === 0) {
    message = `Can't be zero`
  } else if (amount > available) {
    message = `Insufficient balance`
  } else if (amount < minWithdraw) {
    message = `Minimum amount is ${minWithdraw}`
  } else if (amount > maxWithdraw) {
    message = `Maximum amount is ${maxWithdraw}`
  }

  return { message }
}

export const depositCashFormValidationSchema = yup
  .object()
  .shape<DepositCashFormValues>({
    amount: yup
      .number()
      .required('This field is required')
      .min(MIN_INVESTMENT_AMOUNT, `Minimum amount is ${MIN_INVESTMENT_AMOUNT}`),
    asset: yup.string().required('This field is required'),
    otp: yup.string().required('This field is required')
  })

export const withdrawCashFormValidationSchema = yup
  .object()
  .shape<WithdrawCashFormValues>({
    amount: yup.number().nullable().required('This field is required'),
    bankAccountId: yup.string().nullable().required('This field is required'),
    otp: yup.string().nullable().required('This field is required'),
    memo: yup.string(),
    virtualAccount: yup.string().required('This field is required'),
    paymentMethodName: yup.string()
  })

export const depositDSFormValidationSchema = yup
  .object()
  .shape<DepositDSFormValues>({
    balanceId: yup.string().required('This field is required')
  })

export const withdrawDSFormValidationSchema = yup
  .object()
  .shape<WithdrawDSFormValues>({
    amount: yup.number().required('This field is required'),
    otp: yup.string().required('This field is required'),
    recipientWallet: yup.string().required('This field is required'),
    memo: yup.string()
  })

export const addressValidationSchema = yup.object().shape<AddressValues>({
  city: yup.string().required('This field is required'),
  country: yup.string().required('This field is required'),
  line1: yup.string().required('This field is required'),
  line2: yup.string(),
  postalCode: yup.string().required('This field is required'),
  state: yup.string()
})

export const bankFormValidationSchema = yup.object().shape<BankFormValues>({
  bankName: yup.string().required('This field is required'),
  accountHolderName: yup.string().required('This field is required'),
  asset: yup.string().required('This field is required'),
  bankAccountNumber: yup.string().required('This field is required'),
  swiftCode: yup.string().required('This field is required'),
  address: addressValidationSchema.required('This field is required')
})

export const withdrawValidationSchema = yup.object().shape({
  token: yup.string().required('This field is required'),
  addressType: yup.string(),
  existingAddress: yup.string().when('addressType', {
    is: (val: string) => val === 'existing',
    then: yup.string().required('This field is required'),
    otherwise: yup.string()
  }),
  newAddress: yup.string().when('addressType', {
    is: (val: string) => val === 'new',
    then: yup.string().required('This field is required'),
    otherwise: yup.string()
  }),
  amount: yup.number().required('This field is required'),
  memo: yup.string()
})
