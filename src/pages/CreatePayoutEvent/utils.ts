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
  payoutContractAddress?: string
  blockNumber?: number
  includeOriginSupply?: boolean
}

export const availableInputsForEdit = (status = '', paid = false) => {
  const availableForEditing = {
    [PAYOUT_STATUS.DRAFT]: [
      'title',
      'description',
      'type',
      'otherType',
      'secTokenAmount',
      'tokenAmount',
      'recordDate',
      'startDate',
      'endDate',
      'secToken',
      'token',
      'files',
      'includeOriginSupply',
      'blockNumber',
    ],
    [PAYOUT_STATUS.ANNOUNCED]: [
      'title',
      'description',
      'secTokenAmount',
      'tokenAmount',
      'recordDate',
      'startDate',
      'endDate',
      'token',
      'files',
    ],
    [PAYOUT_STATUS.SCHEDULED]: ['title', 'description', 'startDate', 'endDate', 'files'],
    [PAYOUT_STATUS.DELAYED]: ['title', 'description', 'startDate', 'endDate', 'files'],
    [PAYOUT_STATUS.STARTED]: ['title', 'description', 'endDate', 'files'],
    [PAYOUT_STATUS.ENDED]: [],
  } as Record<string, string[]>

  if (paid) return ['id', 'title', 'description', 'endDate', 'files']

  return availableForEditing[status] || availableForEditing[PAYOUT_STATUS.DRAFT]
}
