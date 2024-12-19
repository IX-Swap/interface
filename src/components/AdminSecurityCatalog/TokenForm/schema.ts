import * as yup from 'yup'

const FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

export const selectSchema = yup
  .object({
    value: yup.string().required('Network value is required'),
    label: yup.string().required('Network label is required'),
  })
  .nullable()

export const validationSchema = yup.object().shape({
  logo: yup
    .mixed()
    .required('Logo is required')
    .test('fileSize', 'File too large. Maximum size is 2MB.', (value) => !value || (value && value.size <= FILE_SIZE))
    .test(
      'fileFormat',
      'Unsupported file format. Only JPG, PNG, and GIF are allowed.',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
  companyName: yup.string().required('Company name is required'),
  url: yup.string().url('Invalid URL').required('URL is required'),
  industry: selectSchema.required('Industry is required'),
  country: selectSchema.required('Country is required'),
  description: yup.string().required('Description is required'),
  withdrawFee: yup.number().required('Withdraw fee is required'),
  withdrawFeeAddress: yup.string().required('Withdraw fee address is required'),
  needsWhitelisting: yup.boolean().required(),
  whitelistPlatform: selectSchema.when('needsWhitelisting', {
    is: true, // When the switch is on (true)
    then: selectSchema.required('Whitelist Platform is required'), // Validate this field
    otherwise: selectSchema.nullable(), // If the switch is off, no validation
  }),
  whitelistContractAddress: yup.string().when('needsWhitelisting', {
    is: true, // When the switch is on (true)
    then: yup.string().required('Whitelist Contract Address is required'), // Validate this field
    otherwise: yup.string().nullable(), // If the switch is off, no validation
  }),
  custodyVaultId: yup.string().required('Custody Vault ID is required'),
  custodyAssetId: yup.string().required('Custody Asset ID is required'),
  custodyAssetAddress: yup.string().required('Custody Asset Address is required'),
})
