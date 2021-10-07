import { Currency } from '@ixswap1/sdk-core'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { ArrowDown } from 'react-feather'
import { ButtonIXSWide, ButtonGradient } from 'components/Button'
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
import { shortenAddress } from 'utils'
import { BlueGreyCard } from 'components/Card'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { currencyId } from 'utils/currencyId'
import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'
import useTheme from 'hooks/useTheme'

export const ArrowWrapper = styled.div`
  padding: 7px 5px;
  border-radius: 100%;
  margin: 14px auto;
  height: 31px;
  width: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg9};
`
interface Props {
  currency?: Currency
  showWrapInfo: boolean
  setShowWrapInfo: (newValue: boolean) => void
}

export const DepositRequestForm = ({ currency, showWrapInfo, setShowWrapInfo }: Props) => {
  const theme = useTheme()
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
      {!showWrapInfo ? (
        <>
          <Column style={{ gap: '25px', marginTop: '16px' }}>
            <BlueGreyCard>
              <Column style={{ gap: '11px' }}>
                <Row>
                  <TYPE.body1>
                    <Trans>I want to deposit:</Trans>
                  </TYPE.body1>
                </Row>
                <AmountInput
                  currency={currency}
                  value={amount ?? ''}
                  onUserInput={onTypeAmount}
                  amount={parsedAmount}
                />
              </Column>
              <Column style={{ marginTop: '20px', gap: '11px' }}>
                <Row>
                  <TYPE.body1>
                    <Trans>{`From my ${(currency as any)?.tokenInfo?.network || ''} wallet`}</Trans>
                  </TYPE.body1>
                </Row>
                <AddressInput
                  {...{ id: 'sender-input', value: sender ?? '', error, onChange: onTypeSender }}
                  placeholder={`Paste your ${(currency as any)?.tokenInfo?.network || ''} wallet`}
                />
              </Column>
              <Column style={{ margin: '12px 0px', padding: '0 22px' }}>
                <Row>
                  <TYPE.description2 color={`${theme.text2}80`}>
                    <Trans>
                      Please provide sender’s address in order to approve this transaction. Other adresses will be
                      rejected.
                    </Trans>
                  </TYPE.description2>
                </Row>
              </Column>
            </BlueGreyCard>
          </Column>
          <ArrowWrapper>
            <ArrowDown width="22px" height="22px" color={`${theme.text2}80`} />
          </ArrowWrapper>
          <Column style={{ gap: '25px', marginTop: '16px' }}>
            <BlueGreyCard>
              <Column style={{ gap: '11px' }}>
                <Row>
                  <TYPE.body1>
                    <Trans>{`You will get wrapped ${(currency as any)?.tokenInfo?.originalName}:`}</Trans>
                  </TYPE.body1>
                </Row>
                <AmountInput
                  currency={currency}
                  value={amount ? `${amount} ${(currency as any)?.tokenInfo?.name}` : ''}
                  onUserInput={onTypeAmount}
                  amount={parsedAmount}
                  rightItem={
                    <ButtonGradient style={{ width: '146px' }} onClick={() => setShowWrapInfo(true)}>
                      <Trans>About Wrapping</Trans>
                    </ButtonGradient>
                  }
                />
              </Column>
              <Column style={{ marginTop: '20px', marginBottom: '16px', gap: '11px' }}>
                <Row>
                  <TYPE.body1>
                    <Trans>{`To my ${(currency as any)?.tokenInfo?.network || ''} wallet`}</Trans>
                  </TYPE.body1>
                </Row>
                <AddressInput
                  {...{
                    id: 'sender-input',
                    value: sender ? shortenAddress(sender) : '',
                    error,
                    onChange: onTypeSender,
                    disabled: true,
                    placeholder: `Paste your ${(currency as any)?.tokenInfo?.network || ''} wallet`,
                  }}
                />
              </Column>
            </BlueGreyCard>
          </Column>
          <Row style={{ marginTop: '43px', marginBottom: '8px' }}>
            <ButtonIXSWide style={{ textTransform: 'unset' }} disabled={!!inputError} onClick={onClick}>
              {inputError ?? <Trans>Create deposit request</Trans>}
            </ButtonIXSWide>
          </Row>
        </>
      ) : (
        <Column style={{ marginTop: '18px' }}>
          <TYPE.title11 marginBottom="16px">
            <Trans>
              At the moment, security tokens are kept by the custodian and can only be regulated by him. This is done to
              prevent theft and fraudulent transactions. Your security tokens (further as a SEC) cannot be controlled or
              moved, but you have the rights to own them. Relatively speaking, you can dispose of your rights to your
              own security tokens. First reason to do this, we tokenize your token ownership and call it wrapped tokens
              (further as a wSEC).
            </Trans>
          </TYPE.title11>
          <TYPE.title11 marginBottom="16px">
            <Trans>
              Second reason you need wSEC is to be able to trade SEC for other ERC-20 tokens on decentralized platforms
              like IXS. Because decentralized platforms running on Ethereum use smart contracts to facilitate trades
              directly between users, every user needs to have the same standardized format for every token they trade.
              This ensures tokens don’t get lost in translation.
            </Trans>
          </TYPE.title11>
          <TYPE.title11 marginBottom="16px">
            <Trans>
              When you “wrap” SEC, you are actually not so much wrap as trading through a smart contract for an equal
              token called wSEC. If you want to get back a simple SEC, you need to &quot;unfold&quot; it. AKA will
              exchange it for a simple SEC.
            </Trans>
          </TYPE.title11>
          <TYPE.title11 marginBottom="16px">
            <Trans>
              When you make a deposit, we create a wrap token and transfer it to your balance. In the future, you have
              the ability to manage it - change, sell, stake, etc. 1 security token = 1 wrapped token (1 SEC = wSEC)
            </Trans>
          </TYPE.title11>
        </Column>
      )}
    </div>
  )
}
