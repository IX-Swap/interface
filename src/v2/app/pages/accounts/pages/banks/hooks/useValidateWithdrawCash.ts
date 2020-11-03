import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { AssetBalance } from 'v2/types/balance'
import { Bank } from 'v2/types/bank'
import { withdrawValidator } from 'v2/app/pages/accounts/validation'

interface BalancesByBankIdReturnObj {
  error?: string
  isLoading: boolean
  data?: {
    bank: Bank
    balance: AssetBalance
  }
}

export const useValidateWithdrawCash = (
  bankId: string,
  amount: number | undefined
): BalancesByBankIdReturnObj => {
  const { data: banks, status: banksStatus } = useBanksData()
  const { data: balances, status: balancesStatus } = useAllBalances()

  if (balancesStatus === 'loading' || banksStatus === 'loading') {
    return {
      isLoading: true,
      data: undefined,
      error: undefined
    }
  }

  const bank = banks.map[bankId]

  if (bank !== undefined) {
    const assetId = bank.currency._id
    const balance = balances.map[assetId]
    const { message } = withdrawValidator(amount, balance.available)

    return {
      isLoading: false,
      data: { balance, bank },
      error: message
    }
  }
  return {
    isLoading: false,
    data: undefined,
    error: undefined
  }
}
