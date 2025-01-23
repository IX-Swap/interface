import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { ReactComponent as NewKYCLogo } from '../../assets/images/Maintenance.svg'
import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { text9 } from 'components/LaunchpadMisc/typography'
import Portal from '@reach/portal'
import { ExitIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { ContactForm } from 'components/Launchpad/KYCPrompt/ContactForm'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #FFFFFF;
    margin: 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
  background-color: #ffffff;
`

const Logo = styled(NewKYCLogo)`
  margin-bottom: 10px;
`

const Title = styled.p`
  font-size: 64px;
  font-weight: 700;
  margin: 20px 0px;
`
const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #8f8fb2;
`

const ContactUsTextButton = styled.button`
  display: grid;
  place-content: center;
  height: 60px;
  width: 250px;
  text-align: center;
  text-decoration: none;
  margin-top: 20px;
  ${text9}
  cursor: pointer;
  color: #ffffff;
  background: ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;
  outline: 0;
`

const ModalWrapper = styled.div`
  display: grid;
  place-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  backdrop-filter: blur(20px);
`

const ContactFormWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 1rem;
  position: relative;
  width: 480px;
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 8px;
  padding: 2rem;
`

function Maintenance() {
  const [contactFormOpen, setContactForm] = React.useState(false)
  const toggleContactForm = React.useCallback(() => setContactForm((state) => !state), [])

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo />
        <Title>
          We’re down for <br /> Maintenance
        </Title>
        <SubTitle>This page is undergoing maintenance and will be back soon</SubTitle>
        <ContactUsTextButton type="button" onClick={toggleContactForm}>
          Contact us
        </ContactUsTextButton>

        {contactFormOpen && (
          <Portal>
            <ModalWrapper>
              <ContactFormWrapper>
                <ExitIconContainer onClick={toggleContactForm}>
                  <CrossIcon />
                </ExitIconContainer>

                <ContactForm onSubmit={() => setContactForm(false)} />
              </ContactFormWrapper>
            </ModalWrapper>
          </Portal>
        )}
      </Container>
    </>
  )
}

export default Maintenance