import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import JSBI from 'jsbi'

import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { getNetworkFromToken } from 'components/CurrencyLogo'
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
  useGetFeeStatus,
  useGetFeePrice,
} from 'state/withdraw/hooks'
import { TYPE } from 'theme'
import { SecCurrency } from 'types/secToken'
import { shortAddress } from 'utils'
import { currencyId } from 'utils/currencyId'

import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'
import { WithdrawModalView } from './WithdrawPopup'
import { FeeStatus } from './FeeStatus'

interface Props {
  currency?: SecCurrency
  changeModal: (param: WithdrawModalView) => void
  token: any
}
export const WithdrawRequestForm = ({ currency, changeModal, token }: Props) => {
  const theme = useTheme()
  const getFeeStatus = useGetFeeStatus()
  const getFeePrice = useGetFeePrice()
  const { amount, receiver, currencyId: cid, feeStatus, feePrice } = useWithdrawState()
  const { account, library } = useActiveWeb3React()
  const { secTokens } = useUserSecTokens()
  const { onTypeAmount, onTypeReceiver, onCurrencySet, onSetNetWorkName, onResetWithdraw } = useWithdrawActionHandlers()
  const withdraw = useWithdrawCallback(cid, currency?.symbol)
  const { inputError, parsedAmount } = useDerivedWithdrawInfo()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getNetworkFromToken(tokenInfo)
  const { address, loading } = useENS(receiver)
  const error = Boolean(receiver.length > 0 && !loading && !address && networkName === 'Ethereum')

  useEffect(() => {
    onResetWithdraw()
  }, [])

  useEffect(() => {
    if (tokenInfo.id) {
      getFeeStatus(tokenInfo.id)
      getFeePrice(tokenInfo.id)
    }
  }, [tokenInfo.id, getFeeStatus, getFeePrice])

  useEffect(() => {
    if (networkName) {
      onSetNetWorkName(networkName ?? '')
    }
  }, [networkName, onSetNetWorkName])

  const onClick = () => {
    if (feeStatus !== 'paidFee' && library && account) {
      library.call({
        from: account,
        to: '0xb305c1f2200a17E0502416B1746aB88C9B5C449f',
        // data: calldata,
        value: JSBI.BigInt(feePrice || 0) as any,
      })

      return
    }
    const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
    if (tokenId && !error && parsedAmount && !inputError && receiver) {
      withdraw({ id: tokenId, amount: parsedAmount.toExact(), onSuccess, onError, receiver })
    }
  }

  const onSuccess = () => {
    changeModal(WithdrawModalView.SUCCESS)
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
      <FeeStatus status={feeStatus} feePrice={feePrice} />
      <Row>
        <ButtonIXSWide style={{ textTransform: 'unset' }} disabled={!!inputError} onClick={onClick}>
          {inputError ?? t`${feeStatus !== 'paidFee' ? 'Pay Withdraw FEE' : 'Withdraw'}`}
        </ButtonIXSWide>
      </Row>
    </div>
  )
}
