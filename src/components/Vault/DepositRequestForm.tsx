import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { useDispatch } from 'react-redux'

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
import { BlueGreyCard } from 'components/Card'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { currencyId } from 'utils/currencyId'
import { HideSmall } from 'theme'
import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { SecCurrency } from 'types/secToken'
import { AddressInput } from './AddressInput'
import { AmountInputV2 } from './AmountInputV2'
import { Line } from 'components/Line'
import { useTokenContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import useDecimals from 'hooks/useDecimals'
import { StatusIcon } from 'components/Web3Status'
import Copy from 'components/AccountDetails/Copy'
import { parseUnits } from 'ethers/lib/utils'
import { DepositView, setWalletState } from 'state/wallet'
import { useGetEventCallback } from 'state/eventLog/hooks'
import { useWeb3React } from 'hooks/useWeb3React'

interface Props {
  currency?: SecCurrency & { tokenInfo?: { decimals?: number; originalDecimals?: number } }
  token: any
}

export const DepositRequestForm = ({ currency, token }: Props) => {
  const { account } = useWeb3React()
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

  const fetchTokenBalance = async () => {
    if (!tokenContract || !account) return

    let walletAddress: any = account

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
        await getEvents({ tokenId, filter: 'all' })
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
      console.error(`Could not deposit amount`, error)
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
        <BlueGreyCard>
          <Column style={{ gap: '11px' }}>
            <Row justify="space-between">
              <TYPE.title11>
                <Trans>Enter Amount</Trans>
              </TYPE.title11>

              <CurrentBalance>
                Balance:
                <span>
                  {formatNumberWithDecimals(tokenBalance, 3, true)} {currency?.originalSymbol}
                </span>
              </CurrentBalance>
            </Row>
            <AmountInputV2
              token={token}
              currency={currency}
              originalDecimals={tokenInfo?.originalDecimals}
              value={amount ?? amountInputValue}
              onUserInput={onTypeAmountInternal}
              amount={parsedAmount}
              symbol={currency?.originalSymbol}
            />
          </Column>
          <Column style={{ marginTop: '24px', marginBottom: 24, gap: '11px' }}>
            <Row>
              <TYPE.title11>
                <Trans>From my wallet</Trans>
              </TYPE.title11>
            </Row>
            <AddressInput
              {...{ id: 'sender-input', value: sender, error, onChange: onTypeSender, disabled: true }}
              placeholder="My wallet address"
              rightItem={<StatusIcon />}
            />
          </Column>
          <Line />
        </BlueGreyCard>
      </Column>
      <ArrowWrapper>
        <DownArrow />
      </ArrowWrapper>
      <Column style={{ gap: '25px', marginTop: '10px' }}>
        <BlueGreyCard>
          <Column style={{ gap: '11px' }}>
            <Row>
              <TYPE.title11>
                <Trans>To Custodian Wallet</Trans>
              </TYPE.title11>
            </Row>
            <AddressInput
              {...{
                id: 'sender-input',
                value: tokenInfo?.custodyAssetAddress || '',
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
        </BlueGreyCard>
      </Column>
      <Row style={{ marginTop: '4px', marginBottom: '8px' }}>
        <PinnedContentButton
          style={{ textTransform: 'unset' }}
          disabled={!!inputError || loadingDeposit}
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
  // padding: 7px 5px;
  border-radius: 100%;
  margin: 0px auto;
  height: 31px;
  width: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: ${({ theme }) => theme.bg9};
`
