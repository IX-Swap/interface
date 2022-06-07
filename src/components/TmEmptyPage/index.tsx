import React, { useMemo } from 'react'

import { TokenManagerTab } from 'pages/TokenManager'
import logoImg from 'assets/svg/logo-white.svg'

import { Container, Title } from './styleds'

interface Props {
  tab: TokenManagerTab
  children?: JSX.Element
}

export const TmEmptyPage = ({ tab, children }: Props) => {
  const text = useMemo(() => {
    switch (tab) {
      case 'my-tokens':
        return 'No Tokens Added'
      case 'payout-events':
        return 'No Payout Event Created'
      case 'payout-history':
        return 'No Payout History'
      default:
        return 'No Data'
    }
  }, [tab])

  return (
    <Container>
      <img src={logoImg} alt="logoImg" />
      <Title>{text}</Title>
      {children}
    </Container>
  )
}
