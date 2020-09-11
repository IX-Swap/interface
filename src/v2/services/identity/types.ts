import { PaginationArgs } from 'v2/services/api/types'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'

export interface GetIndividualIdentityArgs {
  userId: string
}

export interface GetAllCorporateIdentities extends PaginationArgs {
  userId: string
}

export type CreateOrUpdateIndividualIdentityArgs = IndividualIdentityFormValues & {
  userId: string
}
