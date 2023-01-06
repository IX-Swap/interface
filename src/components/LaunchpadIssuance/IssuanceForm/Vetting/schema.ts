import * as yup from 'yup'

const fileSchema = yup.mixed()

const limitedSizeFileSchema = fileSchema.test('fileSize', 'File is too large', (value) => {
  if (!value?.length) return true
  
  return value[0].size <= 5 * 1024 * 1024
})

const directorSchema = yup.object().shape({
  fullName: yup.string().required('Full name required'),
  proofOfIdentity: fileSchema,
  proofOfAddress: fileSchema
})

export const schema = yup.object().shape({
  applicantFullname: yup.string().required('Enter applicant\'s name'),
  email: yup.string().email('Enter a valid email').required('Email required'),

  companyName: yup.string().required('Enter company name'),
  companyWebsite: yup.string().url('Enter valid URL').required('Enter company website URL'),

  description: yup.string().required('Description requried'),

  pitchDeck: fileSchema,
  fundingDocuments: yup.array(fileSchema),

  certificateOfIncorporation: limitedSizeFileSchema,
  certificateOfIncumbency: fileSchema,

  shareDirectorRegistry: limitedSizeFileSchema,
  auditedFinancials: fileSchema,

  memorandumArticle: limitedSizeFileSchema,
  ownershipStructure: fileSchema,

  resolutionAuthorizedSignatory: fileSchema,

  beneficialOwners: directorSchema,
  directors: directorSchema,
})
