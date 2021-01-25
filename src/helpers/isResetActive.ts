export const isResetActive = (isResetActive: boolean, resetExpiresOn: Date) => {
  return isResetActive && resetExpiresOn > new Date()
}
