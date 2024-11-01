import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import { ethers } from 'ethers'

import { PinnedContentButton } from 'components/Button'
import Column from 'components/Column'
import { getOriginalNetworkFromToken } from 'components/CurrencyLogo'
import Row from 'components/Row'
import useENS from 'hooks/useENS'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import { useUserSecTokens } from 'state/user/hooks'
import {
  useDerivedWithdrawInfo,
  useWithdrawActionHandlers,
  useWithdrawCallback,
  useWithdrawState,
  useGetWithdrawStatus,
  useGetFeePrice,
  useCreateDraftWitdraw,
  usePayFee,
} from 'state/withdraw/hooks'
import { TYPE } from 'theme'
import { SecCurrency } from 'types/secToken'
import { shortAddress } from 'utils'
import { currencyId } from 'utils/currencyId'
import { LoaderThin } from 'components/Loader/LoaderThin'

import { AddressInput } from '../AddressInputPanel/AddressInput'
import { WithdrawModalView } from './WithdrawPopup'
import { FeeStatus } from './FeeStatus'
import { isPending, WithdrawStatus } from './enum'
import { WaitingWitdrawalFee, WarningPaidFee } from './styleds'
import { ReactComponent as IButton } from 'assets/images/newIbutton.svg'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { findChainName } from 'utils/chains'
import { useTokenContract } from 'hooks/useContract'
import useDecimals from 'hooks/useDecimals'
import { AmountInputV2 } from './AmountInputV2'
import { floorToDecimals } from 'utils/formatCurrencyAmount'

