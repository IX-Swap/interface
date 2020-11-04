import { withdrawValidator } from 'v2/app/pages/accounts/validation'
import { useFormContext } from 'react-hook-form'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { useAssetById } from 'v2/hooks/asset/useAssetById'
import { useBankById } from './useBankById'
import { useBalancesByAssetId } from 'v2/hooks/balance/useBalancesByAssetId'
import { getIdFromObj } from 'v2/helpers/strings'

interface BalancesByBankIdReturnObj {
  canSubmit: boolean
}

export const useValidateWithdrawCash = (): BalancesByBankIdReturnObj => {
  const { watch, setError, clearErrors, errors, formState } = useFormContext<
    WithdrawCashFormValues
  >()
  const bankId = watch('bank')
  const amount = watch('amount')

  const { data: bank, isSuccess: bankSuccess } = useBankById({ bankId })

  const assetId = getIdFromObj(bank?.currency)
  const { data: asset, isSuccess: assetSuccess } = useAssetById(assetId)
  const { data: balances, isSuccess: balancesSuccess } = useBalancesByAssetId(
    assetId
  )

  if (!bankSuccess || !assetSuccess || !balancesSuccess) {
    return { canSubmit: false }
  }

  if (bank !== undefined && asset !== undefined) {
    const assetId = bank.currency._id
    const balance = balances.map[assetId]
    const minWithdraw = asset.amounts?.minimumWithdrawal
    const maxWithdraw = asset.amounts?.maximumWithdrawal

    const { message } = withdrawValidator(
      amount,
      balance.available,
      minWithdraw,
      maxWithdraw
    )
    const canSubmit = message === undefined

    console.log(balance.available, bank, asset)
    if (
      !canSubmit &&
      errors.amount === undefined &&
      (formState.dirtyFields.amount === true ||
        formState.touched.amount === true)
    ) {
      setError('amount', { message })
    }
    if (canSubmit && errors.amount !== undefined) {
      clearErrors('amount')
    }
    return { canSubmit }
  }

  return { canSubmit: false }
}
