import { useEffect } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { hasValue } from 'helpers/forms'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export type CapitalStructure = 'Equity' | 'Debt' | 'Hybrid' | 'Fund'

export const useDSOFilter = (
  type: 'insight' | 'commitments' | 'captable' = 'insight',
  status?: string,
  capitalStructure?: CapitalStructure
) => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  const { data, ...rest } = useDSOsByUserId(
    status,
    type === 'commitments' || type === 'captable',
    capitalStructure
  )

  const getPath = () => {
    if (type === 'commitments') {
      return IssuanceRoute.commitments
    }

    if (type === 'captable') {
      return IssuanceRoute.capTable
    }

    return IssuanceRoute.insight
  }

  useEffect(() => {
    if (!isValidDSOId(dsoId) && data.list.length > 0) {
      replace(
        generatePath(getPath(), {
          dsoId: data.list[0]._id,
          issuerId: data.list[0].user
        })
      )
    }
    // eslint-disable-next-line
  }, [dsoId, issuerId, data.list, replace, type])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      const [dso, issuer] = e.target.value?.split(':')
      replace(generatePath(getPath(), { dsoId: dso, issuerId: issuer }))
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
