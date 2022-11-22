import React from 'react'
import styled from 'styled-components'

import { Formik } from 'formik'
import { object, string } from 'yup'

import { ReactComponent as DotSeparator } from 'assets/launchpad/svg/investment-meta-separator.svg'
import { ReactComponent as Logo } from 'assets/launchpad/svg/logo-alternative.svg'

import { ReactComponent as TelegramLogo } from 'assets/launchpad/svg/social/telegram.svg'
import { ReactComponent as TwitterLogo } from 'assets/launchpad/svg/social/twitter.svg'
import { ReactComponent as MLogo } from 'assets/launchpad/svg/social/m.svg'
import { ReactComponent as DiscordLogo } from 'assets/launchpad/svg/social/discord.svg'
import { ReactComponent as YoutubeLogo } from 'assets/launchpad/svg/social/youtube.svg'
import { ReactComponent as LinkedInLogo } from 'assets/launchpad/svg/social/linkedin.svg'
import { useSubscribeToOffer } from 'state/launchpad/hooks'

type ValueSetter = (field: string, value: any, shouldValidate?: boolean | undefined) => void

const initialValues = {
  email: ''
}

const schema = object().shape({
  email: string().required('Please write your email').email('Please enter a valid email')
})


export const Footer = () => {
  const subscribe = useSubscribeToOffer()

  const [active, setActive] = React.useState(false)

  const handleEmailInput = React.useCallback(
    (text: string, setFieldValue: ValueSetter) => {
      setActive(text !== '')
      setFieldValue('email', text)
    },
    []
  )

  const submit = React.useCallback((values: { email: string }) => {
    subscribe(values.email)
  }, [])

  return (
    <FooterContainer>
      <SubscriptionFormContainer>
        <SubscriptionFormTitle>
          Subscribe for Updates
        </SubscriptionFormTitle>

        <SubscriptionFormSubtitle>
          Keep up to date on all the news, events, developments and our Public Sale.
        </SubscriptionFormSubtitle>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ errors, setFieldValue, submitForm }) => (
            <SubscriptionFormFieldContainer>
              <SubscriptionFormEmailField>
                <SubscriptionFormEmailFieldInput onChange={(e) => handleEmailInput(e.target.value, setFieldValue)}/>

                <SubscriptionFormEmailFieldLabel active={active}>
                  Email Address
                </SubscriptionFormEmailFieldLabel>

                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </SubscriptionFormEmailField>


              <SubscriptionFormSubmitButton onClick={submitForm}>
                Submit
              </SubscriptionFormSubmitButton>
            </SubscriptionFormFieldContainer>
          )}
        </Formik>

        <SocialMediaLinks>
          <SocialMediaLink href="https://t.me/ixswapofficial" target="_blank" rel="noreferrer">
            <TelegramLogo />
          </SocialMediaLink>
          <SocialMediaLink href="https://twitter.com/IxSwap" target="_blank" rel="noreferrer">
            <TwitterLogo />
          </SocialMediaLink>
          <SocialMediaLink href="https://coinmarketcap.com/currencies/ix-swap/" target="_blank" rel="noreferrer">
            <MLogo />
          </SocialMediaLink>
          <SocialMediaLink href="https://discord.com/invite/KXrGyZQx4t" target="_blank" rel="noreferrer">
            <DiscordLogo />
          </SocialMediaLink>
          <SocialMediaLink href="https://www.youtube.com/channel/UCaYPNR-eLs9iuB5ZVKRx-fw" target="_blank" rel="noreferrer">
            <YoutubeLogo />
          </SocialMediaLink>
          <SocialMediaLink href="https://www.linkedin.com/company/ixswap" target="_blank" rel="noreferrer">
            <LinkedInLogo />
          </SocialMediaLink>
        </SocialMediaLinks>
        
      </SubscriptionFormContainer>

      <FooterSeparator />

      <FooterInfoContainer>
        <About>
          <header>
            <Logo /> <div>IXSwap</div>
          </header>
          <main>
            IX Swap is built by a global team of capital markets, 
            legal and blockchain experts, bringing you the next 
            generation of trading for Security tokens and tokenized stocks
          </main>
        </About>
        <Copyright>
          Copyright © IX Swap 2022

          <br />

          <div>
            <a>Terms & Conditions</a> 
            <DotSeparator />
            <a>Privacy Policy</a> 
            <DotSeparator />
            <a>Cookie Settings</a>
          </div>
        </Copyright>
        <Links>
          <div>
            <header>Explore</header>

            <a>Blog</a>
            <a>Community</a>
            <a>Litepaper</a>
            <a>Pitchpaper</a>
          </div>

          <div>
            <header>General</header>

            <a>About</a>
            <a>Team</a>
            <a>Careers</a>
          </div>

          <div>
            <header>Support</header>

            <a>Contact Us</a>
            <a>FAQ</a>
            <a>Tutorials</a>
          </div>
        </Links>
      </FooterInfoContainer>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  margin: 5rem auto;
  
  max-width: ${props => props.theme.launchpad.content.maxWidth};
