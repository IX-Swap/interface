import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import AdminHeader from 'components/LBP/Admin/AdminHeader'
import DetailsChart from 'components/LBP/PublicDetails/PublicChart'
import StatisticData from 'components/LBP/PublicDetails/StatisticData'
import InvestorInformation from 'components/LBP/Dashboard/InvestorInformation'
import Header from 'components/Header'
import { useGetLbp, useGetLbpStats } from 'state/lbp/hooks'
import { LbpFormValues, MarketData } from 'components/LBP/types'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Loader } from 'components/AdminTransactionsTable'

const AdminLbpDetail = () => {
  const { id } = useParams<{ id: string }>()
  const lbpId = parseInt(id)
  const fetchLbpData = useGetLbp()
  const fetchLbpStatsData = useGetLbpStats()
  const [lbpData, setLbpData] = useState<LbpFormValues | null>(null)
  const [statsData, setStatsData] = useState<MarketData>()
  const [loader, setLoader] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lbpDataResponse = await fetchLbpData(lbpId)
        const statsDataResponse = await fetchLbpStatsData(lbpId)
        setLbpData(lbpDataResponse)
        setStatsData(statsDataResponse)
        setLoader(false)
      } catch (error) {
        console.error('Error fetching LBP data:', error)
        setLoader(false)
      }
    }

    fetchData()
  }, [fetchLbpData, fetchLbpStatsData, id])

  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
  }

  return (
    <>
      <Header />
      <Wrapper>
        {loader ? (
          <Loader>
            <LoaderThin size={96} />
          </Loader>
        ) : (
          <>
            <AdminHeader
              lbpId={id}
              status={status || lbpData?.status || ''}
              lbpShareName={lbpData?.title}
              lbpShareLogo={lbpData?.logo}
              updateStatus={updateStatus}
              contractAddress={lbpData?.contractAddress}
            />
            <DetailsChart
              contractAddress={lbpData?.contractAddress}
              currentAssetReserve={statsData?.currentAssetReserve}
              currentShareReserve={statsData?.currentShareReserve}
              startDate={lbpData?.startDate}
              endDate={lbpData?.endDate}
              startWeight={lbpData?.startWeight}
              endWeight={lbpData?.endWeight}
              shareAmount={lbpData?.shareAmount}
              assetAmount={lbpData?.assetTokenAmount}
              chartWidth={1200}
            />
            <StatisticData isAdmin={true} statsData={statsData} lbpData={lbpData} />
            <InvestorInformation lbpId={lbpId} />
          </>
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.article`
  background: #ffffff;
  padding: 0px 100px;
  margin: 90px 200px 0px 200px;
  // width: 100%;
`

export default AdminLbpDetail
