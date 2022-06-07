import React from 'react'

import { useUserState } from 'state/user/hooks'

import { TokenItem } from './TokenItem'
import { Container } from './styleds'

export const TmMyTokens = () => {
  const { me } = useUserState()

  return (
    <>
      {me?.managerOf?.length ? (
        <Container>
          {me?.managerOf.map((item) => (
            <TokenItem key={item} item={item} />
          ))}
        </Container>
      ) : (
        <div>No data</div>
      )}
    </>
  )
}
