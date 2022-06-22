import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import { ButtonIXSGradient } from 'components/Button'
import { routes } from 'utils/routes'
import logoImg from 'assets/svg/logo-white.svg'

import { EmptyContainer, EmptyText, NothingFound } from './styleds'

interface Props {
  filtred?: boolean
  my?: boolean
}

export const EmptyState = ({ filtred, my }: Props) => {
  const history = useHistory()
  const redirectToSwap = () => {
    history.push(routes.swap)
  }

  const content = useMemo(() => {
    if (my) {
      return (
        <NothingFound>
          <EmptyText>
            <Trans>{`Oops, you don't have any SEC Tokens!`}</Trans>
          </EmptyText>
          <ButtonIXSGradient onClick={redirectToSwap}>
            <Trans>Buy Now</Trans>
          </ButtonIXSGradient>
        </NothingFound>
      )
    }

    if (filtred) {
      return (
        <NothingFound>
          <EmptyText>
            <Trans>Nothing found</Trans>
          </EmptyText>
          <div>
            <Trans>{`We couldn't find anything with this criteria`}</Trans>
          </div>
        </NothingFound>
      )
    }

    return (
      <EmptyText>
        <Trans>{`No Payout Events!`}</Trans>
      </EmptyText>
    )
  }, [filtred, my])

  return (
    <EmptyContainer>
      <img src={logoImg} alt="logoImg" />
      {content}
    </EmptyContainer>
  )
}
