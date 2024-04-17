import React from 'react'
import styled from 'styled-components'
import { ReactComponent as TelegramLogo } from 'assets/images/telegramIcon.svg'
import { ReactComponent as TwitterLogo } from 'assets/images/xIcon.svg'
import { ReactComponent as DiscordLogo } from 'assets/images/discordNew.svg'
import { ReactComponent as YoutubeLogo } from 'assets/images/youtubeIcon.svg'
import { ReactComponent as CoingeckoLogo } from 'assets/images/coinMarketNew.svg'

import { text8 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'
import { LbpFormValues } from '../types'
import { useFetchToken } from 'hooks/useFetchToken'


interface LinksProps {
  lbpData: LbpFormValues | null
}
const Links: React.FC<LinksProps> = ({ lbpData }) => {
  // const socialMedialLinks = React.useMemo(
  //   () => [
  //     { url: lbpData?.socialMedia?.twitter, logo: <TwitterLogo /> },
  //     { url: lbpData?.socialMedia?.telegram, logo: <TelegramLogo /> },
  //     { url: lbpData?.socialMedia?.youtube, logo: <YoutubeLogo /> },
  //     { url: lbpData?.socialMedia?.coingecko, logo: <CoingeckoLogo /> },
  //     { url: lbpData?.socialMedia?.discord, logo: <DiscordLogo /> },
  //   ],
  //   []
  // )

  return (
    <div>
      <SocialMediaLinks>
        {/* <SocialMediaLink href={lbpData?.links?.issuerWebsite}>Website</SocialMediaLink>
        <SocialMediaLink href={lbpData?.links?.issuerWebsite}>Whitepaper</SocialMediaLink> */}
        {/* {lbpData?.whitepaperUrl && <SocialMediaLink href={lbpData.links.whitepaperUrl}>Dataroom</SocialMediaLink>} */}
        {lbpData?.socialMedia.filter((link) => link?.url)
          .map((link, idx) => (
            <SocialMediaLink key={`link-${idx}`} >
              {link.name}
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



  :hover svg {
    transform: scale(1.2);
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 42%;
  }
`

export default Links
