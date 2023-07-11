import * as yup from 'yup'
import { STRING_MIN, STRING_MAX, TEXT_MAX, TEXT_MIN } from 'components/LaunchpadIssuance/utils/TextField'

const getLongerThanOrEqual = (field: string, chars: number) => `${field} should have at least ${chars} characters`
const getHaveAtMost = (field: string, chars: number) => `${field} should have at most ${chars} characters`

const fileSchema = yup.mixed()

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true

  return value[0].size <= 5 * 1024 * 1024
})

const requiredFileSchema = limitedSizeFileSchema.required('File required')

const directorSchema = yup.array(
  yup.object().shape({
    fullName: yup
      .string()
      .nullable()
      .min(STRING_MIN, getLongerThanOrEqual('Full name', STRING_MIN))
      .max(STRING_MAX, getHaveAtMost('Full name', STRING_MAX))
      .required('Full name required'),

    proofOfIdentity: requiredFileSchema,
    proofOfAddress: requiredFileSchema,
  })
)

export const schema = yup.object().shape({
  applicantFullName: yup
    .string()
    .nullable()
    .min(STRING_MIN, getLongerThanOrEqual("Applicant's Full Name", STRING_MIN))
    .max(STRING_MAX, getHaveAtMost("Applicant's Full Name", STRING_MAX))
    .required("Enter applicant's name"),
  email: yup.string().email('Enter a valid email').nullable().required('Email required'),

  companyName: yup
    .string()
    .nullable()
    .min(STRING_MIN, getLongerThanOrEqual('Name of Company', STRING_MIN))
    .max(STRING_MAX, getHaveAtMost('Name of Company', STRING_MAX))
    .required('Enter company name'),
  companyWebsite: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter valid URL'
    )
    .nullable()
    .required('Enter company website URL'),

  description: yup
    .string()
    .min(TEXT_MIN, getLongerThanOrEqual('Description', TEXT_MIN))
    .max(TEXT_MAX, getHaveAtMost('Description', TEXT_MAX))
    .nullable()
    .required('Description required'),

  document: yup.object().shape({
    pitchDeck: requiredFileSchema,
    fundingDocuments: yup.array(fileSchema),

    certificateOfIncorporation: requiredFileSchema,
    certificateOfIncumbency: limitedSizeFileSchema,

    shareDirectorRegistry: requiredFileSchema,
    auditedFinancials: limitedSizeFileSchema,

    memorandumArticle: requiredFileSchema,
    ownershipStructure: requiredFileSchema,

    resolutionAuthorizedSignatory: requiredFileSchema,
  }),

  beneficialOwners: directorSchema,
  directors: directorSchema,
})
