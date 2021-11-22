import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { getNetworkFromToken } from 'components/CurrencyLogo'
import Row from 'components/Row'
import useENS from 'hooks/useENS'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect } from 'react'
import { useUserSecTokens } from 'state/user/hooks'
import {
  useDerivedWithdrawInfo,
  useWithdrawActionHandlers,
  useWithdrawCallback,
  useWithdrawState,
} from 'state/withdraw/hooks'
import { TYPE } from 'theme'
import { shortAddress } from 'utils'
import { currencyId } from 'utils/currencyId'
import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'
import { WithdrawModalView } from './WithdrawPopup'

interface Props {
  currency?: Currency
  changeModal: (param: WithdrawModalView) => void
}
export const WithdrawRequestForm = ({ currency, changeModal }: Props) => {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const { amount, receiver, currencyId: cid } = useWithdrawState()
  const { secTokens } = useUserSecTokens()
  const { onTypeAmount, onTypeReceiver, onCurrencySet, onSetNetWorkName } = useWithdrawActionHandlers()
  const { address, loading } = useENS(receiver)
  const error = Boolean(receiver.length > 0 && !loading && !address)
  const withdraw = useWithdrawCallback(cid, currency?.symbol)
  const { parsedAmount, inputError } = useDerivedWithdrawInfo()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getNetworkFromToken(tokenInfo)

  useEffect(() => {
    if (account) {
      onTypeReceiver(account ?? '')
    }
  }, [account, onTypeReceiver])

  useEffect(() => {
    if (networkName) {
      onSetNetWorkName(networkName ?? '')
    }
  }, [networkName, onSetNetWorkName])

  const onClick = () => {
    const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
    if (tokenId && !error && parsedAmount && !inputError) {
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
            <Trans>{`Your wrapped ${tokenInfo?.symbol} will be extracted from your ${networkName} wallet and burnt automatically.`}</Trans>
          </TYPE.description3>
        </Column>
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>I want to withdraw:</Trans>
            </TYPE.body1>
          </Row>
          <AmountInput
            amount={parsedAmount}
            showMax={true}
            currency={currency}
            value={amount ?? ''}
            onUserInput={onTypeAmount}
          />
          <Row>
            <TYPE.description2 color={`${theme.text2}80`}>
              <Trans>{`${amount || '0'} ${tokenInfo?.symbol} tokens from your wallet ${
                address && shortAddress(address || '')
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

      <Row style={{ marginTop: '50px', marginBottom: '24px' }}>
        <ButtonIXSWide style={{ textTransform: 'unset' }} disabled={!!inputError} onClick={onClick}>
          {inputError ?? <Trans>Send</Trans>}
        </ButtonIXSWide>
      </Row>
    </div>
  )
}
