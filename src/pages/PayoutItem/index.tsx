import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { Loadable } from 'components/LoaderHover'
import { useAuthState } from 'state/auth/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { PayoutHeader } from './PayoutHeader'

import { StyledBodyWrapper } from 'pages/CustodianV2/styleds'

export enum PayoutType {
    DRAFT = 'draft',
    ANNOUNCED = 'announced',
    SCHEDULED = 'scheduled',
    STARTED = 'started',
    ENDED = 'ended',
    DELAYED = 'delayed',
}

export default function PayoutItem({
  match: {
    params: { payoutId },
  },
}: RouteComponentProps<{ payoutId: string }>) {
  const [cookies] = useCookies(['annoucementsSeen'])
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const isLoggedIn = !!token && !!account
  const status = PayoutType.STARTED

  return (
    <Loadable loading={!isLoggedIn}>
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
          <PayoutHeader status={status} />
      </StyledBodyWrapper>
    </Loadable>
  )
}
