import {
  IdentityProfile,
  IdentityFinancials,
  BaseIdentity,
  CorporateFields
} from 'v2/types/identity'
import { DataroomFileWithGuide } from 'v2/types/dataroomFile'

export type IndividualIdentityFormValues = IdentityProfile &
  IdentityFinancials &
  Omit<
    BaseIdentity,
    '_id' | 'status' | 'user' | 'createdAt' | 'updatedAt' | 'documents'
  > & {
    documents: DataroomFileWithGuide[]
  }

export type CorporateIdentityFormValues = CorporateFields &
  Omit<
    BaseIdentity,
    '_id' | 'status' | 'user' | 'createdAt' | 'updatedAt' | 'documents'
  > & {
    documents: DataroomFileWithGuide[]
  }
