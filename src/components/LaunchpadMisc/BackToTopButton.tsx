import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BaseButton } from './buttons'
import { text34 } from './typography'
import { ChevronUp } from 'react-feather'

const isBottom = (el: HTMLElement) => {
  return el.getBoundingClientRect().bottom <= window.innerHeight + 15
}

export const BackToTopButton = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    function showScroll() {
      const wrappedElement = document.getElementsByTagName('footer')?.[0]
      if (isBottom(wrappedElement)) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }
    window.addEventListener('scroll', showScroll)
    return () => {
      window.removeEventListener('scroll', showScroll)
    }
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      {showTopBtn && (
        <BackToTop onClick={goToTop}>
          Back to top
          <ChevronUp />
        </BackToTop>
      )}
    </Container>
  )
}

const BackToTop = styled(BaseButton)`
  background: ${(props) => props.theme.launchpad.colors.disabled};
  color: ${(props) => props.theme.launchpad.colors.text.light};
  position: fixed;
  top: 10%;
  right: 25px;
  z-index: 20;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  ${text34}
`
const Container = styled.div`
  position: relative;
`
