import React from 'react'
import styled from 'styled-components'

import { Offer, OfferFile, OfferFileType } from 'state/launchpad/types'

import { ReactComponent as TelegramLogo } from 'assets/launchpad/svg/social/telegram.svg'
import { ReactComponent as XLogo } from 'assets/launchpad/svg/social/twitter.svg'
import { ReactComponent as MLogo } from 'assets/launchpad/svg/social/m.svg'
import { ReactComponent as DiscordLogo } from 'assets/launchpad/svg/social/discord.svg'
import { ReactComponent as YoutubeLogo } from 'assets/launchpad/svg/social/youtube.svg'
import { ReactComponent as LinkedInLogo } from 'assets/launchpad/svg/social/linkedin.svg'
import { ReactComponent as RedditLogo } from 'assets/launchpad/svg/social/reddit.svg'
import { ReactComponent as CoingeckoLogo } from 'assets/launchpad/svg/social/coingecko.svg'
import { ReactComponent as InstagramLogo } from 'assets/launchpad/svg/social/instagram.svg'
import OtherLogo from 'assets/images/otherMediaIcon.svg'
import { MediaEntryItemViewer, OfferGalleryViewer } from './OfferGalleryViewer'
import { text8 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS, TYPE } from 'theme'
import { isMobile } from 'react-device-detect'
import { Flex } from 'rebass'
import { getPublicAssetUrl } from 'components/TokenLogo/utils'

interface Props {
  offer: Offer
}

export const OfferGallery: React.FC<Props> = (props) => {
  const [showViewer, setShowViewer] = React.useState(false)
  const [initialViewerFile, setInitialViewerFile] = React.useState<OfferFile>()

  const socialMedialLinks = React.useMemo(
    () => [
      { url: props.offer?.socialMedia?.x, logo: <XLogo /> },
      { url: props.offer?.socialMedia?.telegram, logo: <TelegramLogo /> },
      { url: props.offer?.socialMedia?.linkedin, logo: <LinkedInLogo /> },
      { url: props.offer?.socialMedia?.youtube, logo: <YoutubeLogo /> },
      { url: props.offer?.socialMedia?.coinmarketcap, logo: <MLogo /> },
      { url: props.offer?.socialMedia?.coingecko, logo: <CoingeckoLogo /> },
      { url: props.offer?.socialMedia?.discord, logo: <DiscordLogo /> },
      { url: props.offer?.socialMedia?.reddit, logo: <RedditLogo /> },
      { url: props.offer?.socialMedia?.instagram, logo: <InstagramLogo /> },
      { url: props.offer?.socialMedia?.others, logo: <img src={OtherLogo} /> },
    ],
    []
  )

  const cardImage = React.useMemo(
    () => ({ file: props.offer?.cardPicture, type: OfferFileType.image, videoUrl: '' }),
    []
  )
  const gallery = React.useMemo(
    () => props.offer?.files.filter((x) => x.type === OfferFileType.video || x.type === OfferFileType.image),
    []
  )

  const openViewer = React.useCallback((file?: OfferFile) => {
    setShowViewer(true)
    setInitialViewerFile(file)
  }, [])

  return (
    <div>
      <GalleryCarousel>
        <GalleryCarouselMainImage onClick={() => openViewer(cardImage)}>
          <GalleryCarouselImage src={getPublicAssetUrl(props.offer?.cardPicture)} />
        </GalleryCarouselMainImage>

        <GalleryCarouselExtraMediaList style={{ height: gallery?.length > 0 ? '160px' : '' }}>
          {gallery.slice(0, 3).map((media, idx) => (
            <GalerryCarouselEntry key={`carousel-${idx}`} onClick={() => openViewer(media)}>
              <MediaEntryItemViewer media={media} />
            </GalerryCarouselEntry>
          ))}

          {gallery.length > 3 && (
            <GalleryCarouselExtra onClick={() => openViewer()}>
              <Flex
                color="#2172E5"
                fontWeight={'800'}
                width={150}
                height={150}
                justifyContent="center"
                alignItems="center"
              >
                +{gallery.length - 3}
              </Flex>
            </GalleryCarouselExtra>
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
      {isMobile ? (
        <>
          <SocialMediaLinks>
            <SocialMediaLink href={props.offer?.issuerWebsite}>Website</SocialMediaLink>
            {props.offer?.whitepaperUrl && <SocialMediaLink href={props.offer.whitepaperUrl}>Dataroom</SocialMediaLink>}
            {socialMedialLinks
              .filter((link) => link.url)
              ?.map((link, idx) => (
                <SocialMediaLink key={`link-${idx}`} href={link.url}>
                  {link.logo}
                </SocialMediaLink>
              ))}
          </SocialMediaLinks>
        </>
      ) : (
        <SocialMediaLinks>
          <SocialMediaLink target="_blank" rel="noopener noreferrer" href={props.offer?.issuerWebsite}>
            Website
          </SocialMediaLink>
          {props.offer?.whitepaperUrl && (
            <SocialMediaLink target="_blank" rel="noopener noreferrer" href={props.offer.whitepaperUrl}>
              Dataroom
            </SocialMediaLink>
          )}
          {socialMedialLinks
            .filter((link) => link.url)
            .map((link, idx) => (
              <SocialMediaLink target="_blank" rel="noopener noreferrer" key={`link-${idx}`} href={link.url}>
                {link.logo}
              </SocialMediaLink>
            ))}
        </SocialMediaLinks>
      )}
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

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 20px;
  }
`

const GalleryCarouselMainImage = styled.div`
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  object-fit: contain;
  place-self: stretch;
  cursor: pointer;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: 250px;
    display: contents;
    padding: 20px;
  }
`

const GalleryCarouselExtraMediaList = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 1rem;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    overflow-x: auto;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`

const GalleryCarouselImage = styled.img`
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  width: -webkit-fill-available;
  object-fit: fill;
`

const GalerryCarouselEntry = styled.div`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
  height: 150px;
  width: 150px;
  color: ${(props) => props.theme.launchpad.colors.text.title};
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.05);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
`

const GalleryCarouselExtra = styled.div`
  display: grid;
  place-content: center;
  width: 150px;
  height: 150px;
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
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    gap: 10px;
    justify-content: flex-start;
    margin-left: 20px;
  }
`

const SocialMediaLink = styled.a`
  display: grid;
  place-content: center;
  height: 36px;
  padding: 10px;
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
    padding: 12px;
  }
  cursor: pointer;
  target: '_blank';
  rel: 'noopener noreferrer';
`
