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
import { useAddPopup } from 'state/application/hooks'
import { DiscreteExternalLink } from 'theme'
import { text1, text12, text23, text24, text25, text26, text8 } from 'components/LaunchpadMisc/typography'

type ValueSetter = (field: string, value: any, shouldValidate?: boolean | undefined) => void

const initialValues = {
  email: '',
}

const schema = object().shape({
  email: string().required('Please write your email').email('Please enter a valid email'),
})

interface Props {
  offerId?: string
}

export const Footer: React.FC<Props> = (props) => {
  const subscribe = useSubscribeToOffer()
  const addPopup = useAddPopup()

  const [active, setActive] = React.useState(false)

  const handleEmailInput = React.useCallback((text: string, setFieldValue: ValueSetter) => {
    setActive(text !== '')
    setFieldValue('email', text)
  }, [])

  const submit = React.useCallback(async (values: { email: string }) => {
    try {
      await subscribe(values.email, props.offerId)

      addPopup({ info: { success: true, summary: `You have subscribed successfully` } })
    } catch (err: any) {
      addPopup({ info: { success: false, summary: err.message } })
    }
  }, [])

  return (
    <FooterContainer>
      <SubscriptionFormContainer>
        <SubscriptionFormTitle>Subscribe for {props.offerId ? "the Deal's" : ''} Updates</SubscriptionFormTitle>

        <SubscriptionFormSubtitle>
          Keep up to date on all the news, events, developments and our Public Sale.
        </SubscriptionFormSubtitle>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={submit}>
          {({ errors, setFieldValue, submitForm }) => (
            <SubscriptionFormFieldContainer>
              <SubscriptionFormEmailField>
                <SubscriptionFormEmailFieldInput onChange={(e) => handleEmailInput(e.target.value, setFieldValue)} />

                <SubscriptionFormEmailFieldLabel active={active}>Email Address</SubscriptionFormEmailFieldLabel>

                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </SubscriptionFormEmailField>

              <SubscriptionFormSubmitButton onClick={submitForm}>Submit</SubscriptionFormSubmitButton>
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
          <SocialMediaLink
            href="https://www.youtube.com/channel/UCaYPNR-eLs9iuB5ZVKRx-fw"
            target="_blank"
            rel="noreferrer"
          >
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
            IX Swap is built by a global team of capital markets, legal and blockchain experts, bringing you the next
            generation of trading for Security tokens and tokenized stocks
          </main>
        </About>
        <Copyright>
          Copyright © IX Swap 2022
          <br />
          <div>
            <DiscreteExternalLink href="https://ixswap.io/terms-and-conditions/">
              Terms & Conditions
            </DiscreteExternalLink>
            <DotSeparator />
            <DiscreteExternalLink href="https://ixswap.io/privacy-policy/">Privacy Policy</DiscreteExternalLink>
          </div>
        </Copyright>
        <Links>
          <div>
            <header>Explore</header>

            <DiscreteExternalLink href="https://ixswap.io/blog/">Blog</DiscreteExternalLink>
            <DiscreteExternalLink href="https://ixswap.io/community/">Community</DiscreteExternalLink>
          </div>

          <div>
            <header>General</header>

            <DiscreteExternalLink href="https://ixswap.io/about/">About</DiscreteExternalLink>
            <DiscreteExternalLink href="https://ixswap.io/team/">Team</DiscreteExternalLink>
            <DiscreteExternalLink href="https://ixswap.io/careers/">Careers</DiscreteExternalLink>
          </div>

          <div>
            <header>Support</header>

            <DiscreteExternalLink href="https://ixswap.io/contact-us/">Contact Us</DiscreteExternalLink>
            <DiscreteExternalLink href="https://www.ixswap.io/faq/">FAQ</DiscreteExternalLink>
            <DiscreteExternalLink href="https://www.ixswap.io/academy/tutorials">Tutorials</DiscreteExternalLink>
          </div>
        </Links>
      </FooterInfoContainer>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  margin: 5rem auto;
  max-width: ${(props) => props.theme.launchpad.content.maxWidth};
`

const FooterInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'about links'
    'copyright .';

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
  background: ${(props) => props.theme.launchpad.colors.foreground};
  border-radius: 50%;
`

const Copyright = styled.div`
  grid-area: copyright;
  place-self: start;

  ${text23}

  color: ${(props) => props.theme.launchpad.colors.text.title};

  div {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  a {
    ${text24}

    color: ${(props) => props.theme.launchpad.colors.text.caption};
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

    ${text25}

    color: ${(props) => props.theme.launchpad.colors.text.title};
  }

  main {
    ${text12}

    color: ${(props) => props.theme.launchpad.colors.text.caption};
  }
`
const Links = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: flex-start;

  header {
    ${text26}
    color: ${(props) => props.theme.launchpad.colors.text.caption};
  }

  a {
    display: block;
    ${text26}
    color: ${(props) => props.theme.launchpad.colors.text.title};
  }
`

const FooterSeparator = styled.hr`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
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
  max-width: 550px;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const SubscriptionFormSubtitle = styled.div`
  ${text12}
  text-align: center;
  max-width: 350px;
  margin: 2rem 0;
  color: ${(props) => props.theme.launchpad.colors.text.caption};
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
  ${(props) => props.active && 'transform: translate(0.5rem, 6px) scale(0.75);'}

  pointer-events: none;

  ${text8}
  color: #b8b8cc;
  transform-origin: top left;
  transition: all 0.2s ease-out;
`

const SubscriptionFormEmailFieldInput = styled.input`
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  height: 60px;
  outline: 0;
`

const SubscriptionFormSubmitButton = styled.button`
  background: ${(props) => props.theme.launchpad.colors.primary};
  color: ${(props) => props.theme.launchpad.colors.text.light};

  ${text1}
  padding: 1rem 3rem;
  height: 60px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
`

const ErrorText = styled.div`
  color: #ff6060;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
`
