import React, { useState, useEffect, useCallback } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import Column from 'components/Column'
import { PAYOUT_STATUS } from 'constants/enums'
import { useGetPayoutItem, usePayoutState, getPayoutClaims as getPayoutClaimsAsync } from 'state/payout/hooks'
import { PayoutEvent } from 'state/token-manager/types'
import { LoadingIndicator } from 'components/LoadingIndicator'

import { PayoutTimeline } from './Timeline/PayoutTimeline'
import { PayoutHeader } from './PayoutHeader'
import { PayoutActionBlock } from './ActionBlock'
import { PayoutHistory } from './History'
import { useUserState } from 'state/user/hooks'
import { routes } from 'utils/routes'

export default function PayoutItemForManager({
  match: {
    params: { payoutId },
  },
}: RouteComponentProps<{ payoutId: string }>) {
  const history = useHistory()
  const [cookies] = useCookies(['annoucementsSeen'])
  const [payout, setPayout] = useState<null | PayoutEvent>(null)
  const [page, setPage] = useState(1)
  const [claimHistory, setClaimHistory] = useState([])
  const [isClaimHistoryLoading, setIsClaimHistoryLoading] = useState(false)
  const [isMyPayout, setIsMyPayout] = useState<boolean | undefined>(undefined)
  const { loadingRequest } = usePayoutState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const { me } = useUserState()
  const getPayoutItemById = useGetPayoutItem()
  const isLoggedIn = !!token && !!account
  const status = PAYOUT_STATUS.STARTED
  
  const getPayoutItem = useCallback(
    async () => {
      const data = await getPayoutItemById(+payoutId)
      if (data?.id) {
        setPayout(data)
      }
    },
    [payoutId]
  )

  useEffect(() => {
    getPayoutItem()
  }, [payoutId, account])

  useEffect(() => {
    if (payout) {
      setIsMyPayout(payout.userId === me.id)
    }
  }, [payout, me])

  useEffect(() => {
    if (isMyPayout === false) {
      history.replace(routes.tokenManager('payout-events', null))
    }
  }, [isMyPayout])

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

  return (
    <Loadable loading={!isLoggedIn}>
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        {payout && (
          <Column style={{ gap: '40px' }}>
            <PayoutHeader payout={payout} isMyPayout={isMyPayout ?? false} />
            <PayoutTimeline payout={payout} />
            <PayoutActionBlock 
              payout={payout} 
              isMyPayout={isMyPayout ?? false}
              myAmount={1} 
              onUpdate={getPayoutItem} 
            />
            {[PAYOUT_STATUS.ENDED, PAYOUT_STATUS.STARTED].includes(status) && (
              <PayoutHistory
                isLoading={isClaimHistoryLoading}
                page={page}
                setPage={setPage}
                claimHistory={claimHistory}
              />
            )}
          </Column>
        )}
      </StyledBodyWrapper>
    </Loadable>
  )
}
