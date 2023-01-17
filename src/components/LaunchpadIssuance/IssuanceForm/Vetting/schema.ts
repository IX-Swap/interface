import * as yup from 'yup'

const fileSchema = yup.mixed()

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true
  
  return value[0].size <= 5 * 1024 * 1024
})

const requriedFileSchema = limitedSizeFileSchema.required('File requried')


const directorSchema = yup.array(yup.object().shape({
  fullName: yup.string()
    .required('Full name required')
    .min(2, 'Full name should be at least 2 characters long'),

  proofOfIdentity: requriedFileSchema,
  proofOfAddress: requriedFileSchema
}))

export const schema = yup.object().shape({
  applicantFullName: yup.string().required('Enter applicant\'s name'),
  email: yup.string().email('Enter a valid email').required('Email required'),

  companyName: yup.string().required('Enter company name'),
  companyWebsite: yup.string().url('Enter valid URL').required('Enter company website URL'),

  description: yup.string()
    .required('Description requried')
    .min(10, 'Description should be at least 10 characters long'),

  document: yup.object().shape({
    pitchDeck: requriedFileSchema,
    fundingDocuments: yup.array(fileSchema),

    certificateOfIncorporation: requriedFileSchema,
    certificateOfIncumbency: limitedSizeFileSchema,

    shareDirectorRegistry: requriedFileSchema,
    auditedFinancials: limitedSizeFileSchema,

    memorandumArticle: requriedFileSchema,
    ownershipStructure: requriedFileSchema,

    resolutionAuthorizedSignatory: requriedFileSchema,
  }),

  beneficialOwners: directorSchema,
  directors: directorSchema,
})
