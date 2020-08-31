import { generateMutationHook } from 'v2/helpers/generateMutationHook'
import { banksService } from 'v2/app/accounts/banks/service'

export const useCreateBank = generateMutationHook(
  banksService.createBank.bind(banksService)
)
