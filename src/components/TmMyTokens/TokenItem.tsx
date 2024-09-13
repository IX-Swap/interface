import React from 'react'
import { useHistory } from 'react-router-dom'

import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { routes } from 'utils/routes'
import { ManagerOfToken } from 'state/user/actions'

import { Item, InfoContainer, Name, Symbol } from './styleds'

interface Props {
  item: ManagerOfToken
}

export const TokenItem = ({ item: { token } }: Props) => {
  const history = useHistory()

  const currency = token && new WrappedTokenInfo(token)

  const onClick = () => {
    history.push(routes.securityToken((currency?.tokenInfo as any).catalogId))
  }

  return (
    <Item onClick={onClick}>

      <InfoContainer>
      {currency ? <CurrencyLogo currency={currency} size="46px" /> : null}
        <Symbol>{token?.symbol}</Symbol>
        <Name>{token?.name}</Name>
      </InfoContainer>
    </Item>
  )
}
