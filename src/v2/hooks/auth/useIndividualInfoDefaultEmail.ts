import { useAuth } from 'v2/hooks/auth/useAuth'

export const useIndividualInfoDefaultEmail = (root: string | undefined) => {
  const { user } = useAuth()
  const isRepresentative = root === 'representatives[0]'
  const noRoot = root === undefined
  const shouldUseUserEmail = noRoot || isRepresentative

  return {
    email: shouldUseUserEmail ? user?.email : '',
    isDisabled: shouldUseUserEmail
  }
}
