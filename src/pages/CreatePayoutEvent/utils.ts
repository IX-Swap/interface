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
  token: { label: string; value: number } | null
  files: any[]
}
