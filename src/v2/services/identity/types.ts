import { PaginationArgs } from 'v2/services/api/types'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'v2/app/pages/identity/components/types'

export interface GetIndividualIdentityArgs {
  userId: string
}

export interface GetAllCorporateIdentities extends PaginationArgs {
  userId: string
}

export type CreateOrUpdateIndividualIdentityArgs = (
  | Omit<IndividualIdentityFormValues, 'documents'>
  | Omit<CorporateIdentityFormValues, 'documents'>
) & {
  documents?: string[]
  userId: string
}

export type CreateCorporateIdentityArgs = Omit<
  CorporateIdentityFormValues,
  'documents'
> & {
  documents?: string[]
  userId: string
}

export type UpdateCorporateIdentityArgs = Omit<
  CorporateIdentityFormValues,
  'documents'
> & {
  documents?: string[]
  id: string
  userId: string
}
