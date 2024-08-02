import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Portal from '@reach/portal'
import { useWeb3React } from 'connection/web3reactShim'

import Background from 'components/LBP/PublicDetails/Background'
import MiddleSection from 'components/LBP/PublicDetails/MiddleSection'
import { useGetLbp, useGetLbpStats } from 'state/lbp/hooks'
import { LbpFormValues, MarketData } from 'components/LBP/types'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Loader } from 'components/AdminTransactionsTable'
import { useKYCState } from 'state/kyc/hooks'
import { KYCStatuses } from 'pages/KYC/enum'
import { checkWrongChain } from 'chains'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'

interface RouteParams {
  id: string
}

const PublicDetails: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const { kyc } = useKYCState()
  const { id } = useParams<RouteParams>()
  const fetchLbpData = useGetLbp()
  const fetchLbpStatsData = useGetLbpStats()
  const [lbpData, setLbpData] = useState<LbpFormValues | null>(null)
  const [statsData, setStatsData] = useState<MarketData>()
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  const isKycApproved = kyc?.status === KYCStatuses.APPROVED ?? false
  const network = lbpData?.network ?? ''
  const { isWrongChain, expectChain } = checkWrongChain(chainId, network)

  useEffect(() => {
    const loadData = async () => {
      try {
        const lbpDataResponse = await fetchLbpData(parseInt(id))
        const statsDataResponse = await fetchLbpStatsData(parseInt(id))

        setLbpData(lbpDataResponse)
        setStatsData(statsDataResponse)
      } catch (error) {
        console.error('Error fetching LBP data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [fetchLbpData, fetchLbpStatsData, id])

  useEffect(() => {
    if (!isLoading && (!account || !isKycApproved)) {
      history.push(`/kyc/`)
    }
  }, [isLoading, account, isKycApproved, history])

  return (
    <>
      {isLoading ? (
        <Loader>
          <LoaderThin size={96} />
        </Loader>
      ) : (
        <>
          <Background currentSharePriceUSD={statsData?.currentSharePriceUSD} lbpData={lbpData} />
          <MiddleSection statsData={statsData} lbpData={lbpData} />
          {isWrongChain ? (
            <Portal>
              <CenteredFixed width="100vw" height="100vh">
                <NetworkNotAvailable expectChain={expectChain} />
              </CenteredFixed>
            </Portal>
          ) : null}
        </>
      )}
    </>
  )
}

export default PublicDetails
