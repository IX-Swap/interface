export const transformPayoutDraftDTO = (values: any) => {
  const { token, secToken } = values

  return {
    ...values,
    payoutToken: token.isNative ? token.address : token.value,
    secTokenId: secToken.value,
  }
}
