import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { withdrawValidator } from 'v2/app/pages/accounts/validation'
import { useFormContext } from 'react-hook-form'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'

interface BalancesByBankIdReturnObj {
  canSubmit: boolean
}

export const useValidateWithdrawCash = (): BalancesByBankIdReturnObj => {
  const { watch, setError, clearErrors, errors, formState } = useFormContext<
    WithdrawCashFormValues
  >()
  const bankId = watch('bank')
  const amount = watch('amount')

  const { data: banks, status: banksStatus } = useBanksData()
  const { data: balances, status: balancesStatus } = useAllBalances()

  if (balancesStatus === 'loading' || banksStatus === 'loading') {
    if (errors.amount !== undefined) {
      clearErrors('amount')
    }
    return { canSubmit: false }
  }

  const bank = banks.map[bankId]

  if (bank !== undefined) {
    const assetId = bank.currency._id
    const balance = balances.map[assetId]
    const { message } = withdrawValidator(amount, balance.available)

    if (
      message !== undefined &&
      errors.amount === undefined &&
      formState.touched.amount === true
    ) {
      setError('amount', { message })
    }

    return { canSubmit: message === undefined }
  }
  return { canSubmit: false }
}
