import React from 'react'
import styled from 'styled-components'
import { ReactComponent as TelegramLogo } from 'assets/launchpad/svg/social/telegram.svg'
import { ReactComponent as TwitterLogo } from 'assets/launchpad/svg/social/twitter.svg'
import { ReactComponent as MLogo } from 'assets/launchpad/svg/social/m.svg'
import { ReactComponent as DiscordLogo } from 'assets/launchpad/svg/social/discord.svg'
import { ReactComponent as YoutubeLogo } from 'assets/launchpad/svg/social/youtube.svg'
import { ReactComponent as LinkedInLogo } from 'assets/launchpad/svg/social/linkedin.svg'
import { ReactComponent as RedditLogo } from 'assets/launchpad/svg/social/reddit.svg'
import { ReactComponent as CoingeckoLogo } from 'assets/launchpad/svg/social/coingecko.svg'

import { text8 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'


interface Props {
  links: any
}

export const Links: React.FC<Props> = (props) => {
  const socialMedialLinks = React.useMemo(
    () => [
      { url: !props.links?.socialMedia?.twitter, logo: <TwitterLogo /> },
      { url: !props.links?.socialMedia?.telegram, logo: <TelegramLogo /> },
      { url: !props.links?.socialMedia?.linkedin, logo: <LinkedInLogo /> },
      { url: !props.links?.socialMedia?.youtube, logo: <YoutubeLogo /> },
      { url: !props.links?.socialMedia?.coinmarketcap, logo: <MLogo /> },
      { url: !props.links?.socialMedia?.coingecko, logo: <CoingeckoLogo /> },
      { url: !props.links?.socialMedia?.discord, logo: <DiscordLogo /> },
      { url: props.links?.socialMedia?.reddit, logo: <RedditLogo /> },
    ],
    []
  )

  return (
    <div>
      <SocialMediaLinks>
        <SocialMediaLink href={props.links?.issuerWebsite}>Website</SocialMediaLink>
        <SocialMediaLink href={props.links?.issuerWebsite}>Whitepaper</SocialMediaLink>
        {props.links?.whitepaperUrl && <SocialMediaLink href={props.links.whitepaperUrl}>Dataroom</SocialMediaLink>}
        {socialMedialLinks
          .filter((link) => link.url)
          .map((link, idx) => (
            <SocialMediaLink key={`link-${idx}`} href={link.url}>
              {link.logo}
            </SocialMediaLink>
          ))}
      </SocialMediaLinks>
    </div>
  )
}

const SocialMediaLinks = styled.div`
  margin-top: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    justify-content: center;
  }
`

const SocialMediaLink = styled.a`
  display: grid;
  place-content: center;
  height: 36px;
  padding: 1rem;
  text-decoration: none;

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  ${text8}
  color: ${(props) => props.theme.launchpad.colors.text.title};

  svg {
    transition: transform 0.3s;
  }

  svg path {
    fill: rgba(184, 184, 204, 0.8);
  }

  :hover svg {
    transform: scale(1.2);
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 42%;
  }
`
