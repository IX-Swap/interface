import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { ArrowDown } from 'react-feather'
import { ButtonIXSWide, ButtonGradient, ButtonText } from 'components/Button'
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
  useShowAboutWrappingCallback,
} from 'state/deposit/hooks'
import { shortAddress } from 'utils'
import { BlueGreyCard } from 'components/Card'
import { useUserSecTokens } from 'state/user/hooks'
import { TYPE } from 'theme'
import { currencyId } from 'utils/currencyId'
import { AddressInput } from '../AddressInputPanel/AddressInput'
import { AmountInput } from './AmountInput'
import { HideSmall, SmallOnly } from 'theme'
import useTheme from 'hooks/useTheme'
import info from '../../assets/images/info-filled.svg'
import { chainIdToNetworkName, getNetworkFromToken } from 'components/CurrencyLogo'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'
import { SupportedChainId } from 'constants/chains'
import { SecCurrency } from 'types/secToken'

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
  currency?: SecCurrency
  token: any
}

export const DepositRequestForm = ({ currency, token }: Props) => {
  const theme = useTheme()
  const showAboutWrapping = useShowAboutWrappingCallback()
  const { account, chainId } = useActiveWeb3React()
  const { amount, sender, currencyId: cid } = useDepositState()
  const { inputError, parsedAmount } = useDerivedDepositInfo()
  const { onTypeAmount, onTypeSender, onCurrencySet, onNetworkSet, onResetDeposit } = useDepositActionHandlers()
  const { address, loading } = useENS(sender)
  const { secTokens } = useUserSecTokens()
  const deposit = useDepositCallback()
  const tokenInfo = (secTokens[(currency as any)?.address || ''] as any)?.tokenInfo
  const networkName = getNetworkFromToken(tokenInfo)
  const error = Boolean(sender.length > 0 && !loading && !address && networkName === 'Ethereum')
  const computedAddress = networkName === 'Ethereum' ? address : sender
  const accountNetwork = chainId ? chainIdToNetworkName(chainId as SupportedChainId) : ''

  useEffect(() => {
    onResetDeposit()
  }, [])

  const onClick = () => {
    const tokenId = (secTokens[cid ?? ''] as any)?.tokenInfo?.id
    if (tokenId && !error && parsedAmount && !inputError && computedAddress) {
      deposit({
        id: tokenId,
        amount: Number(parsedAmount?.toSignificant(5)),
        fromAddress: computedAddress || '',
      })
    }
  }

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
            <Row>
              <TYPE.body1>
                <Trans>I want to deposit:</Trans>
              </TYPE.body1>
            </Row>
            <AmountInput
              token={token}
              currency={currency}
              value={amount ?? ''}
              onUserInput={onTypeAmount}
              amount={parsedAmount}
            />
          </Column>
          <Column style={{ marginTop: '20px', gap: '11px' }}>
            <Row>
              <TYPE.body1>
                <Trans>{`From my ${networkName || ''} wallet`}</Trans>
              </TYPE.body1>
            </Row>
            <AddressInput
              {...{ id: 'sender-input', value: sender ?? '', error, onChange: onTypeSender }}
              placeholder={`Paste your ${networkName || ''} wallet`}
            />
          </Column>
          <Column style={{ margin: '12px 0px', padding: '0 22px' }}>
            <Row>
              <TYPE.description2 color={`${theme.text2}80`}>
                <Trans>
                  Please provide sender’s address in order to approve this transaction. Other adresses will be rejected.
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
                <Trans>{`You will get wrapped ${currency?.originalSymbol || currency?.symbol}:`}</Trans>
              </TYPE.body1>
            </Row>
            <AmountInput
              token={token}
              currency={currency}
              value={amount ? `${amount} ${currency?.originalSymbol || currency?.symbol}` : ''}
              onUserInput={onTypeAmount}
              amount={parsedAmount}
              rightItem={
                <>
                  <HideSmall>
                    <ButtonGradient style={{ width: '146px' }} onClick={showAboutWrapping}>
                      <Trans>About Wrapping</Trans>
                    </ButtonGradient>
                  </HideSmall>
                  <SmallOnly>
                    <ButtonText onClick={showAboutWrapping}>
                      <img src={info} alt="info icon" width="20px" height="20px" />
                    </ButtonText>
                  </SmallOnly>
                </>
              }
            />
          </Column>
          <Column style={{ marginTop: '20px', marginBottom: '16px', gap: '11px' }}>
            <Row>
              <TYPE.body1>
                <Trans>{`To your ${capitalizeFirstLetter(accountNetwork || '')} wallet`}</Trans>
              </TYPE.body1>
            </Row>
            <AddressInput
              {...{
                id: 'sender-input',
                value: shortAddress(account || ''),
                error,
                onChange: onTypeSender,
                disabled: true,
                placeholder: `Paste your ${capitalizeFirstLetter(accountNetwork || '')} wallet`,
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
    </div>
  )
}
