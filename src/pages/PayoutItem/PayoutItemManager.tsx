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
import { ROLES } from 'constants/roles'
import { routes } from 'utils/routes'
import { PAYOUT_TYPE } from 'components/TmPayoutEvents/constants'
import { ReactComponent as ArrowBack } from 'assets/images/newBack.svg'
import styled from 'styled-components'

export default function PayoutItemForManager({
  match: {
    params: { payoutId },
  },
}: RouteComponentProps<{ payoutId: string }>) {
  const [cookies] = useCookies(['annoucementsSeen'])
  const [payout, setPayout] = useState<null | PayoutEvent>(null)
  const [page, setPage] = useState(1)
  const [claimHistory, setClaimHistory] = useState([])
  const [isClaimHistoryLoading, setIsClaimHistoryLoading] = useState(false)
  const { loadingRequest } = usePayoutState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const { me } = useUserState()
  const history = useHistory()
  const getPayoutItemById = useGetPayoutItem()
  const isLoggedIn = !!token && !!account
  const status = PAYOUT_STATUS.STARTED
  const isMyPayout = payout?.userId === me.id

  const isAdmin = me.role === ROLES.ADMIN
  const isValidRole = me.role === ROLES.TOKEN_MANAGER || isAdmin
  useEffect(() => {
    if (me && isValidRole) {
      return
    }
    history.push('/kyc')
  }, [me, history, isValidRole])

  const getPayoutItem = useCallback(async () => {
    const data = await getPayoutItemById(+payoutId)
    if (data?.id) {
      setPayout(data)
    }
  }, [payoutId])

  useEffect(() => {
    getPayoutItem()
  }, [payoutId, account])

  useEffect(() => {
    if (isAdmin) {
      return
    }
    // The payout & user should be initiated before checking the ownership
    if (payout?.userId && me.id && !isMyPayout) {
      history.replace(routes.tokenManager('payout-events', null))
    }
  }, [isMyPayout, payout?.userId, me.id, isAdmin])

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
    history.push(routes.payoutEvent)
  }

  return (
    <Loadable loading={!isLoggedIn}>
      <LoadingIndicator noOverlay={true} isLoading={loadingRequest} />

      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        {payout && (
          <div style={{ position: 'relative' }}>
            <BackButton onClick={handleBackClick}>
              <StyledArrowBack />
              <BackText>Back</BackText>
            </BackButton>
            <Column style={{ gap: '40px' }}>
              <PayoutHeader payout={payout} isMyPayout />
              {payout.type !== PAYOUT_TYPE.AIRDROPS && (
                <>
                  <PayoutTimeline payout={payout} />
                  <PayoutActionBlock payout={payout} isMyPayout myAmount={1} />
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
            </Column>
          </div>
        )}
      </StyledBodyWrapper>
    </Loadable>
  )
}

export const StyledArrowBack = styled(ArrowBack)`
  cursor: pointer;
  path {
    fill: ${({ theme: { text1 } }) => text1};
  }
`

export const BackButton = styled.div`
  position: absolute;
  top: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const BackText = styled.span`
  color: #6666ff;
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
`
