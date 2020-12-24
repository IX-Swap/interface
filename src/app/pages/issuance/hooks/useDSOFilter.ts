import { useEffect } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { hasValue } from 'helpers/forms'

const isValidId = (dsoId: any) => hasValue(dsoId) && dsoId !== ':dsoId'

export const useDSOFilter = () => {
  const {
    replace,
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, ...rest } = useDSOsByUserId()

  useEffect(() => {
    if (!isValidId(dsoId) && data.list.length > 0) {
      replace('insight', { dsoId: data.list[0]._id })
    }
  }, [dsoId, data.list, replace])

  const handleChange = (e: any) => {
    if (hasValue(e.target.value)) {
      replace('insight', { dsoId: e.target.value })
    }
  }

  const selected = isValidId(dsoId) ? dsoId : null

  return {
    data,
    handleChange,
    selected,
    ...rest
  }
}
