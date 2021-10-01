import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import Row from 'components/Row'
import useENS from 'hooks/useENS'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect } from 'react'
import {
  useDepositActionHandlers,
  useDepositCallback,
  useDepositState,
  useDerivedDepositInfo,
} from 'state/deposit/hooks'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { currencyId } from 'utils/currencyId'
import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'

interface Props {
  currency?: Currency
}

export const DepositRequestForm = ({ currency }: Props) => {
  const { account } = useActiveWeb3React()
  const { amount, sender, currencyId: cid } = useDepositState()
  const { inputError, parsedAmount } = useDerivedDepositInfo()
  const { onTypeAmount, onTypeSender, onCurrencySet } = useDepositActionHandlers()
  const { address, loading } = useENS(sender)
  const { secTokens } = useUserSecTokens()
  const deposit = useDepositCallback()
  const error = Boolean(sender.length > 0 && !loading && !address)

  const onClick = () => {
    const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
    if (tokenId && !error && parsedAmount && !inputError && address) {
      deposit({
        id: tokenId,
        amount: Number(parsedAmount?.toSignificant(5)),
        fromAddress: address,
      })
    }
  }
  useEffect(() => {
    if (account) {
      onTypeSender(account ?? '')
    }
  }, [account, onTypeSender])

  useEffect(() => {
    const id = currencyId(currency)
    onCurrencySet(id)
  }, [currency, onCurrencySet])

  return (
    <div style={{ position: 'relative' }}>
      <Column style={{ gap: '25px', marginTop: '18px' }}>
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>Amount</Trans>
            </TYPE.body1>
          </Row>
          <AmountInput currency={currency} value={amount ?? ''} onUserInput={onTypeAmount} amount={parsedAmount} />
        </Column>
        <Column style={{ gap: '11px' }}>
          <Row>
            <TYPE.body1>
              <Trans>Sender&apos;s wallet</Trans>
            </TYPE.body1>
          </Row>
          <AddressInput {...{ id: 'sender-input', value: sender ?? '', error, onChange: onTypeSender }} />
        </Column>
      </Column>
      <Row style={{ marginTop: '18px', padding: '0 22px' }}>
        <TYPE.description3>
          <b>
            <Trans>Info:</Trans>
          </b>
          &nbsp;
          <Trans>
            Please provide sender’s address in order to approve this transaction. Other adresses will be rejected.
          </Trans>
        </TYPE.description3>
      </Row>
      <Row style={{ marginTop: '37px', marginBottom: '24px' }}>
        <ButtonIXSWide style={{ textTransform: 'unset' }} disabled={!!inputError} onClick={onClick}>
          {inputError ?? <Trans>Create deposit request</Trans>}
        </ButtonIXSWide>
      </Row>
    </div>
  )
}
