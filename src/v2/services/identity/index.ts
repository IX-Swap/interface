import { IndividualIdentity, CorporateIdentity } from 'v2/types/identity'
import {
  CreateCorporateIdentityArgs,
  CreateOrUpdateIndividualIdentityArgs,
  GetIndividualIdentityArgs,
  UpdateCorporateIdentityArgs
} from 'v2/services/identity/types'
import apiService from 'v2/services/api'
import { paginationArgs } from 'v2/config/defaults'
import { PaginatedData } from 'v2/services/api/types'

export const identityService = {
  async getIndividual (queryKey: string, args: GetIndividualIdentityArgs) {
    const { userId } = args
    const uri = `/identity/individuals/${userId}`

    return await apiService.get<IndividualIdentity>(uri)
  },

  async createOrUpdateIndividual (args: CreateOrUpdateIndividualIdentityArgs) {
    const { userId, ...identity } = args
    const uri = `/identity/individuals/${userId}`

    return await apiService.put<IndividualIdentity>(uri, identity)
  },

  async createCorporate (args: CreateCorporateIdentityArgs) {
    const { userId, ...identity } = args
    const uri = `/identity/corporates/${userId}`

    return await apiService.post<CorporateIdentity>(uri, identity)
  },

  async updateCorporate (args: UpdateCorporateIdentityArgs) {
    const { userId, id, ...identity } = args
    const uri = `/identity/corporates/${userId}/${id}`

    return await apiService.put<CorporateIdentity>(uri, identity)
  },

  async getAllCorporates (queryKey: string, args: GetIndividualIdentityArgs) {
    const { userId } = args
    const uri = `/identity/corporates/${userId}/list`

    return await apiService.post<PaginatedData<CorporateIdentity>>(
      uri,
      paginationArgs
    )
  }
}
