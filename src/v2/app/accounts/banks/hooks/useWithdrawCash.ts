import { banksService } from 'v2/app/accounts/banks/service'
import { generateMutationHook } from 'v2/helpers/generateMutationHook'

export const useWithdrawCash = generateMutationHook(
  banksService.withdrawCash.bind(banksService)
)
