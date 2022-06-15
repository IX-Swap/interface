import React from 'react'
import { useHistory } from 'react-router-dom'

import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useSecTokenById } from 'state/secTokens/hooks'
import { routes } from 'utils/routes'
import { ManagerOfToken } from 'state/user/actions'

import { Item, InfoContainer, Name, Symbol } from './styleds'

interface Props {
  item: ManagerOfToken
}

export const TokenItem = ({ item }: Props) => {
  const token = useSecTokenById(item.tokenId)
  const history = useHistory()

  if (!token) return null

  const currency = new WrappedTokenInfo(token)

  const onClick = () => {
    history.push(routes.securityTokens(currency))
  }

  return (
    <Item onClick={onClick}>
      <CurrencyLogo currency={currency} size="46px" />
      <InfoContainer>
        <Symbol>{token.symbol}</Symbol>
        <Name>{token.name}</Name>
      </InfoContainer>
    </Item>
  )
}
