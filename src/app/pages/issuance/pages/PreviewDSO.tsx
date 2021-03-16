import React from 'react'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { DSOPreview } from 'app/components/DSO/DSOPreview/DSOPreview'

export const PreviewDSO = () => {
  const {
    params: { dsoId, issuerId }
  } = useIssuanceRouter()

  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return <DSOPreview data={data} showAuthorizations />
}
