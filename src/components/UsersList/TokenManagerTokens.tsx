import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useSecTokenState } from 'state/secTokens/hooks'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

import { Option } from './TokensBlock'

interface Props {
  items: number[]
}

export const TokenManagerTokens = ({ items }: Props) => {
  const { tokens: secTokens } = useSecTokenState()

  const tokensOptions = useMemo((): Record<number, Option> => {
    if (secTokens?.length) {
      return secTokens.reduce(
        (acc, token) => ({
          ...acc,
          [token.id]: {
            label: token.symbol,
            value: token.id,
            icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
          },
        }),
        {}
      )
    }

    return {}
  }, [secTokens])

  const data = useMemo(() => items.map((item) => tokensOptions[item]), [items, tokensOptions])

  return (
    <Container>
      {data.map(({ icon, value, label }) => {
        return (
          <Item key={value}>
            {icon}
            {label}
          </Item>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  gap: 8px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.bg11};
`
