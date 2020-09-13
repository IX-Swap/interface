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

export type CreateOrUpdateIndividualIdentityArgs = IndividualIdentityFormValues & {
  userId: string
}

export type CreateCorporateIdentityArgs = CorporateIdentityFormValues & {
  userId: string
}

export type UpdateCorporateIdentityArgs = CorporateIdentityFormValues & {
  id: string
  userId: string
}
