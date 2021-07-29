import { useEffect } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { hasValue } from 'helpers/forms'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export const useDSOFilter = (type: 'insight' | 'commitments' = 'insight') => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  const { data, ...rest } = useDSOsByUserId(undefined, type === 'commitments')

  useEffect(() => {
    if (!isValidDSOId(dsoId) && data.list.length > 0) {
      replace(
        generatePath(
          type === 'insight'
            ? IssuanceRoute.insight
            : IssuanceRoute.commitments,
          {
            dsoId: data.list[0]._id,
            issuerId: data.list[0].user
          }
        )
      )
    }
  }, [dsoId, issuerId, data.list, replace, type])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      const [dso, issuer] = e.target.value?.split(':')
      replace(
        generatePath(
          type === 'insight'
            ? IssuanceRoute.insight
            : IssuanceRoute.commitments,
          { dsoId: dso, issuerId: issuer }
        )
      )
    }
  }

  const selected = isValidDSOId(dsoId) ? [dsoId, issuerId].join(':') : null

  return {
    data,
    handleChange,
    selected,
    ...rest
  }
}
