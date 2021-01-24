import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useDSORouter } from 'app/pages/invest/routers/dsoRouter'
import { DSOInvestorView } from 'app/components/DSO/components/DSOInvestorView'

export const ViewDSO = () => {
  const {
    params: { dsoId, issuerId }
  } = useDSORouter()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return <DSOInvestorView dso={data} />
}
