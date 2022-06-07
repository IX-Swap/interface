export const transformPayoutDraftDTO = (values: any) => {
  const { type, otherType, tokenId, secTokenId } = values

  return {
    ...values,
    type: type !== 'Other' ? type : otherType,
    tokenId: tokenId.value, // replace with id after metamask integration
    secTokenId: secTokenId.value,
    secTokenAmount: '100',
  }
}
