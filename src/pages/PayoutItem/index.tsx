import React, { useState, useEffect, useRef, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'

import Column from 'components/Column'
import Row from 'components/Row'

import { Loadable } from 'components/LoaderHover'
import { Card } from 'components/UserPayoutEvents/Card'
import { LoadingIndicator } from 'components/LoadingIndicator'

import { useActiveWeb3React } from 'hooks/web3'
import { StyledBodyWrapper } from 'pages/SecurityTokens'

import { PAYOUT_STATUS } from 'constants/enums'

import { useAuthState } from 'state/auth/hooks'
import { PayoutEvent } from 'state/token-manager/types'
import {
  useGetPayoutItem,
  usePayoutState,
  getPayoutClaims as getPayoutClaimsAsync,
  getPayouts,
  getMyPayoutAmount,
} from 'state/payout/hooks'

import { PayoutHistory } from './History'
import { PayoutHeader } from './PayoutHeader'
import { PayoutActionBlock } from './ActionBlock'
import { PayoutTimeline } from './Timeline/PayoutTimeline'
import dayjs from 'dayjs'

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
  const [payout, setPayout] = useState<null | PayoutEvent>(null)
  const [page, setPage] = useState(1)
  const [claimHistory, setClaimHistory] = useState([])
  const [isClaimHistoryLoading, setIsClaimHistoryLoading] = useState(false)
  const { loadingRequest } = usePayoutState()
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()
  const getPayoutItemById = useGetPayoutItem()
  const isLoggedIn = !!token && !!account
  const status = PAYOUT_STATUS.STARTED

  const [myAmount, handleMyAmount] = useState(0)

  const getPayoutItem = useCallback(
    async () => {
      const data = await getPayoutItemById(+payoutId)
      if (data?.id) {
        setPayout(data)
      }
    },
    [payoutId]
  )

  const getMyAmount = useCallback(
    async () => {
      const data = await getMyPayoutAmount(+payoutId)
      if (data) {
        handleMyAmount(+data.poolTokens + +data.walletTokens)
      }
    },
    [payoutId]
  )

  useEffect(() => {
    getPayoutItem()
    getMyAmount()
  }, [payoutId, account])

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
            <PayoutHeader payout={payout} isMyPayout={false} />
            <PayoutTimeline payout={payout} />
            <PayoutActionBlock payout={payout} isMyPayout={false} myAmount={myAmount} onUpdate={getPayoutItem} />
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

const MorePayoutEvents = ({ payoutId }: { payoutId: number }) => {
  const [payouts, setPayouts] = useState([] as PayoutEvent[])
  const [page, setPage] = useState(1)

  const ref = useRef()
  const [disabled, setDisabled] = useState<'none' | 'forward' | 'backward'>('backward')

  const scrollForward = useCallback(() => {
    if (!ref.current) {
      return
    }

    const element = ref.current as HTMLElement

    element.scrollBy({ left: 600, behavior: 'smooth' })

    window.requestAnimationFrame(() => {
      const child = element.lastElementChild!

      const boxElement = element.getBoundingClientRect()
      const boxChild = child.getBoundingClientRect()

      if (Math.round(boxElement.x + boxElement.width) >= Math.round(boxChild.x + boxChild.width - 600)) {
        setDisabled('forward')
      } else {
        setDisabled('none')
      }
    })
  }, [ref])

  const scrollBackward = useCallback(() => {
    if (!ref.current) {
      return
    }

    const element = ref.current as HTMLElement

    element.scrollBy({ left: -600, behavior: 'smooth' })

    window.requestAnimationFrame(() => {
      const child = element.firstElementChild!

      const boxElement = element.getBoundingClientRect()
      const boxChild = child.getBoundingClientRect()

      if (Math.round(boxElement.x) <= Math.round(boxChild.x + 600)) {
        setDisabled('backward')
      } else {
        setDisabled('none')
      }
    })
  }, [ref])

  useEffect(() => {
    async function load() {
      const data = await getPayouts({ page, offset: 30 })

      setPayouts((data.items as PayoutEvent[]).filter((item) => item.id !== payoutId))
      setPage(data.page)
    }

    load()
  }, [])

  return (
    <MoreEventsContainer>
      <MoreEventsHeader>
        <MoreEventsTitle>More Payout Events</MoreEventsTitle>

        <div>
          <ArrowButton disabled={disabled === 'backward'} onClick={scrollBackward}>
            <ArrowLeft disabled={disabled === 'backward'} />
          </ArrowButton>
          <ArrowButton disabled={disabled === 'forward'} onClick={scrollForward}>
            <ArrowRight disabled={disabled === 'forward'} />
          </ArrowButton>
        </div>
      </MoreEventsHeader>
      <MoreEventsList ref={ref}>
        {payouts.map((event) => (
          <Card data={event} key={event.id} />
        ))}
      </MoreEventsList>
    </MoreEventsContainer>
  )
}

const ArrowLeft = ({ disabled }: { disabled?: boolean }) => {
  return (
    <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.000749307 7.00708L0.000749307 7.01562L0.000749307 9.48327H0.00661182L0 9.48988L7.00372 16.4936L8.75466 14.7427L3.49525 9.48327L26.0007 9.48327V7.00708L3.51116 7.00708L8.75541 1.76283L7.00447 0.0119019L0.00929423 7.00708H0.000749307Z"
        fill={disabled ? '#EDCEFF' : 'white'}
        fillOpacity={disabled ? '0.5' : '1.0'}
      />
    </svg>
  )
}

const ArrowRight = ({ disabled }: { disabled?: boolean }) => {
  return (
    <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-0.000748976 9.99292L22.4888 9.99292L17.2446 15.2372L18.9955 16.9881L25.9907 9.99292L25.9993 9.99292L25.9993 7.51673L25.9934 7.51673L26 7.51012L18.9963 0.506397L17.2453 2.25733L22.5047 7.51673L-0.00074876 7.51673L-0.000748976 9.99292Z"
        fill={disabled ? '#EDCEFF' : 'white'}
        fillOpacity={disabled ? '0.5' : '1.0'}
      />
    </svg>
  )
}

const MoreEventsContainer = styled.div``

const MoreEventsTitle = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
`

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
`
const MoreEventsHeader = styled(Row)`
  justify-content: space-between;
  margin-bottom: 1rem;
`
const MoreEventsList = styled(Row)`
  align-items: stretch;
  gap: 1rem;
  overflow-x: hidden;
`
