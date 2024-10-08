import React from 'react'

import { useUserState } from 'state/user/hooks'
import { TmEmptyPage } from 'components/TmEmptyPage'
import { LoadingIndicator } from 'components/LoadingIndicator'

import { TokenItem } from './TokenItem'
import { Container, TokensList } from './styleds'

export const TmMyTokens = () => {
  const { me, isLoadingMe } = useUserState()

  return (
    <>
      <LoadingIndicator noOverlay={true} isLoading={isLoadingMe} />

      <Container>
        {me?.managerOf?.length ? (
          <TokensList>
            {me?.managerOf.map((item) => (
              <TokenItem key={item.id} item={item} />
            ))}
          </TokensList>
        ) : (
          <TmEmptyPage tab="my-tokens" />
        )}
      </Container>
    </>
  )
}
