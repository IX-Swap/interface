import { useAuth } from 'v2/hooks/auth/useAuth'

export const useIndividualInfoDefaultEmail = (root: string | undefined) => {
  const { user } = useAuth()
  const isRepresentative = root?.startsWith('representatives') ?? false
  const noRoot = root === undefined
  const shouldUseUserEmail = noRoot || isRepresentative

  return {
    email: shouldUseUserEmail ? user?.email : undefined,
    isDisabled: shouldUseUserEmail
  }
}
