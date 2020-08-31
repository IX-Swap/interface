import * as yup from 'yup'
import {
  DepositCashFormValues,
  DepositDSFormValues,
  WithdrawCashFormValues,
  WithdrawDSFormValues,
  AddressValues,
  BankFormValues
} from 'v2/app/accounts/types'

export const depositCashFormValidationSchema = yup
  .object()
  .shape<DepositCashFormValues>({
    amount: yup.number().required('Required'),
    asset: yup.string().required('Required'),
    otp: yup.string().min(6).max(6).required('Required')
  })

export const withdrawCashFormValidationSchema = yup
  .object()
  .shape<WithdrawCashFormValues>({
    amount: yup.number().required('Required'),
    bank: yup.string().required('Required'),
    otp: yup.string().required('Required'),
    memo: yup.string()
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
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  line1: yup.string().required('Address line 1 is required'),
  line2: yup.string(),
  postalCode: yup.string().required('Postal Code is required'),
  state: yup.string().required('State is required')
})

export const bankFormValidationSchema = yup.object().shape<BankFormValues>({
  bankName: yup.string().required('Bank Name is required'),
  accountHolderName: yup.string().required('Account Holder Name is required'),
  asset: yup.string().required('Asset is required'),
  bankAccountNumber: yup.string().required('Bank Account Number is required'),
  swiftCode: yup.string().required('Swift Code is required'),
  address: addressValidationSchema.required()
})
