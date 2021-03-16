import { useEffect } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { hasValue } from 'helpers/forms'
import { isValidDSOId } from 'helpers/isValidDSOId'

export const useDSOFilter = () => {
  const {
    replace,
    params: { dsoId, issuerId }
  } = useIssuanceRouter()
  const { data, ...rest } = useDSOsByUserId()

  useEffect(() => {
    if (!isValidDSOId(dsoId) && data.list.length > 0) {
      const { _id: dso, user: issuer } = data.list[0]

      console.log({ dsoId: dso, issuerId: issuer })
      replace('insight', { dsoId: dso, issuerId: issuer })
    }
  }, [dsoId, issuerId, data.list, replace])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      const [dso, issuer] = e.target.value?.split(':')

      console.log({ dsoId: dso, issuerId: issuer })
      replace('insight', { dsoId: dso, issuerId: issuer })
    }
  }

  const selected = isValidDSOId(dsoId) ? dsoId : null

  return {
    data,
    handleChange,
    selected,
    ...rest
  }
}
