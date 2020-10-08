import React from 'react'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useParams } from 'react-router-dom'
import { useDSOById } from '../hooks/useDSOById'

const InvestView = () => {
  const { dsoId, issuerId } = useParams<{
    dsoId: string
    issuerId: string
  }>()
  const { isLoading, data } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return <DSOForm data={data} />
}

export default InvestView
