import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { ReactComponent as DownArrow } from 'assets/images/DownArrow.svg'
import { PinnedContentButton } from 'components/Button'
import Column from 'components/Column'
import Row, { RowBetween } from 'components/Row'
import useENS from 'hooks/useENS'
import {
  depositToken,
  useDepositActionHandlers,
  useDepositState,
  useDerivedDepositInfo,
  useShowAboutWrappingCallback,
  cancelDeposit,
} from 'state/deposit/hooks'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { currencyId } from 'utils/currencyId'
import { HideSmall } from 'theme'
import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { SecCurrency } from 'types/secToken'
import { AddressInput } from './AddressInput'
import { AmountInputV2 } from './AmountInputV2'
import { useTokenContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import useDecimals from 'hooks/useDecimals'
import { useWeb3React } from '@web3-react/core'
import { StatusIcon } from 'components/Web3Status'
import Copy from 'components/AccountDetails/Copy'
import { parseUnits } from 'ethers/lib/utils'
import { DepositView, setWalletState } from 'state/wallet'
import { useGetEventCallback } from 'state/eventLog/hooks'
import { shortAddress } from 'utils'
import { floorToDecimals } from 'utils/formatCurrencyAmount'

interface Props {
  currency?: SecCurrency & { tokenInfo?: { decimals?: number; originalDecimals?: number } }
  token: any
}

export const DepositRequestForm = ({ currency, token }: Props) => {
  const { account, connector } = useWeb3React()
  const tokenContract = useTokenContract(token?.address ?? '')
  const showAboutWrapping = useShowAboutWrappingCallback()
  const { amount, sender, currencyId: cid } = useDepositState()
  const { inputError, parsedAmount } = useDerivedDepositInfo()
  const { onTypeAmount, onTypeSender, onCurrencySet, onNetworkSet, onResetDeposit } = useDepositActionHandlers()
  const { address, loading } = useENS(sender)
  const { secTokens } = useUserSecTokens()
  const tokenDecimals = useDecimals(token?.address ?? '') ?? 18
  const dispatch = useDispatch()
  const getEvents = useGetEventCallback()

  const [amountInputValue, setAmountInputValue] = useState('')
  const [tokenBalance, setTokenBalance] = useState('0')
  const [loadingDeposit, setLoadingDeposit] = useState(false)

  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const error = Boolean(sender.length > 0 && !loading && !address && networkName === 'Ethereum')
  const computedAddress = networkName === 'Ethereum' ? address : sender
  const amountInput = amount ?? amountInputValue
  const isInsufficientBalance = Number(amountInput) > Number(tokenBalance)

  const fetchTokenBalance = async () => {
    if (!tokenContract || !account) return

    let walletAddress = account

    if (sender) {
      walletAddress = sender
    }

    const balance = await tokenContract.balanceOf(walletAddress)
    const exactBalance = ethers.utils.formatUnits(balance, tokenDecimals)

    setTokenBalance(exactBalance)
  }

  const handleDeposit = async () => {
    let requestId = 0
    try {
      setLoadingDeposit(true)
      const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
      if (tokenId && !error && parsedAmount && !inputError && computedAddress) {
        const response = await depositToken({ tokenId, amount, fromAddress: computedAddress })
        if (!response?.data) {
          throw new Error(`Something went wrong. Could not deposit amount`)
        }
        requestId = response.data.id
        const transaction = await tokenContract?.transfer(
          tokenInfo?.custodyAssetAddress || '',
          parseUnits(amount, tokenDecimals)
        )
        getEvents({ page: 1, filter: 'all' })
        dispatch(setWalletState({ depositView: DepositView.PENDING }))
        await transaction?.wait()
        onResetDeposit()
        requestId = 0
      }
    } catch (error: any) {
      if (requestId) {
        cancelDeposit({ requestId })
        onResetDeposit()
      }
      dispatch(setWalletState({ depositView: DepositView.CREATE_REQUEST }))
    } finally {
      setLoadingDeposit(false)
    }
  }

  const onTypeAmountInternal = (typedValue: any) => {
    onTypeAmount(typedValue)
    setAmountInputValue(typedValue)
  }

  useEffect(() => {
    fetchTokenBalance()
  }, [account, tokenContract, sender, tokenDecimals])

  useEffect(() => {
    if (!sender) {
      onTypeSender(account || '')
    }
  }, [])

  useEffect(() => {
    if (networkName) {
      onNetworkSet(networkName)
    }
  }, [onNetworkSet, networkName])

  useEffect(() => {
    const id = currencyId(currency)
    onCurrencySet(id)
  }, [currency, onCurrencySet])

  return (
    <div style={{ position: 'relative' }}>
      <Column style={{ gap: '25px', marginTop: '16px' }}>
        <Section>
          <Column style={{ gap: '11px' }}>
            <Row justify="space-between">
              <TYPE.title11>
                <Trans>Enter Amount</Trans>
              </TYPE.title11>

              <CurrentBalance>
                Balance:
                <span>
                  {floorToDecimals(Number(tokenBalance), 3)} {currency?.originalSymbol}
                </span>
              </CurrentBalance>
            </Row>
            <AmountInputV2
              showMax
              balance={floorToDecimals(Number(tokenBalance), 3)}
              token={token}
              currency={currency}
              originalDecimals={tokenInfo?.originalDecimals}
              value={amount ?? amountInputValue}
              onUserInput={onTypeAmountInternal}
              amount={parsedAmount}
              symbol={currency?.originalSymbol}
            />
            {isInsufficientBalance && <ErrorText>Insufficient balance</ErrorText>}
          </Column>
          <Column style={{ marginTop: '24px', marginBottom: 24, gap: '11px' }}>
            <Row>
              <TYPE.title11>
                <Trans>From my wallet</Trans>
              </TYPE.title11>
            </Row>
            <AddressInput
              {...{
                id: 'sender-input',
                value: isMobile ? shortAddress(sender) : sender,
                error,
                onChange: onTypeSender,
                disabled: true,
              }}
              placeholder="My wallet address"
              rightItem={<StatusIcon connector={connector} />}
            />
          </Column>
        </Section>
      </Column>
      <ArrowWrapper>
        <DownArrow />
      </ArrowWrapper>
      <Column style={{ gap: '25px', marginTop: '10px' }}>
        <Section>
          <Column style={{ gap: '11px' }}>
            <Row>
              <TYPE.title11>
                <Trans>To Custodian Wallet</Trans>
              </TYPE.title11>
            </Row>
            <AddressInput
              {...{
                id: 'sender-input',
                value: isMobile
                  ? shortAddress(tokenInfo?.custodyAssetAddress || '')
                  : tokenInfo?.custodyAssetAddress || '',
                error,
                onChange: onTypeSender,
                disabled: true,
                placeholder: `Paste your ${capitalizeFirstLetter(networkName || '')} wallet`,
                rightItem: <Copy toCopy={tokenInfo?.custodyAssetAddress || ''} />,
              }}
            />
          </Column>
          <Column style={{ marginTop: '20px', marginBottom: '10px', gap: '11px' }}>
            <RowBetween>
              <TYPE.title11>
                <Trans>{`You will get ${currency?.symbol}`}</Trans>
              </TYPE.title11>

              <HideSmall style={{ cursor: 'pointer' }}>
                <TYPE.description2 color="#6666FF" onClick={showAboutWrapping}>
                  About Wrapping
                </TYPE.description2>
              </HideSmall>
            </RowBetween>
            <AmountInputV2
              token={token}
              currency={currency}
              originalDecimals={tokenInfo?.originalDecimals}
              value={amount ? amount : ''}
              onUserInput={onTypeAmount}
              amount={parsedAmount}
              disabled
              symbol={currency?.symbol}
            />
          </Column>
        </Section>
      </Column>
      <Row style={{ marginTop: 24 }}>
        <PinnedContentButton
          style={{ textTransform: 'unset' }}
          disabled={!!inputError || loadingDeposit || Number(amountInput) > Number(tokenBalance)}
          onClick={() => handleDeposit()}
        >
          {loadingDeposit ? <>Waiting for confirmation...</> : <> {inputError ?? <Trans>Deposit</Trans>}</>}
        </PinnedContentButton>
      </Row>
    </div>
  )
}

const CurrentBalance = styled.div`
  color: #666680;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;

  span {
    color: #292933;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 4px;
  }
`

export const ArrowWrapper = styled.div`
  border-radius: 100%;
  margin: 0px auto;
  height: 31px;
  width: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Section = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px 0;
  `};
`

const ErrorText = styled.span`
  color: #ff6161;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;
`
