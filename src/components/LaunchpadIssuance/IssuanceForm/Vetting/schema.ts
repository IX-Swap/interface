import * as yup from 'yup'

const fileSchema = yup.mixed()

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true

  return value[0].size <= 5 * 1024 * 1024
})

const requiredFileSchema = limitedSizeFileSchema.required('File required')

const directorSchema = yup.array(
  yup.object().shape({
    fullName: yup.string().required('Full name required').min(2, 'Full name should be at least 2 characters long'),

    proofOfIdentity: requiredFileSchema,
    proofOfAddress: requiredFileSchema,
  })
)

export const schema = yup.object().shape({
  applicantFullName: yup.string().nullable().required("Enter applicant's name"),
  email: yup.string().email('Enter a valid email').nullable().required('Email required'),

  companyName: yup.string().nullable().required('Enter company name'),
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
    .min(10, 'Description should be at least 10 characters long')
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
