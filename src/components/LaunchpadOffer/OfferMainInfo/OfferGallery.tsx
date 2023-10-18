import React from 'react'
import styled from 'styled-components'

import { Offer, OfferFile, OfferFileType } from 'state/launchpad/types'

import { ReactComponent as TelegramLogo } from 'assets/launchpad/svg/social/telegram.svg'
import { ReactComponent as TwitterLogo } from 'assets/launchpad/svg/social/twitter.svg'
import { ReactComponent as MLogo } from 'assets/launchpad/svg/social/m.svg'
import { ReactComponent as DiscordLogo } from 'assets/launchpad/svg/social/discord.svg'
import { ReactComponent as YoutubeLogo } from 'assets/launchpad/svg/social/youtube.svg'
import { ReactComponent as LinkedInLogo } from 'assets/launchpad/svg/social/linkedin.svg'
import { ReactComponent as RedditLogo } from 'assets/launchpad/svg/social/reddit.svg'
import { ReactComponent as CoingeckoLogo } from 'assets/launchpad/svg/social/coingecko.svg'

import { MediaEntry, OfferGalleryViewer } from './OfferGalleryViewer'
import { text8 } from 'components/LaunchpadMisc/typography'

interface Props {
  offer: Offer
}

export const OfferGallery: React.FC<Props> = (props) => {
  const [showViewer, setShowViewer] = React.useState(false)
  const [initialViewerFile, setInitialViewerFile] = React.useState<OfferFile>()

  const socialMedialLinks = React.useMemo(
    () => [
      { url: props.offer?.socialMedia?.twitter, logo: <TwitterLogo /> },
      { url: props.offer?.socialMedia?.telegram, logo: <TelegramLogo /> },
      { url: props.offer?.socialMedia?.linkedin, logo: <LinkedInLogo /> },
      { url: props.offer?.socialMedia?.youtube, logo: <YoutubeLogo /> },
      { url: props.offer?.socialMedia?.coinmarketcap, logo: <MLogo /> },
      { url: props.offer?.socialMedia?.coingecko, logo: <CoingeckoLogo /> },
      { url: props.offer?.socialMedia?.discord, logo: <DiscordLogo /> },
      { url: props.offer?.socialMedia?.reddit, logo: <RedditLogo /> },
    ],
    []
  )

  const cardImage = React.useMemo(
    () => ({ file: props.offer?.cardPicture, type: OfferFileType.image, videoUrl: '' }),
    []
  )
  const gallery = React.useMemo(() => props.offer?.files.filter((x) => x.type !== OfferFileType.document), [])

  const openViewer = React.useCallback((file?: OfferFile) => {
    setShowViewer(true)
    setInitialViewerFile(file)
  }, [])

  return (
    <div>
      <GalleryCarousel>
        <GalleryCarouselMainImage onClick={() => openViewer(cardImage)}>
          <GalleryCarouselImage src={props.offer?.cardPicture.public} />
        </GalleryCarouselMainImage>

        <GalleryCarouselExtraMediaList>
          {gallery.slice(0, 3).map((media, idx) => (
            <GalerryCarouselEntry key={`carousel-${idx}`} onClick={() => openViewer(media)}>
              <MediaEntry media={media} />
            </GalerryCarouselEntry>
          ))}

          {gallery.length > 3 && (
            <GalleryCarouselExtra onClick={() => openViewer()}>+{gallery.length - 3}</GalleryCarouselExtra>
          )}
        </GalleryCarouselExtraMediaList>
      </GalleryCarousel>

      {showViewer && (
        <OfferGalleryViewer
          initial={initialViewerFile}
          files={[cardImage, ...gallery]}
          onClose={() => setShowViewer(false)}
        />
      )}

      <SocialMediaLinks>
        <SocialMediaLink href={props.offer?.issuerWebsite}>Website</SocialMediaLink>
        {props.offer?.whitepaperUrl && <SocialMediaLink href={props.offer.whitepaperUrl}>Dataroom</SocialMediaLink>}

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

const GalleryCarousel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
  margin-bottom: 2rem;
`

const GalleryCarouselMainImage = styled.div`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  object-fit: contain;
  place-self: stretch;
  cursor: pointer;
`

const GalleryCarouselExtraMediaList = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 1rem;
  height: 120px;
`

const GalleryCarouselImage = styled.img`
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
`

const GalerryCarouselEntry = styled.div`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  height: 120px;
  max-width: 180px;
  color: ${(props) => props.theme.launchpad.colors.text.title};

  cursor: pointer;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.05);
  }
`

const GalleryCarouselExtra = styled.div`
  display: grid;
  place-content: center;
  width: 80px;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  color: ${(props) => props.theme.launchpad.colors.text.title};

  cursor: pointer;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.05);
  }
`

const SocialMediaLinks = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
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
`
