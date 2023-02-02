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
} as unknown as VettingFormValues
