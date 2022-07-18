import { PAYOUT_STATUS } from 'constants/enums'

export const transformPayoutDraftDTO = (values: any) => {
  const { token, secToken } = values

  return {
    ...values,
    payoutToken: token.isNative ? token.address : token.value,
    secTokenId: secToken.value,
  }
}

export interface FormValues {
  id: string
  title: string
  description: string
  type: string
  otherType?: string
  secTokenAmount: string
  tokenAmount: string
  recordDate: string
  startDate: string
  endDate: string
  secToken: { label: string; value: number } | null
  token: { label: string; value: string } | null
  files: any[]
}

export const availableInputsForEdit = (status = '', paid = false) => {
  const availableForEditing = {
    [PAYOUT_STATUS.DRAFT]: [
      'title',
      'description',
      'type',
      'otherType',
      'tokenAmount',
      'recordDate',
      'startDate',
      'endDate',
      'secToken',
      'token',
      'files',
    ],
    [PAYOUT_STATUS.ANNOUNCED]: [
      'title',
      'description',
      'tokenAmount',
      'recordDate',
      'startDate',
      'endDate',
      'token',
      'files',
    ],
    [PAYOUT_STATUS.STARTED]: ['title', 'description', 'endDate', 'files'],
    [PAYOUT_STATUS.DELAYED]: ['title', 'description', 'startDate', 'endDate', 'files'],
    [PAYOUT_STATUS.ENDED]: [],
  } as Record<string, string[]>

  if (status === PAYOUT_STATUS.SCHEDULED) {
    if (paid) return ['title', 'description', 'endDate', 'files']
    return ['title', 'description', 'startDate', 'endDate', 'files']
  }

  return availableForEditing[status] || availableForEditing[PAYOUT_STATUS.DRAFT]
}
