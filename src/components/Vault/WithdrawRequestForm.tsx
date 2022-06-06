import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import dayjs from 'dayjs'

import { ButtonIXSWide } from 'components/Button'
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
import { AmountInput } from './AmountInput'
import { WithdrawModalView } from './WithdrawPopup'
import { FeeStatus } from './FeeStatus'
import { isPending, WithdrawStatus } from './enum'
import { WaitingWitdrawalFee, WarningPaidFee } from './styleds'

interface Props {
  currency?: SecCurrency
  changeModal: (param: WithdrawModalView) => void
  token: any
  onRedirect: () => void
}
export const WithdrawRequestForm = ({ currency, changeModal, token, onRedirect }: Props) => {
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
  const { account } = useActiveWeb3React()
  const { secTokens } = useUserSecTokens()
  const { onTypeAmount, onTypeReceiver, onCurrencySet, onSetNetWorkName } = useWithdrawActionHandlers()
  const withdraw = useWithdrawCallback(cid, currency?.symbol)
  const { inputError, parsedAmount } = useDerivedWithdrawInfo()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getOriginalNetworkFromToken(tokenInfo)
  const { address, loading } = useENS(receiver)
  const error = Boolean(receiver.length > 0 && !loading && !address && networkName === 'Ethereum')

  const haveActiveWithdrawal = isPending(withdrawStatus.status || 'pending')

  const paid = [WithdrawStatus.FEE_ACCEPTED, WithdrawStatus.PENDING].includes(withdrawStatus.status as WithdrawStatus)

  useEffect(() => {
    if (tokenInfo.id) {
      getWithdrawStatus(tokenInfo.id)
      getFeePrice(tokenInfo.id)
    }
  }, [tokenInfo.id, getWithdrawStatus, getFeePrice])

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
    <div style={{ position: 'relative' }}>
      <Column style={{ gap: '25px', marginTop: '18px' }}>
        <Column>
          <TYPE.description3>
            <b>
              <Trans>Info:</Trans>
            </b>
            &nbsp;
            <Trans>{`Your wrapped ${
              currency?.originalSymbol || tokenInfo?.symbol
            } will be extracted from your Polygon wallet and burnt automatically.`}</Trans>
          </TYPE.description3>
        </Column>
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>I want to withdraw:</Trans>
            </TYPE.body1>
          </Row>
          <AmountInput
            widthdraw
            token={token}
            amount={parsedAmount}
            showMax={true}
            currency={currency}
            value={amount ?? ''}
            onUserInput={onTypeAmount}
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
        <ButtonIXSWide
          style={{ textTransform: 'unset' }}
          disabled={!!inputError || loadingFee || loadingWithdraw}
          onClick={onClick}
        >
          {loadingFee ? (
            <WaitingWitdrawalFee>
              <LoaderThin size={20} />
              {t`Sending Withdrawal Fee`}
            </WaitingWitdrawalFee>
          ) : (
            <>{inputError ?? t`${paid ? 'Withdraw' : 'Pay withdraw fee'}`}</>
          )}
        </ButtonIXSWide>
      </Row>
    </div>
  )
}
