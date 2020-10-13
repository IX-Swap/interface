import React from 'react'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useDSOById } from '../hooks/useDSOById'
import { useInvestListRouter } from 'v2/app/pages/invest/investListRouter'

export const InvestView = () => {
  const {
    params: { dsoId, issuerId }
  } = useInvestListRouter()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading) {
    return null
  }

  return <DSOForm data={data} />
}
