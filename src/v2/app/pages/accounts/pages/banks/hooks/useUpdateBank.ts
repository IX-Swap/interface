import { generateMutationHook } from 'v2/helpers/generateMutationHook'
import { banksService } from 'v2/app/pages/accounts/pages/banks/service'

export const useUpdateBank = generateMutationHook(
  banksService.updateBank.bind(banksService)
)
