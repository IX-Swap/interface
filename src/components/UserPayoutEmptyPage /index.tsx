import React, { useMemo } from 'react'
import { Trans, t } from '@lingui/macro'

import { SecurityTab } from 'pages/SecurityTokens'
import logoImg from 'assets/svg/logo-white.svg'

import { Container, Title, NothingFound } from './styleds'

interface Props {
  tab: SecurityTab
  children?: JSX.Element
  filtered?: boolean
}

export const UserPayoutEmptyPage  = ({ tab, children, filtered }: Props) => {
  const text = useMemo(() => {
    switch (tab) {
      case 'tokens':
        return `No Tokens Added`
      case 'payout-events':
        return `No Payout Event Created`
      case 'payout-history':
        return `No Payout History`
      default:
        return `No Data`
    }
  }, [tab])

  return (
    <Container>
      <img src={logoImg} alt="logoImg" />
      {!filtered ? (
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
