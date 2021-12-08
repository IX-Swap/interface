import { withdrawValidator } from 'app/pages/accounts/validation'
import { useFormContext } from 'react-hook-form'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { useAssetById } from 'hooks/asset/useAssetById'
import { useBankById } from 'app/pages/accounts/pages/banks/hooks/useBankById'
import { getIdFromObj } from 'helpers/strings'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'

interface BalancesByBankIdReturnObj {
  canSubmit: boolean
}

export const useValidateWithdrawCash = (): BalancesByBankIdReturnObj => {
  const { watch, setError, clearErrors, errors, formState } =
    useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bankAccountId')
  const amount = watch('amount', 0)
  const virtualAccountId = watch('virtualAccount')

  const { data: bank, isSuccess: bankSuccess } = useBankById({
    bankId: bankId ?? ''
  })

  const assetId = getIdFromObj(bank?.currency)
  const { data: asset, isSuccess: assetSuccess } = useAssetById(assetId)

  const { data: virtualAccountData, isSuccess: virtualAccountSuccess } =
    useVirtualAccount(virtualAccountId)

  if (bankSuccess && assetSuccess && virtualAccountSuccess) {
    if (
      bank !== undefined &&
      asset !== undefined &&
      virtualAccountData !== undefined
    ) {
      const balance = virtualAccountData?.balance.outstanding
      const minWithdraw = asset.amounts?.minimumWithdrawal
      const maxWithdraw = virtualAccountData?.balance.outstanding
      const { message } = withdrawValidator(
        amount ?? 0,
        balance,
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
