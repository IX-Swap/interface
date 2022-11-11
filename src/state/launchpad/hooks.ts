import { useUserState } from "state/user/hooks"

export const useGetKYCStatus = () => {
  const { me, k } = useUserState()

  me.
}