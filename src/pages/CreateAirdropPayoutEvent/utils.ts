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
  type: string
  secToken: Option | null
  token: Option | null
  files: any[]
  memo: string
  payoutContractAddress?: string
  recordDate: string
  startDate: string
  endDate: string
}

export const availableInputsForEdit = (status = '', paid = false) => {
  const availableForEditing = {
    [PAYOUT_STATUS.DRAFT]: ['title', 'type', 'secToken', 'files', 'memo', 'recordDate', 'startDate', 'endDate'],
  } as Record<string, string[]>

  if (paid) return ['id', 'title', 'type', 'secToken', 'files', 'memo', 'recordDate', 'startDate', 'endDate']

  return availableForEditing[status] || availableForEditing[PAYOUT_STATUS.DRAFT]
}
