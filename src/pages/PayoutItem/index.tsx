import React, { useState, useEffect, useMemo } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import Column from 'components/Column'
import { PAYOUT_STATUS } from 'constants/enums'
import { useUserState } from 'state/user/hooks'
import { useGetPayoutItem, usePayoutState } from 'state/payout/hooks'
import { PayoutEvent } from 'state/token-manager/types'
import { LoadingIndicator } from 'components/LoadingIndicator'

import { PayoutTimeline } from './Timeline/PayoutTimeline'
import { PayoutHeader } from './PayoutHeader'
import { PayoutActionBlock } from './ActionBlock'
import { PayoutHistory } from './History'

export default function PayoutItem({
  match: {
    params: { payoutId },
  },
}: RouteComponentProps<{ payoutId: string }>) {
  const [cookies] = useCookies(['annoucementsSeen'])
  const [payout, setPayout] = useState<null | PayoutEvent>(null)
  const { loadingRequest } = usePayoutState()
  const { me } = useUserState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const getPayoutItemById = useGetPayoutItem()
  const isLoggedIn = !!token && !!account
  const status = PAYOUT_STATUS.STARTED

  useEffect(() => {
    const getPayoutItem = async () => {
      const data = await getPayoutItemById(+payoutId)
      if (data?.id) {
        setPayout(data)
      }
    }

    getPayoutItem()
  }, [payoutId])

  const isMyPayout = useMemo(() => payout?.userId === me.id, [me, payout])

  return (
    <Loadable loading={!isLoggedIn}>
      <LoadingIndicator isLoading={loadingRequest} />
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        {payout && (
          <Column style={{ gap: '40px' }}>
            <PayoutHeader payout={payout} isMyPayout={isMyPayout} />
            <PayoutTimeline payout={payout} />
            <PayoutActionBlock payout={payout} isMyPayout={isMyPayout} />
            {[PAYOUT_STATUS.ENDED, PAYOUT_STATUS.STARTED].includes(status) && <PayoutHistory />}
          </Column>
        )}
      </StyledBodyWrapper>
    </Loadable>
  )
}
