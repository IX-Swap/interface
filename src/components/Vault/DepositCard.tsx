import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Flex } from 'rebass'

import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { AppDispatch } from 'state'
import { useDepositModalToggle } from 'state/application/hooks'
import { setError, setLoading, setModalView } from 'state/deposit/actions'
import { useDepositActionHandlers, useHideAboutWrappingCallback } from 'state/deposit/hooks'
import { DepositModalView } from 'state/deposit/reducer'
import { useUserSecTokens } from 'state/user/hooks'
import { ModalContentWrapper, ModalPadding } from 'theme'
import { SecCurrency } from 'types/secToken'

import { DepositAboutWrapping } from './DepositAboutWrapping'
import { DepositError } from './DepositError'
import { DepositRequestForm } from './DepositRequestForm'
import styled from 'styled-components'
import back from 'assets/images/newBack.svg'
import { TokenLogo } from 'components/TokenLogo'
import CurrencyLogo from '../CurrencyLogo'
import { DepositView, setWalletState } from 'state/wallet'
import { useWalletState } from 'state/wallet/hooks'
import { DepositTransaction } from './DepositTransaction'

interface Props {
  currency?: SecCurrency
  token: any
  setOpenDepositCard?: any
}

export const DepositCard = ({ currency, token }: Props) => {
  const { secTokens } = useUserSecTokens()
  const hideAboutWrapping = useHideAboutWrappingCallback()
  const toggle = useDepositModalToggle()
  const dispatch = useDispatch<AppDispatch>()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const { onResetDeposit } = useDepositActionHandlers()
  const { depositView } = useWalletState()

  const onClose = useCallback(() => {
    onResetDeposit()
    dispatch(setModalView({ view: DepositModalView.CREATE_REQUEST }))
    dispatch(setError({ errorMessage: '' }))
    dispatch(setLoading({ loading: false }))
    toggle()
    hideAboutWrapping()
  }, [toggle, dispatch, hideAboutWrapping])

  const handleBack = () => {
    dispatch(setWalletState({ isOpenDepositCard: false, depositView: DepositView.CREATE_REQUEST }))
  }

  console.log('depositView', depositView)

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
          {depositView === DepositView.ERROR && <DepositError onClose={onClose} />}
          {depositView === DepositView.ABOUT_WRAPPING && <DepositAboutWrapping />}
          {depositView === DepositView.PENDING && <DepositTransaction currency={token} />}
        </ModalPadding>
      </ModalContentWrapper>
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
