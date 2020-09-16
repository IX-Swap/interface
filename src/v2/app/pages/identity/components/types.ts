import {
  IdentityProfile,
  IdentityFinancials,
  BaseIdentity,
  CorporateFields
} from 'v2/types/identity'
import { DocumentWithGuide } from 'v2/types/document'

export type IndividualIdentityFormValues = IdentityProfile &
  IdentityFinancials &
  Omit<
    BaseIdentity,
    '_id' | 'status' | 'user' | 'createdAt' | 'updatedAt' | 'documents'
  > & {
    documents: DocumentWithGuide[]
  }

export type CorporateIdentityFormValues = CorporateFields &
  Omit<
    BaseIdentity,
    '_id' | 'status' | 'user' | 'createdAt' | 'updatedAt' | 'documents'
  > & {
    documents: DocumentWithGuide[]
  }
