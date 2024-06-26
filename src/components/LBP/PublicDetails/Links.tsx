import React from 'react'
import styled from 'styled-components'
import { ReactComponent as TelegramLogo } from 'assets/images/telegramIcon.svg'
import { ReactComponent as TwitterLogo } from 'assets/images/xIcon.svg'
import { ReactComponent as DiscordLogo } from 'assets/images/discordNew.svg'
import { ReactComponent as YoutubeLogo } from 'assets/images/youtubeIcon.svg'
import { ReactComponent as CoingeckoLogo } from 'assets/images/coinMarketNew.svg'
import { ReactComponent as WebSiteIcon } from 'assets/images/websiteIcon.svg'
import { ReactComponent as LinkedInLogo } from 'assets/launchpad/svg/social/linkedin.svg'
import { ReactComponent as MLogo } from 'assets/launchpad/svg/social/m.svg'
import { ReactComponent as RedditLogo } from 'assets/launchpad/svg/social/reddit.svg'
import { ReactComponent as InstagramLogo } from 'assets/launchpad/svg/social/instagram.svg'
import { ReactComponent as FacebookLogo } from 'assets/launchpad/svg/social/facebook.svg'
import { MEDIA_WIDTHS } from 'theme'
import { LbpFormValues } from '../types'

interface LinksProps {
  lbpData: LbpFormValues | null
}

const socialMediaIcons = {
  'x.com': <TwitterLogo />,
  telegram: <TelegramLogo />,
  youtube: <YoutubeLogo />,
  coingecko: <CoingeckoLogo />,
  discord: <DiscordLogo />,
  linkedin: <LinkedInLogo />,
  coinmarketcap: <MLogo />,
  reddit: <RedditLogo />,
  instagram: <InstagramLogo />,
  facebook: <FacebookLogo />,
}

const Links: React.FC<LinksProps> = ({ lbpData }) => {
  const handleClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div>
      <SocialMediaLinks>
        <WebsiteLink target="_blank" rel="noopener noreferrer" href={lbpData?.officialWebsite}>
          <WebSiteIcon />
          Website
        </WebsiteLink>
        {lbpData?.whitePaper &&
          lbpData.whitePaper.map((paper, idx) => (
            <SocialMediaLink key={`whitepaper-${idx}`} onClick={() => handleClick((paper as { url: string }).url)}>
              {paper.name}
            </SocialMediaLink>
          ))}
        {lbpData?.socialMedia
          .filter((link) => link?.url)
          .map((link, idx) => (
            <SocialMediaLink key={`link-${idx}`} onClick={() => handleClick((link as any).url)}>
              {socialMediaIcons[link.name.toLowerCase() as keyof typeof socialMediaIcons]}
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
    // justify-content: center;
    display: grid;
  }
`

const SocialMediaLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 1rem;
  text-decoration: none;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  svg {
    transition: transform 0.3s;
  }
  :hover svg {
    transform: scale(1.2);
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: fit-content;
  }
`

const WebsiteLink = styled(SocialMediaLink)`
  svg {
    margin-right: 10px;
  }
`

export default Links
