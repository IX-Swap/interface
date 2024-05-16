import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Background from 'components/LBP/PublicDetails/Background'
import MiddleSection from 'components/LBP/PublicDetails/MiddleSection'
import { useGetLbp, useGetLbpStats } from 'state/lbp/hooks'
import { LbpFormValues, MarketData } from 'components/LBP/types'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Loader } from 'components/AdminTransactionsTable'

interface RouteParams {
  id: string
}

const PublicDetails: React.FC = () => {
  const { id } = useParams<RouteParams>()
  const fetchLbpData = useGetLbp()
  const fetchLbpStatsData = useGetLbpStats()
  const [lbpData, setLbpData] = useState<LbpFormValues | null>(null)
  const [statsData, setStatsData] = useState<MarketData>()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const lbpDataResponse = await fetchLbpData(parseInt(id))
        const statsDataResponse = await fetchLbpStatsData(parseInt(id))

        setLbpData(lbpDataResponse)
        setStatsData(statsDataResponse)
        setLoader(false)
      } catch (error) {
        console.error('Error fetching LBP data:', error)
        setLoader(false)
      }
    }

    loadData()
  }, [fetchLbpData, fetchLbpStatsData, id, history])

  return (
    <>
      {loader ? (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      ) : (
        <>
          <Background currentSharePriceUSD={statsData?.currentSharePriceUSD} lbpData={lbpData} />
          <MiddleSection statsData={statsData} lbpData={lbpData} />
        </>
      )}
    </>
  )
}

export default PublicDetails