interface Props {
  currency?: SecCurrency
  changeModal: (param: WithdrawModalView) => void
  token: any
  onRedirect: () => void
}
export const WithdrawRequestForm = ({ currency, changeModal, token, onRedirect }: Props) => {
  const tokenAddress = (currency as any)?.address || ''
  const tokenContract = useTokenContract(tokenAddress ?? '')
  const tokenDecimals = useDecimals(tokenAddress ?? '') ?? 18
  const theme = useTheme()
  const getWithdrawStatus = useGetWithdrawStatus()
  const createDraftWithdraw = useCreateDraftWitdraw()
  const getFeePrice = useGetFeePrice()
  const payFee = usePayFee()
  const {
    amount,
    receiver,
    currencyId: cid,
    withdrawStatus,
    feePrice,
    loadingFee,
    loadingWithdraw,
  } = useWithdrawState()
  const { account, chainId } = useActiveWeb3React()
  const { secTokens } = useUserSecTokens()
  const { onTypeAmount, onTypeReceiver, onCurrencySet, onSetNetWorkName } = useWithdrawActionHandlers()
  const withdraw = useWithdrawCallback(cid, currency?.symbol)
  const { inputError, parsedAmount } = useDerivedWithdrawInfo()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const { address, loading } = useENS(receiver)

  const [tokenBalance, setTokenBalance] = useState('0')

  const error = Boolean(receiver.length > 0 && !loading && !address && networkName === 'Ethereum')
  const haveActiveWithdrawal = isPending(withdrawStatus.status || 'pending')
  const paid = [WithdrawStatus.FEE_ACCEPTED, WithdrawStatus.PENDING].includes(withdrawStatus.status as WithdrawStatus)
  const chainName = findChainName(chainId) || 'Base'

  const fetchTokenBalance = async () => {
    if (!tokenContract || !account) return

    const balance = await tokenContract.balanceOf(account)

    const exactBalance = ethers.utils.formatUnits(balance, tokenDecimals)

    setTokenBalance(exactBalance)
  }

  useEffect(() => {
    fetchTokenBalance()
  }, [account, tokenContract])

  useEffect(() => {
    if (tokenInfo.id) {
      getWithdrawStatus(tokenInfo.id)
      getFeePrice(tokenInfo.id, amount || '0')
    }
  }, [tokenInfo.id, getWithdrawStatus, getFeePrice, amount])

  useEffect(() => {
    if (networkName) {
      onSetNetWorkName(networkName ?? '')
    }
  }, [networkName, onSetNetWorkName])

  const onClick = () => {
    if (withdrawStatus && withdrawStatus.status !== WithdrawStatus.FEE_ACCEPTED && receiver && tokenInfo) {
      if (withdrawStatus.status !== WithdrawStatus.DRAFT && receiver && tokenInfo) {
        createDraftWithdraw({
          tokenId: tokenInfo.id,
          fromAddress: receiver,
          amount,
        })

        return
      }
      payFee({
        tokenId: tokenInfo.id,
        feeContractAddress: tokenInfo.withdrawFeeAddress,
        feeAmount: withdrawStatus.feeAmount || feePrice,
        id: withdrawStatus.id,
      })

      return
    }
    const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
    if (tokenId && !error && parsedAmount && !inputError && receiver) {
      withdraw({ id: tokenId, amount: parsedAmount.toExact(), onSuccess: onRedirect, onError, receiver })
    }
  }

  const onError = () => {
    changeModal(WithdrawModalView.ERROR)
  }

  useEffect(() => {
    const id = currencyId(currency)
    onCurrencySet(id)
  }, [currency, onCurrencySet])

  return (
    <div style={{ position: 'relative', padding: isMobile ? '0px 10px 0px 10px' : '' }}>
      <Column style={{ gap: '25px', marginTop: '18px' }}>
        <InfoSection>
          <TYPE.description3 style={{ display: 'flex' }}>
            {isMobile ? (
              <Trans>
                <IButton style={{ margin: '0px 5px 0px 0px', width: '35px' }} />
                &nbsp; <strong>{`Info:`} &nbsp;</strong> Your wrapped {currency?.originalSymbol || tokenInfo?.symbol}{' '}
                will be extracted from your {chainName} wallet and burnt automatically.
              </Trans>
            ) : (
              <Trans>
                <IButton style={{ margin: '0px 10px 0px 0px' }} />
                <strong>{`Info:`}</strong> Your wrapped {currency?.originalSymbol || tokenInfo?.symbol} will be
                extracted from your {chainName} wallet and burnt automatically.
              </Trans>
            )}
          </TYPE.description3>
        </InfoSection>

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
            amount={parsedAmount}
            currency={currency}
            originalDecimals={tokenInfo?.originalDecimals}
            value={amount ?? ''}
            onUserInput={onTypeAmount}
            symbol={currency?.symbol}
          />
          <Row>
            <TYPE.description2 color={`${theme.text2}80`}>
              <Trans>{`${amount || '0'} ${tokenInfo?.symbol} tokens from your wallet ${
                account && shortAddress(account || '')
              } will be burned during withdrawal`}</Trans>
            </TYPE.description2>
          </Row>
        </Column>
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>{`To my ${networkName} wallet`}</Trans>
            </TYPE.body1>
          </Row>
          <AddressInput
            {...{
              id: 'receiver-input',
              value: receiver ?? '',
              error,
              onChange: onTypeReceiver,
              placeholder: `Paste your ${networkName} wallet`,
            }}
          />
        </Column>
      </Column>
      <FeeStatus
        status={withdrawStatus.status}
        feePrice={haveActiveWithdrawal ? withdrawStatus.feeAmount : ''}
        estimatedPrice={feePrice}
      />
      {withdrawStatus.status === WithdrawStatus.DRAFT && (
        <WarningPaidFee>
          Withdrawing will be canceled if withdrawal fee will not be paid until{' '}
          {dayjs(withdrawStatus.createdAt).add(1, 'hours').format('MMM DD HH:mm')}
        </WarningPaidFee>
      )}
      <Row>
        <PinnedContentButton
          style={{ textTransform: 'unset' }}
          disabled={!!inputError || loadingFee || loadingWithdraw}
          onClick={onClick}
        >
          {loadingFee || loadingWithdraw ? (
            <WaitingWitdrawalFee>
              <LoaderThin size={20} />
              <Trans>{`Sending Withdrawal Fee`}</Trans>
            </WaitingWitdrawalFee>
          ) : (
            <>{inputError ?? <Trans>{paid ? 'Withdraw' : 'Pay withdraw fee'}</Trans>}</>
          )}
        </PinnedContentButton>
      </Row>
    </div>
  )
}

export const InfoSection = styled.div`
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  padding: 20px;
`

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
