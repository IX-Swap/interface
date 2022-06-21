import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'
import Column from 'components/Column'
import { PAYOUT_STATUS } from 'constants/enums'

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
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const isLoggedIn = !!token && !!account
  const status = PAYOUT_STATUS.STARTED

  return (
    <Loadable loading={!isLoggedIn}>
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        <Column style={{ gap: '40px' }}>
          <PayoutHeader status={status} />
          <PayoutTimeline
            recordDate={new Date(2022, 5, 1)}
            deadlineDate={new Date(2022, 6, 12)}
            startDate={new Date(2022, 5, 12)}
          />
          <PayoutActionBlock status={status} isManager={false} />
          {[PAYOUT_STATUS.ENDED, PAYOUT_STATUS.STARTED].includes(status) && <PayoutHistory />}
        </Column>
      </StyledBodyWrapper>
    </Loadable>
  )
}
