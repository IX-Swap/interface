import { generateMutationHook } from 'v2/helpers/generateMutationHook'
import { banksService } from 'v2/app/pages/accounts/pages/banks/service'

export const useDepositCash = generateMutationHook(
  banksService.depositCash.bind(banksService)
)
