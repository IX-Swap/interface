export const transformPayoutDraftDTO = (values: any) => {
  const { type, otherType, token, secToken } = values

  return {
    ...values,
    type: type !== 'Other' ? type : otherType,
    payoutToken: token.isNative ? token.address : token.value,
    secTokenId: secToken.value,
    secTokenAmount: 100,
  }
}
