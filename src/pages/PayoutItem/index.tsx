import React, { useState, useEffect, useCallback } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'

import Column from 'components/Column'
import { Loadable } from 'components/LoaderHover'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { MEDIA_WIDTHS } from 'theme'
import { useActiveWeb3React } from 'hooks/web3'

import { PAYOUT_STATUS } from 'constants/enums'
import { useUserState } from 'state/user/hooks'
import { useAuthState } from 'state/auth/hooks'
import { PayoutEvent } from 'state/token-manager/types'
import {
  useGetPayoutItem,
  usePayoutState,
  getPayoutClaims as getPayoutClaimsAsync,
  getMyPayoutAmount,
} from 'state/payout/hooks'

import { PayoutHistory } from './History'
import { PayoutHeader } from './PayoutHeader'
import { PayoutActionBlock } from './ActionBlock'
import { PayoutTimeline } from './Timeline/PayoutTimeline'
import { BodyWrapper } from 'pages/AppBody'
import MorePayoutEvents from './MoreEventBlock'
import { PAYOUT_TYPE } from 'components/TmPayoutEvents/constants'
import { BackButton, StyledArrowBack, BackText } from './PayoutItemManager'
import { routes } from 'utils/routes'
import ConnectWalletCard from 'components/NotAvailablePage/ConnectWalletCard'

export interface MyAmounts {
  poolTokens: number
  walletTokens: number
}

export default function PayoutItemForUser({
  match: {
    params: { payoutId },
  },
}: RouteComponentProps<{ payoutId: string }>) {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { me } = useUserState()
  const [payout, setPayout] = useState<null | PayoutEvent>(null)
  const [page, setPage] = useState(1)
  const [claimHistory, setClaimHistory] = useState([])
  const [isClaimHistoryLoading, setIsClaimHistoryLoading] = useState(false)
  const { loadingRequest } = usePayoutState()
  const { token } = useAuthState()
  const { account } = useActiveWeb3React()
  const getPayoutItemById = useGetPayoutItem()
  const isLoggedIn = !!token && !!account
  const status = PAYOUT_STATUS.STARTED
  const history = useHistory()
  const [myAmount, handleMyAmount] = useState(0)

  const getPayoutItem = useCallback(async () => {
    const data = await getPayoutItemById(+payoutId)
    if (data?.id) {
      setPayout(data)
    }
  }, [payoutId])

  const getMyAmount = async () => {
    if (!payout?.secTokenId) return
    const data = await getMyPayoutAmount(+payoutId)
    if (data) {
      handleMyAmount(+data.poolTokens + +data.walletTokens)
    }
  }

  useEffect(() => {
    getPayoutItem()
    getMyAmount()
  }, [payoutId, account, payout?.secTokenId])

  useEffect(() => {
    setIsClaimHistoryLoading(true)

    const getPayoutClaims = async () => {
      const data = await getPayoutClaimsAsync(+payoutId, { page, offset: 5 })
      if (data?.items.length > 0) {
        setClaimHistory(data)
      }
      setIsClaimHistoryLoading(false)
    }

    getPayoutClaims()
  }, [payoutId, page])

  const handleBackClick = () => {
    history.push(routes.userPayoutEvents)
  }

  if (!account) {
    return <ConnectWalletCard />
  }

  return (
    <Loadable loading={!isLoggedIn}>
      <LoadingIndicator noOverlay={true} isLoading={loadingRequest} />
      <BackButton style={{ top: '150px', left: '260px' }} onClick={handleBackClick}>
        <StyledArrowBack />
        <BackText>Back</BackText>
      </BackButton>

      {payout && <PayoutHeader payout={payout} isMyPayout={payout.userId === me.id} />}
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        {payout && (
          <Column style={{ gap: '65px' }}>
            {payout.type !== PAYOUT_TYPE.AIRDROPS && (
              <>
                <PayoutTimeline payout={payout} />
                <PayoutActionBlock payout={payout} isMyPayout={false} myAmount={myAmount} onUpdate={getPayoutItem} />
              </>
            )}

            {[PAYOUT_STATUS.ENDED, PAYOUT_STATUS.STARTED].includes(status) && (
              <PayoutHistory
                isLoading={isClaimHistoryLoading}
                page={page}
                setPage={setPage}
                claimHistory={claimHistory}
              />
            )}
            <MorePayoutEvents payoutId={+payoutId} />
          </Column>
        )}
      </StyledBodyWrapper>
    </Loadable>
  )
}

export const StyledBodyWrapper = styled(BodyWrapper)`
  background: transparent;
  box-shadow: none;
  width: 100%;
  max-width: 1358px;
  padding-top: 80px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 0px;
  }
`
