import { PAYOUT_STATUS } from 'constants/enums'
import { Option } from 'hooks/useTokensList'

export const transformPayoutDraftDTO = ({ token, secToken, ...values }: any) => {
  return {
    ...values,
    ...(token && { payoutToken: token.isNative ? token.address : token.value }),
    ...(secToken && { secTokenId: secToken.value }),
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
  secToken: Option | null
  token: Option | null
  files: any[]
}

export const availableInputsForEdit = (status = '', paid = false) => {
  const availableForEditing = {
    [PAYOUT_STATUS.DRAFT]: [
      'id',
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
      'id',
      'title',
      'description',
      'tokenAmount',
      'recordDate',
      'startDate',
      'endDate',
      'token',
      'files',
    ],
    [PAYOUT_STATUS.SCHEDULED]: ['id', 'tokenAmount', 'title', 'description', 'startDate', 'endDate', 'files'],
    [PAYOUT_STATUS.DELAYED]: ['id', 'tokenAmount', 'title', 'description', 'startDate', 'endDate', 'files'],
    [PAYOUT_STATUS.STARTED]: ['id', 'title', 'description', 'endDate', 'files'],
    [PAYOUT_STATUS.ENDED]: [],
  } as Record<string, string[]>

  if (paid) return ['id', 'title', 'description', 'endDate', 'files']

  return availableForEditing[status] || availableForEditing[PAYOUT_STATUS.DRAFT]
}
