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
      .required('Required')
      .min(MIN_INVESTMENT_AMOUNT, `Minimum amount is ${MIN_INVESTMENT_AMOUNT}`),
    asset: yup.string().required('Required'),
    otp: yup.string().required('Required')
  })

export const withdrawCashFormValidationSchema = yup
  .object()
  .shape<WithdrawCashFormValues>({
    amount: yup.number().nullable().required('Required'),
    bankAccountId: yup.string().nullable().required('Required'),
    otp: yup.string().nullable().required('Required'),
    memo: yup.string(),
    virtualAccount: yup.string().required('Required'),
    paymentMethodName: yup.string()
  })

export const depositDSFormValidationSchema = yup
  .object()
  .shape<DepositDSFormValues>({
    balanceId: yup.string().required('Required')
  })

export const withdrawDSFormValidationSchema = yup
  .object()
  .shape<WithdrawDSFormValues>({
    amount: yup.number().required('Required'),
    otp: yup.string().required('Required'),
    recipientWallet: yup.string().required('Required'),
    memo: yup.string()
  })

export const addressValidationSchema = yup.object().shape<AddressValues>({
  city: yup.string().required('Required'),
  country: yup.string().required('Required'),
  line1: yup.string().required('Required'),
  line2: yup.string(),
  postalCode: yup.string().required('Required'),
  state: yup.string()
})

export const bankFormValidationSchema = yup.object().shape<BankFormValues>({
  bankName: yup.string().required('Required'),
  accountHolderName: yup.string().required('Required'),
  asset: yup.string().required('Required'),
  bankAccountNumber: yup.string().required('Required'),
  swiftCode: yup.string().required('Required'),
  address: addressValidationSchema.required('Required')
})

export const withdrawValidationSchema = yup.object().shape({
  token: yup.string().required('Required'),
  addressType: yup.string(),
  existingAddress: yup.string().when('addressType', {
    is: (val: string) => val === 'existing',
    then: yup.string().required('Required'),
    otherwise: yup.string()
  }),
  newAddress: yup.string().when('addressType', {
    is: (val: string) => val === 'new',
    then: yup.string().required('Required'),
    otherwise: yup.string()
  }),
  amount: yup.number().required('Required'),
  memo: yup.string()
})
