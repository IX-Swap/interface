import { useWatch } from 'react-hook-form'
import { AuthorizerFormValues } from 'v2/app/pages/authorizer/components/AuthorizerForm'
import { useApproveOrReject } from './useApproveOrReject'

export const useAuthorizerAction = (
  id: string,
  action: 'approve' | 'reject'
) => {
  const payload = useWatch<AuthorizerFormValues>({
    name: ['comment', 'sharedWithUser']
  })

  return useApproveOrReject(id, action, payload)
}
