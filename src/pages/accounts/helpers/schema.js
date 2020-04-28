import * as yup from 'yup'

const REQUIRED_ERR_MSG = 'This field is required.'

export const createBankAccountSchema = () =>
  yup.object().shape({
    bankName: yup.string().required(REQUIRED_ERR_MSG),
    accountHolderName: yup.string().required(REQUIRED_ERR_MSG),
    assetId: yup.string().required(REQUIRED_ERR_MSG),
    swiftCode: yup.string().required(REQUIRED_ERR_MSG),
    bankAddress: yup.object().shape({
      line1: yup.string().required(REQUIRED_ERR_MSG),
      line2: yup.string(),
      city: yup.string().required(REQUIRED_ERR_MSG),
      state: yup.string().required(REQUIRED_ERR_MSG),
      country: yup.string().required(REQUIRED_ERR_MSG),
      postalCode: yup.string().required(REQUIRED_ERR_MSG)
    })
  })
