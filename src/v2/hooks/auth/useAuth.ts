import { useCachedUser } from 'v2/hooks/auth/useCachedUser'

export const useAuth = () => {
  const user = useCachedUser()

  return {
    isAuthenticated: true,
    user: user
  }
}
