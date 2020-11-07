import { useWatch } from 'react-hook-form'
import { AuthorizerFormValues } from 'v2/app/pages/authorizer/components/AuthorizerForm'
import {
  useApproveOrReject,
  UseApproveOrRejectArgs
} from './useApproveOrReject'

export const useAuthorizerAction = (
  args: Omit<UseApproveOrRejectArgs, 'payload'>
) => {
  const payload = useWatch<AuthorizerFormValues>({
    name: ['comment', 'sharedWithUser']
  })

  return useApproveOrReject({ ...args, payload })
}
