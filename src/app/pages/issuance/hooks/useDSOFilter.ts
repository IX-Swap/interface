import { useEffect } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { hasValue } from 'helpers/forms'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export const useDSOFilter = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  const { data, ...rest } = useDSOsByUserId()

  useEffect(() => {
    if (!isValidDSOId(dsoId) && data.list.length > 0) {
      replace(
        generatePath(IssuanceRoute.insight, {
          dsoId: data.list[0]._id,
          issuerId: data.list[0]._id
        })
      )
    }
  }, [dsoId, issuerId, data.list, replace])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      const [dso, issuer] = e.target.value?.split(':')

      replace(
        generatePath(IssuanceRoute.insight, { dsoId: dso, issuerId: issuer })
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
