import { VettingFormValues } from "./types";

export const initialValues = {
  document: {},
  beneficialOwners: [{ id: 0 }],
  directors: [{ id: 0 }],
  fundingDocuments: []
} as unknown as VettingFormValues
