import { useFormContext } from 'react-hook-form'
import { useBalancesByAssetId } from 'hooks/balance/useBalancesByAssetId'
import { CommitmentFormValues } from 'types/commitment'
import { hasValue } from 'helpers/forms'

interface ValidatorReturnObj {
  isValid: boolean
  message?: string
}

export interface ValidatorProps {
  minInvestment: number | null
  assetId: string
}

export const useCommitmentValidator = (
  props: ValidatorProps
): ValidatorReturnObj => {
  const { assetId, minInvestment } = props
  const minimumUnits = minInvestment ?? 1

  const { watch, setError, clearErrors, errors, formState } =
    useFormContext<CommitmentFormValues>()
  const investmentUnits = watch('numberOfUnits') ?? 0
  const investmentAmount = watch('totalAmount') ?? 0

  const { data, isSuccess } = useBalancesByAssetId(assetId)

  if (data.list.length > 0 && isSuccess) {
    const availableAmount = data.map[assetId]?.available ?? 0

    let message

    if (investmentAmount > availableAmount) {
      message = 'Insufficient Balance'
    }
    if (investmentUnits < minimumUnits) {
      message = `Minimum investment is ${minimumUnits}`
    }

    const isValid = !hasValue(message)

    const numberOfUnitsModified =
      formState.dirtyFields.numberOfUnits === true ||
      formState.touched.numberOfUnits === true

    if (
      !isValid &&
      errors.numberOfUnits === undefined &&
      numberOfUnitsModified
    ) {
      setError('numberOfUnits', { message })
    }

    if (isValid && errors.numberOfUnits !== undefined) {
      clearErrors('numberOfUnits')
    }

    return {
      isValid,
      message: message === 'Insufficient Balance' ? message : undefined
    }
  }

  return { isValid: false, message: 'Insufficient Balance' }
}
