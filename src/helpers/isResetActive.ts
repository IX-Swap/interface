export const isResetActive = (isActive: boolean, resetExpiresOn: Date) => {
  return isActive && resetExpiresOn > new Date()
}
