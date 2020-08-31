import { generateMutationHook } from 'v2/helpers/generateMutationHook'
import { banksService } from 'v2/app/accounts/banks/service'

export const useUpdateBank = generateMutationHook(
  banksService.updateBank.bind(banksService)
)
