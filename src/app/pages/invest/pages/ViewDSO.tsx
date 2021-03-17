import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'
import { DSOInvestorView } from 'app/components/DSO/components/DSOInvestorView'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return <DSOInvestorView dso={data} />
}
