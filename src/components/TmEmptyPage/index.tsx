import React, { useMemo } from 'react'
import { Trans, t } from '@lingui/macro'

import { TokenManagerTab } from 'pages/TokenManager'
import logoImg from 'assets/svg/logo-white.svg'

import { Container, Title, NothingFound } from './styleds'

interface Props {
  tab: TokenManagerTab
  children?: JSX.Element
  filtred?: boolean
}

export const TmEmptyPage = ({ tab, children, filtred }: Props) => {
  const text = useMemo(() => {
    switch (tab) {
      case 'my-tokens':
        return t`No Tokens Added`
      case 'payout-events':
        return t`No Payout Event Created`
      case 'payout-history':
        return t`No Payout History`
      default:
        return t`No Data`
    }
  }, [tab])

  return (
    <Container>
      <img src={logoImg} alt="logoImg" />
      {!filtred ? (
        <>
          <Title>{text}</Title>
          {children}
        </>
      ) : (
        <NothingFound>
          <div>
            <Trans>Nothing found</Trans>
          </div>
          <div>
            <Trans>{`We couldn't find anything with this criteria`}</Trans>
          </div>
        </NothingFound>
      )}
    </Container>
  )
}
