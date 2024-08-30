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
  title: string
  type: string
  secToken: Option | null
  token: Option | null
  files: any[]
  memo: string
  payoutContractAddress?: string
  recordDate: string
  startDate: string
  endDate: string
  csvRows: string[][]
  tokenAmount: number
}

export const availableInputsForEdit = (status = '', paid = false) => {
  const availableForEditing = {
    [PAYOUT_STATUS.DRAFT]: ['title', 'type', 'secToken', 'files', 'memo', 'recordDate', 'startDate', 'endDate', 'token', 'tokenAmount'],
  } as Record<string, string[]>

  if (paid) return ['id', 'title', 'type', 'secToken', 'files', 'memo', 'recordDate', 'startDate', 'endDate', 'token', 'tokenAmount']

  return availableForEditing[status] || availableForEditing[PAYOUT_STATUS.DRAFT]
}
