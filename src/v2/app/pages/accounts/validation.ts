import * as yup from 'yup'
import {
  DepositCashFormValues,
  DepositDSFormValues,
  WithdrawCashFormValues,
  WithdrawDSFormValues,
  AddressValues,
  BankFormValues
} from 'v2/app/pages/accounts/types'
import { DataroomFile, FormArrayElement } from 'v2/types/dataroomFile'

export const depositCashFormValidationSchema = yup
  .object()
  .shape<DepositCashFormValues>({
    amount: yup.number().required('Required'),
    asset: yup.string().required('Required'),
    otp: yup.string().required('Required')
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
  address: addressValidationSchema.required('Required'),
  supportingDocuments: yup
    .array<FormArrayElement<DataroomFile>>()
    .required('Required')
})
