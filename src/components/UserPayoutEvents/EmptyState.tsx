import React from 'react'
import { Trans } from '@lingui/macro'

import logoImg from 'assets/svg/logo-white.svg'

import { EmptyContainer, EmptyText, NothingFound } from './styleds'

interface Props {
  filtred?: boolean
}

export const EmptyState = ({ filtred }: Props) => {
  return (
    <EmptyContainer>
      <img src={logoImg} alt="logoImg" />
      {filtred ? (
        <NothingFound>
          <EmptyText>
            <Trans>Nothing found</Trans>
          </EmptyText>
          <div>
            <Trans>{`We couldn't find anything with this criteria`}</Trans>
          </div>
        </NothingFound>
      ) : (
        <>
          <EmptyText>
            <Trans>{`No Payout Events!`}</Trans>
          </EmptyText>
        </>
      )}
    </EmptyContainer>
  )
}
