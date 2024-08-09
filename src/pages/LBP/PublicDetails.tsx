import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Portal from '@reach/portal'
import { useWeb3React } from '@web3-react/core'

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
import NotFound from './NotFound'
import styled from 'styled-components'

interface RouteParams {
  id: string
}

const PublicDetails: React.FC = () => {
  const { account, chainId } = useWeb3React()
  const { kyc } = useKYCState()
  const { id } = useParams<RouteParams>()
  const fetchLbpData = useGetLbp()
  const history = useHistory()
  const fetchLbpStatsData = useGetLbpStats()

  const [lbpData, setLbpData] = useState<LbpFormValues | null>(null)
  const [statsData, setStatsData] = useState<MarketData>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<boolean>(false)

  const isKycApproved = kyc?.status === KYCStatuses.APPROVED ?? false
  const network = lbpData?.network ?? ''
  const { isWrongChain, expectChain } = checkWrongChain(chainId, network)

  const loadData = async () => {
    try {
      const [lbpDataResponse, statsDataResponse] = await Promise.all([
        fetchLbpData(parseInt(id)),
        fetchLbpStatsData(parseInt(id)),
      ])

      setLbpData(lbpDataResponse)
      setStatsData(statsDataResponse)
    } catch (error) {
      setIsError(true)
      console.error('Error fetching LBP data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
        <LoaderWrapper>
          <Loader>
            <LoaderThin size={96} />
          </Loader>
        </LoaderWrapper>
      ) : (
        <>
          {isError ? (
            <NotFound />
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
      )}
    </>
  )
}

export default PublicDetails

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
`
