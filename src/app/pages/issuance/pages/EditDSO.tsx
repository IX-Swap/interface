import React from 'react'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { DSO } from 'app/pages/issuance/components/DSO'

export const EditDSO = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  return <DSO dsoId={dsoId} isEditing />
}
