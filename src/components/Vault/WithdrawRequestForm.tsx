import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import Row from 'components/Row'
import useENS from 'hooks/useENS'
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
import { currencyId } from 'utils/currencyId'
import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'
import { WithdrawModalView } from './WithdrawPopup'

interface Props {
  currency?: Currency
  changeModal: (param: WithdrawModalView) => void
}
export const WithdrawRequestForm = ({ currency, changeModal }: Props) => {
  const { account } = useActiveWeb3React()
  const { amount, receiver, currencyId: cid } = useWithdrawState()
  const { secTokens } = useUserSecTokens()
  const { onTypeAmount, onTypeReceiver, onCurrencySet } = useWithdrawActionHandlers()
  const { address, loading } = useENS(receiver)
  const error = Boolean(receiver.length > 0 && !loading && !address)
  const withdraw = useWithdrawCallback(cid, currency?.symbol)
  const { parsedAmount, inputError } = useDerivedWithdrawInfo()

  useEffect(() => {
    if (account) {
      onTypeReceiver(account ?? '')
    }
  }, [account, onTypeReceiver])

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
        {/* <Row style={{ marginTop: '18px' }}>
          <TYPE.description3>
            <b>
              <Trans>Wrap to Sec info:</Trans>
            </b>
            &nbsp;
            <Trans>
              Donec sollicitudin molestie malesuada. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet
              et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci
              porta dapibus. Donec sollicitudin molestie malesuada
            </Trans>
          </TYPE.description3>
        </Row> */}
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>Amount</Trans>
            </TYPE.body1>
          </Row>
          <AmountInput
            amount={parsedAmount}
            showMax={true}
            currency={currency}
            value={amount ?? ''}
            onUserInput={onTypeAmount}
          />
        </Column>
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>Where to send?</Trans>
            </TYPE.body1>
          </Row>
          <AddressInput {...{ id: 'receiver-input', value: receiver ?? '', error, onChange: onTypeReceiver }} />
        </Column>
      </Column>

      <Row style={{ marginTop: '37px', marginBottom: '24px' }}>
        <ButtonIXSWide style={{ textTransform: 'unset' }} disabled={!!inputError} onClick={onClick}>
          {inputError ?? <Trans>Send</Trans>}
        </ButtonIXSWide>
      </Row>
    </div>
  )
}