`


const FooterInfoContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr auto;
  grid-template-areas: 
    "about links"
    "copyright .";

  place-content: start;
  gap: 2rem;

  margin-top: 4rem;
  padding-right: 4rem;
`

const SocialMediaLinks = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  gap: 3rem;
`

const SocialMediaLink = styled.a`
  display: grid;

  place-content: center;

  width: 40px;
  height: 40px;

  padding: 1.5rem;

  background: ${props => props.theme.launchpad.colors.foreground};

  border-radius: 50%;
`

const Copyright = styled.div`
  grid-area: copyright;

  place-self: start;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 140%;
  letter-spacing: -0.02em;


  color: ${props => props.theme.launchpad.colors.text.title};

  div {
    margin-top: 0.5rem;

    display: flex;

    justify-content: center;
    align-items: center;

    gap: 0.5rem;
  }

  a {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;

    line-height: 140%;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.caption};
  }
`
const About = styled.div`
  width: 270px;

  header {
    display: flex;
    
    flex-flow: row nowrap;
    align-items: center;
    
    gap: 0.5rem;

    margin-bottom: 1rem;

    font-style: normal;
    font-weight: 600;
    font-size: 18px;

    line-height: 22px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.title};
  } 
  
  main {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;

    line-height: 140%;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.caption};
  }
`
const Links = styled.div`
  display: flex;
  
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: flex-start;


  header {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;

    line-height: 32px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.caption};
  }

  a {
    display: block;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;

    line-height: 32px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.title};
  }
`

const FooterSeparator = styled.hr`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
`

const SubscriptionFormContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  padding: 5rem;
  padding-bottom: 10rem;
`
const SubscriptionFormTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 64px;

  text-align: center;

  line-height: 110%;
  letter-spacing: -0.05em;

  max-width: 350px;

  color: ${props => props.theme.launchpad.colors.text.title};
`
const SubscriptionFormSubtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  text-align: center;

  line-height: 140%;
  letter-spacing: -0.02em;
  
  max-width: 350px;

  margin: 2rem 0;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const SubscriptionFormFieldContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  gap: 1rem;
`

const SubscriptionFormEmailField = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 480px;

  position: relative;

  :focus-within label {
    transform: translate(0.5rem, 6px) scale(0.75);
  }
`

const SubscriptionFormEmailFieldLabel = styled.label<{ active: boolean }>`
  position: absolute;

  transform: translate(1.5rem, 24px) scale(1);
  ${props => props.active && 'transform: translate(0.5rem, 6px) scale(0.75);'}

  pointer-events: none;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: #B8B8CC; 

  transform-origin: top left;
  transition: all 0.2s ease-out;
`

const SubscriptionFormEmailFieldInput = styled.input`
  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  padding: 1rem 1.5rem;

  height: 60px;

  outline: 0;
`

const SubscriptionFormSubmitButton = styled.button`
  background: ${props => props.theme.launchpad.colors.primary};
  color: ${props => props.theme.launchpad.colors.text.light};

  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  padding: 1rem 3rem;

  height: 60px;

  cursor: pointer;
  
  border: none;
  border-radius: 6px;
`

const ErrorText = styled.div`
  color: #FF6060;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
`