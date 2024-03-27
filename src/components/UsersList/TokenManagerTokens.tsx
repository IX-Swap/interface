import React, { useMemo } from 'react'
import styled from 'styled-components'
import { capitalize } from '@material-ui/core'

import { useSecTokenState } from 'state/secTokens/hooks'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { TokenManagerEntry } from 'state/admin/actions'

import { Option } from './TokensBlock'
import { useHistory } from 'react-router-dom'
import { routes } from 'utils/routes'

interface Props {
  items: TokenManagerEntry[]
}

const getStatusColor = (value: string) => {
  switch (value) {
    case 'started':
      return 'rgba(157, 249, 177, 0.7)'
    case 'announced':
      return '#FF6D41'
    case 'scheduled':
      return '#F2F99D'
    case 'delayed':
      return '#FF6161'

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
  const history = useHistory()
  const { tokens: secTokens } = useSecTokenState()

  const tokensOptions = useMemo((): Record<number, Option> => {
    if (secTokens?.length) {
      console.log(secTokens)
      return secTokens.reduce(
        (acc, token) => ({
          ...acc,
          [token?.id]: {
            label: token?.name,
            value: token?.id,
            icon: <CurrencyLogo size="28px" currency={new WrappedTokenInfo(token)} />,
          },
        }),
        {}
      )
    }

    return {}
  }, [secTokens])

  const data = useMemo(() => items.map((item) => tokensOptions[item.token?.id]), [items, tokensOptions])

  const redirectToEvent = (id: number) => {
    history.push(routes.payoutItem(id))
  }

  const redirectToToken = (id: number) => {
    history.push(routes.securityToken(id))
  }

  return (
    <>
      {/* <Hr /> */}
      <Container>
        {data
          ?.filter((item) => item)
          .map(({ icon, value, label }, idx) => {
            return (
              <React.Fragment key={value}>
                <TokenRow>
                  <TokenHeader onClick={() => redirectToToken(+value)}>
                    {icon}
                    <div>{label}</div>
                  </TokenHeader>
                  {Boolean(items[idx].token?.payoutEvents.length) && (
                    <TokenPayoutEventList>
                      {items[idx].token?.payoutEvents.map((event) => (
                        <TokenPayoutEventEntry
                          key={`token-${value}-${event?.id}`}
                          onClick={() => redirectToEvent(event?.id)}
                        >
                          <TokenPayoutEventType>{capitalize(event.type)}</TokenPayoutEventType>-
                          <TokenPayoutEventStatus
                            color={getStatusColor(event.status)}
                            text={getStatusTextColor(event.status)}
                          >
                            {capitalize(event.status)}
                          </TokenPayoutEventStatus>
                        </TokenPayoutEventEntry>
                      ))}
                    </TokenPayoutEventList>
                  )}
                </TokenRow>

                {idx < data.length - 1 && <RowSeparator />}
              </React.Fragment>
            )
          })}
      </Container>
    </>
  )
}

const Hr = styled.div`
  height: 1px;
  padding: 0px 22px;
  background-clip: content-box;
  background-color: ${({ theme }) => theme.text9};
`

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  gap: 10px;

  padding: 22px;
`

const RowSeparator = styled.hr`
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.bg7};
`

const TokenRow = styled.div`
  display: flex;
  flex-flow: column wrap;
  background: #f7f7ff;
  padding: 24px;
  align-items: stretch;

  gap: 1rem;

  border-radius: 8px;
`

const TokenHeader = styled.div`
  cursor: pointer;
  display: flex;

  flex-flow: row nowrap;

  gap: 0.5rem;

  align-items: center;

  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
`

const TokenPayoutEventList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  overflow: auto;
`

const TokenPayoutEventEntry = styled.div`
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;

  flex-flow: row nowrap;

  justify-content: space-between;
  align-items: center;

  max-width: fit-content;

  padding: 6px 12px;
  gap: 8px;

  border-radius: 12px;

  background-color: ${({ theme }) => theme.bg1};
`

const TokenPayoutEventType = styled.div``
const TokenPayoutEventStatus = styled.div<{ color: string; text: string }>`
  background: ${({ color }) => color};
  color: ${({ text }) => text};

  padding: 4px 12px;

  border-radius: 40px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
`
