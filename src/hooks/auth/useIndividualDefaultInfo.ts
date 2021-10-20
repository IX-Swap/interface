import { useAuth } from 'hooks/auth/useAuth'

export const useIndividualDefaultInfo = (root: string | undefined) => {
  const { user } = useAuth()
  const isRepresentative = root?.startsWith('representatives') ?? false
  const noRoot = root === undefined
  const shouldUserIndividualInfo = noRoot || isRepresentative
  const names = user?.name?.split(' ') ?? []

  return {
    email: shouldUserIndividualInfo ? user?.email : undefined,
    firstName: shouldUserIndividualInfo ? names[0] : undefined,
    lastName: shouldUserIndividualInfo
      ? names.length > 1
        ? names[names.length - 1]
        : ''
      : undefined,
    middleName: shouldUserIndividualInfo
      ? names.length > 2
        ? names.slice(1, names.length - 1).join(' ')
        : undefined
      : undefined,
    isDisabled: shouldUserIndividualInfo
  }
}
