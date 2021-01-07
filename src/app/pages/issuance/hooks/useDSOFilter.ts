import { useEffect } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { hasValue } from 'helpers/forms'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export const useDSOFilter = () => {
  const params = useParams<{ dsoId: string }>()
  const { replace } = useHistory()
  const { data, ...rest } = useDSOsByUserId()

  useEffect(() => {
    if (!isValidDSOId(params.dsoId) && data.list.length > 0) {
      replace(generatePath(IssuanceRoute.insight, { dsoId: data.list[0]._id }))
    }
  }, [params.dsoId, data.list, replace])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      replace(generatePath(IssuanceRoute.insight, { dsoId: e.target.value }))
    }
  }

  const selected = isValidDSOId(params.dsoId) ? params.dsoId : null

  return {
    data,
    handleChange,
    selected,
    ...rest
  }
}
