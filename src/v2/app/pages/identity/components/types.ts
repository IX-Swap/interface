import {
  IdentityProfile,
  IdentityFinancials,
  BaseIdentity,
  CorporateFields
} from 'v2/types/identity'

export type IndividualIdentityFormValues = IdentityProfile &
  IdentityFinancials &
  Omit<BaseIdentity, '_id' | 'status' | 'user' | 'createdAt' | 'updatedAt'>

export type CorporateIdentityFormValues = CorporateFields &
  Omit<BaseIdentity, '_id' | 'status' | 'user' | 'createdAt' | 'updatedAt'>
