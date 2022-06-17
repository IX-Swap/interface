import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useSecTokenState } from 'state/secTokens/hooks'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

import { Option } from './TokensBlock'
import { TokenManagerEntry } from 'state/admin/actions'
import Row from 'components/Row'

interface Props {
  items: TokenManagerEntry[]
}

const capitalize = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()

const getStatusColor = (value: string) => {
  switch (value) {
    case 'started': return 'rgba(157, 249, 177, 0.7)'
    case 'announced': return '#FF6D41'
    case 'scheduled': return '#F2F99D'
    case 'delayed': return '#ED0376'

    default:
      return '#FFFFFF'
  }
}

const getStatusTextColor = (value: string) => {
  switch (value) {
    case 'scheduled':
      return '#1A123A'
      
    default:
      return '#FFFFFF'
  }
}

export const TokenManagerTokens = ({ items }: Props) => {
  const { tokens: secTokens } = useSecTokenState()

  const tokensOptions = useMemo((): Record<number, Option> => {
    if (secTokens?.length) {
      console.log(secTokens)
      return secTokens.reduce(
        (acc, token) => ({
          ...acc,
          [token.id]: {
            label: token.name,
            value: token.id,
            icon: <CurrencyLogo size="28px" currency={new WrappedTokenInfo(token)} />,
          },
        }),
        {}
      )
    }

    return {}
  }, [secTokens])

  const data = useMemo(() => items.map((item) => tokensOptions[item.token.id]), [items, tokensOptions])

  return (
    <Container>
      {data.map(({ icon, value, label }, idx) => {
        return (
          <>
            <TokenRow key={value}>
              <TokenHeader>
                {icon} 
                <div>{label}</div>
              </TokenHeader>
              <Row>
                {items[idx].token.payoutEvents.map(event => (
                  <TokenPayoutEventEntry key={`token-${value}-${event.id}`}>
                    <TokenPayoutEventType>
                      {capitalize(event.type)}
                    </TokenPayoutEventType> 
                    -
                    <TokenPayoutEventStatus
                      color={getStatusColor(event.status)}
                      text={getStatusTextColor(event.status)}
                    >
                      {capitalize(event.status)}
                    </TokenPayoutEventStatus>
                  </TokenPayoutEventEntry>
                ))}
              </Row>

            </TokenRow>

            {idx < data.length - 1 && (<RowSeparator />)}
          </>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: flex-start;
  align-items: stretch;

  gap: 1rem;

  padding: 1.5rem;
`

const RowSeparator = styled.hr`
  margin: 0;
`

const TokenRow = styled.div`
  display: flex;
  flex-flow: column wrap;

  align-items: stretch;

  padding: 4px 12px;
  gap: 1rem;

  border-radius: 32px;
`

const TokenHeader = styled.div`
  display: flex;

  flex-flow: row nowrap;

  gap: 0.5rem;

  align-items: center;

  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`

const TokenPayoutEventEntry = styled.div`
  display: flex;

  flex-flow: row nowrap;

  justify-content: space-between;
  align-items: center;

  max-width: fit-content;

  padding: 6px 12px;
  gap: 8px;

  border-radius: 12px;
  
  background-color: ${({ theme }) => theme.bg18};
`

const TokenPayoutEventType = styled.div``
const TokenPayoutEventStatus = styled.div<{ color: string; text: string; }>`
  background: ${({ color }) => color};
  color: ${({ text }) => text};

  padding: 4px 12px;

  border-radius: 40px;
`
