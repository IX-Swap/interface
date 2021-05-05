import { withdrawValidator } from 'app/pages/accounts/validation'
import { useFormContext } from 'react-hook-form'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { useAssetById } from 'hooks/asset/useAssetById'
import { useBankById } from 'app/pages/accounts/pages/banks/hooks/useBankById'
import { useBalancesByAssetId } from 'hooks/balance/useBalancesByAssetId'
import { getIdFromObj } from 'helpers/strings'
import { AssetBalance } from 'types/balance'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'

interface BalancesByBankIdReturnObj {
  canSubmit: boolean
}

export const useValidateWithdrawCash = (): BalancesByBankIdReturnObj => {
  const { watch, setError, clearErrors, errors, formState } = useFormContext<
    WithdrawCashFormValues
  >()
  const bankId = watch('bank')
  const amount = watch('amount')
  const virtualAccountId = watch('virtualAccount')

  const { data: bank, isSuccess: bankSuccess } = useBankById({ bankId })

  const assetId = getIdFromObj(bank?.currency)
  const { data: asset, isSuccess: assetSuccess } = useAssetById(assetId)
  const { data: balances, isSuccess: balancesSuccess } = useBalancesByAssetId(
    assetId
  )

  const {
    data: virtualAccountData,
    isSuccess: virtualAccountSuccess
  } = useVirtualAccount(virtualAccountId)

  if (bankSuccess && assetSuccess && balancesSuccess && virtualAccountSuccess) {
    if (bank !== undefined && asset !== undefined) {
      const assetId = bank.currency._id
      const balance: AssetBalance | undefined = balances.map[assetId]
      const minWithdraw = asset.amounts?.minimumWithdrawal
      const maxWithdraw =
        virtualAccountData?.balance.available ??
        asset.amounts?.maximumWithdrawal

      const { message } = withdrawValidator(
        amount,
        balance?.available,
        minWithdraw,
        maxWithdraw
      )
      const isValid = message === undefined
      const amountModified =
        formState.dirtyFields.amount === true ||
        formState.touched.amount === true

      if (!isValid && errors.amount === undefined && amountModified) {
        setError('amount', { message })
      }
      if (isValid && errors.amount !== undefined) {
        clearErrors('amount')
      }
      return { canSubmit: isValid }
    }
  }
  return { canSubmit: false }
}
