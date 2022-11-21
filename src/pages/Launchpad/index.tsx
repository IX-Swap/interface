import React from 'react'
import styled from 'styled-components'

import { Offers } from 'components/Launchpad/Offers'

import { useSetHideHeader } from 'state/application/hooks'

import { Banner } from './Banner'
import { Header } from './Header'
import { Footer } from './Footer'

export default function Launchpad() {
  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  return (
    <LaunchpadContainer>
      <Header />
      <Banner />
      <Offers />
      <Footer />
    </LaunchpadContainer>
  )
}

const LaunchpadContainer = styled.div`
  padding: 0 4rem;

  font-family: ${props => props.theme.launchpad.font};
  background: ${props => props.theme.launchpad.colors.background};
`
