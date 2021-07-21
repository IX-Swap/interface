export enum STOStatus {
  PENDING = 'PENDING',
  PASSED = 'PASSED',
}

export const STO_STATUS_CREATED = 'created'
export const STO_STATUS_APPROVED = 'approved'

export const getStoStatus = (status: string) => {
  if (status === STO_STATUS_APPROVED) return STOStatus.PASSED
  return STOStatus.PENDING
}
