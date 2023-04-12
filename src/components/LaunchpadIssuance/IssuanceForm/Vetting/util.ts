import { SMART_CONTRACT_STRATEGIES } from 'components/LaunchpadIssuance/types'
import { VettingFormValues } from './types'

export const initialValues = {
  smartContractStrategy: SMART_CONTRACT_STRATEGIES.original,
  applicantFullName: null,
  email: null,
  companyName: null,
  companyWebsite: null,
  description: null,
  document: {
    pitchDeck: null,

    certificateOfIncorporation: null,
    certificateOfIncumbency: null,

    shareDirectorRegistry: null,
    auditedFinancials: null,

    memorandumArticle: null,
    ownershipStructure: null,

    resolutionAuthorizedSignatory: null,
  },
  beneficialOwners: [
    {
      fullName: null,
      proofOfIdentity: null,
      proofOfAddress: null,
    },
  ],
  directors: [
    {
      fullName: null,
      proofOfIdentity: null,
      proofOfAddress: null,
    },
  ],
  fundingDocuments: [],
} as unknown as VettingFormValues

export const defaultValues = {
  applicantFullName: '',
  beneficialOwners: [],

  companyName: '',
  companyWebsite: '',

  description: '',

  directors: [],

  document: {
    pitchDeck: null,

    certificateOfIncorporation: null,
    certificateOfIncumbency: null,

    shareDirectorRegistry: null,
    auditedFinancials: null,

    memorandumArticle: null,
    ownershipStructure: null,

    resolutionAuthorizedSignatory: null,
  },
  fundingDocuments: [],

  email: '',
  smartContractStrategy: SMART_CONTRACT_STRATEGIES.original,
} as unknown as VettingFormValues
