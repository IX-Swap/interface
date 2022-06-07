import React from 'react'

import { useUserState } from 'state/user/hooks'
import { TmEmptyPage } from 'components/TmEmptyPage'

import { TokenItem } from './TokenItem'
import { Container, TokensList } from './styleds'

export const TmMyTokens = () => {
  const { me } = useUserState()

  return (
    <Container>
      {me?.managerOf?.length ? (
        <TokensList>
          {me?.managerOf.map((item) => (
            <TokenItem key={item} item={item} />
          ))}
        </TokensList>
      ) : (
        <TmEmptyPage tab="my-tokens" />
      )}
    </Container>
  )
}
