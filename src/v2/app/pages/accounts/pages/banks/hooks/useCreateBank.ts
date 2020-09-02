import { generateMutationHook } from 'v2/helpers/generateMutationHook'
import { banksService } from 'v2/app/pages/accounts/pages/banks/service'

export const useCreateBank = generateMutationHook(
  banksService.createBank.bind(banksService)
)
