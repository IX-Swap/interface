import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Background from 'components/LBP/PublicDetails/Background'
import MiddleSection from 'components/LBP/PublicDetails/MiddleSection'
import { useGetLbp } from 'state/lbp/hooks'
import { LbpFormValues } from 'components/LBP/types'

interface RouteParams {
  id: string
}

export default function PublicDetails() {
  const { id } = useParams<RouteParams>()
  const getLbps = useGetLbp()
  const [lbpData, setLbpData] = useState<LbpFormValues | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLbps(parseInt(id))
        setLbpData(data)
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchData()
  }, [getLbps, id])

  return (
    <>
      <Background lbpData={lbpData} />
      <MiddleSection lbpData={lbpData} />
    </>
  )
}
