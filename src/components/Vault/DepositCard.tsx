import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Flex } from 'rebass'
import { useWeb3React } from '@web3-react/core'

import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { AppDispatch } from 'state'
import { setError, setLoading } from 'state/deposit/actions'
import { useDepositActionHandlers, useDepositState, useHideAboutWrappingCallback } from 'state/deposit/hooks'
import { useUserSecTokens } from 'state/user/hooks'
import { ModalContentWrapper, ModalPadding } from 'theme'
import { SecCurrency } from 'types/secToken'
import { DepositRequestForm } from './DepositRequestForm'
import styled from 'styled-components'
import back from 'assets/images/newBack.svg'
import { TokenLogo } from 'components/TokenLogo'
import CurrencyLogo from '../CurrencyLogo'
import { DepositView, setWalletState } from 'state/wallet'
import { useWalletState } from 'state/wallet/hooks'
import { DepositTransaction } from './DepositTransaction'
import { useEventState, useGetEventCallback } from 'state/eventLog/hooks'
import { DepositStatus } from './enum'
import { DepositPopup } from './DepositPopup'

interface Props {
  currency?: SecCurrency
  token: any
  setOpenDepositCard?: any
}

export const DepositCard = ({ currency, token }: Props) => {
  const { secTokens } = useUserSecTokens()
  const hideAboutWrapping = useHideAboutWrappingCallback()
  const dispatch = useDispatch<AppDispatch>()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const { onResetDeposit } = useDepositActionHandlers()
  const { depositView } = useWalletState()
  const { account } = useWeb3React()
  const { currencyId: cid } = useDepositState()
  const getEvents = useGetEventCallback()
  const { eventLog } = useEventState()

  const eventStatus = eventLog?.[0]?.status as DepositStatus

  const handleBack = () => {
    onResetDeposit()
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    hideAboutWrapping()
    dispatch(setWalletState({ isOpenDepositCard: false, depositView: DepositView.CREATE_REQUEST }))
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (account) {
      const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id

      const interval = setInterval(() => {
        getEvents({ tokenId, page: 1, filter: 'all' })
      }, 15000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [account])

  useEffect(() => {
    if ([DepositStatus.PENDING, DepositStatus.APPROVED].includes(eventStatus)) {
      dispatch(setWalletState({ depositView: DepositView.PENDING }))
    }
  }, [eventStatus])

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <img src={back} alt="Back Icon" />
        <div>Back</div>
      </BackButton>

      <Flex justifyContent="flex-start" alignItems="center">
        <Title>Deposit</Title>
        {token?.logo ? (
          <TokenLogo logo={token.logo} width="32px" height="32px" />
        ) : (
          <CurrencyLogo currency={currency} size="72px" />
        )}

        <TokenName>
          {currency?.originalSymbol || ''} <span>({networkName} Network)</span>
        </TokenName>
      </Flex>

      <ModalContentWrapper>
        <ModalPadding>
          {depositView === DepositView.CREATE_REQUEST && <DepositRequestForm token={token} currency={currency} />}
          {depositView === DepositView.PENDING && <DepositTransaction currency={token} />}
        </ModalPadding>
      </ModalContentWrapper>

      <DepositPopup currency={token?.token} token={token} />
    </Container>
  )
}

const Container = styled.div`
  padding: 48px;
  width: 780px;
  background: #fff;
  margin-top: 24px;
  border-radius: 8px;
`

const BackButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;
  img {
    margin-right: 8px;
  }
  div {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #66f;
  }
`

const Title = styled.div`
  color: #292933;
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 51.2px */
  letter-spacing: -0.96px;
  margin-right: 24px;
  padding-right: 24px;
  border-right: 1px solid #e5e5ff;
`

const TokenName = styled.div`
  color: #292933;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.6px;
  margin-left: 8px;

  span {
    margin-left: 8px;
    color: #8f8fb2;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.26px;
  }
`
