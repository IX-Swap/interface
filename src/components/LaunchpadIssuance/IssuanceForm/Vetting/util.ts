import { SMART_CONTRACT_STRATEGIES } from "components/LaunchpadIssuance/types";
import { VettingFormValues } from "./types";

export const initialValues = {
  document: {},
  beneficialOwners: [],
  directors: [],
  fundingDocuments: []
} as unknown as VettingFormValues

export const defaultValues = {
  applicantFullName: '',
  beneficialOwners: [],

  companyName: '',
  companyWebsite: '',

  createdAt: new Date(),
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
  reasonRequested: '',
  smartContractStrategy: SMART_CONTRACT_STRATEGIES.original,
} as unknown as VettingFormValues
