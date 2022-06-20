import React from 'react'
import { Trans } from '@lingui/macro'

import logoImg from 'assets/svg/logo-white.svg'
import { ButtonIXSGradient } from 'components/Button'

import { EmptyContainer, EmptyText } from './styleds'

interface Props {
  filtred?: boolean
}

export const EmptyState = ({ filtred }: Props) => {
  return (
    <EmptyContainer>
      <img src={logoImg} alt="logoImg" />
      {filtred ? (
        <EmptyText>
          <Trans>{`We couldn't find anything with this criteria`}</Trans>
        </EmptyText>
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
