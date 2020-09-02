import { banksService } from 'v2/app/pages/accounts/pages/banks/service'
import { generateMutationHook } from 'v2/helpers/generateMutationHook'

export const useWithdrawDS = generateMutationHook(
  banksService.withdrawDS.bind(banksService)
)
