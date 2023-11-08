import React from 'react'
import styled from 'styled-components'
import { BaseButton } from './buttons'
import { text34 } from './typography'
import { ChevronUp } from 'react-feather'
import { MEDIA_WIDTHS } from 'theme'

export const BackToTopButton = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <BackToTop onClick={goToTop}>
        Back to top
        <ChevronUp />
      </BackToTop>
    </Container>
  )
}

const BackToTop = styled(BaseButton)`
  background: ${(props) => props.theme.launchpad.colors.primary};
  opacity: 0.7;
  color: ${(props) => props.theme.launchpad.colors.text.light};
  position: relative;
  bottom: 0;
  left: 84%;
  z-index: 20;
  @media (max-width: 1690px) {
    left: 82%;
  }
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  :hover {
    opacity: 1;
  }
  ${text34}
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    left: 50%;
    z-index: 0;
  }
`
const Container = styled.div`
  position: relative;
`
