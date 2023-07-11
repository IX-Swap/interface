import React from 'react'
import styled, { useTheme } from 'styled-components'

import Portal from '@reach/portal'

import { ChevronRight, ChevronLeft, X } from 'react-feather'

import { OfferFile, OfferFileType } from 'state/launchpad/types'

import { ReactComponent as PlayButton } from 'assets/launchpad/svg/play-button.svg'

interface Props {
  initial?: OfferFile
  files: OfferFile[]

  onClose: () => void
}

export const OfferGalleryViewer: React.FC<Props> = (props) => {
  const theme = useTheme()
  const container = React.useRef<HTMLDivElement>(null)

  const [activeMedia, setActiveMedia] = React.useState(props.initial ?? props.files[0])

  const activeMediaIndex = React.useMemo(() => props.files.findIndex((x) => x === activeMedia), [activeMedia])

  const hasNext = React.useMemo(() => activeMediaIndex < props.files.length - 1, [activeMediaIndex])
  const hasPrevious = React.useMemo(() => activeMediaIndex > 0, [activeMediaIndex])

  const selectActive = React.useCallback((media: OfferFile) => {
    setActiveMedia(media)
  }, [])

  const showNext = React.useCallback(() => setActiveMedia(props.files[activeMediaIndex + 1]), [activeMediaIndex])
  const showPrevious = React.useCallback(() => setActiveMedia(props.files[activeMediaIndex - 1]), [activeMediaIndex])

  const close = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (event.target === container.current) {
      props.onClose()
    }
  }, [])

  return (
    <Portal>
      <ViewerContainer ref={container} onClick={close}>
        <CloseButton onClick={props.onClose}>
          <X size="40" color={theme.launchpad.colors.foreground} />
        </CloseButton>

        <ViewerActiveMedia>
          <MediaEntry canPlayVideo media={activeMedia} />
        </ViewerActiveMedia>

        <ViewerMediaSelector>
          {props.files.map((media, idx) => (
            <ViewerMediaEntry
              key={`viewer-media-${idx}`}
              active={media === activeMedia}
              onClick={() => selectActive(media)}
            >
              <MediaEntry media={media} />
            </ViewerMediaEntry>
          ))}
        </ViewerMediaSelector>

        {hasPrevious && (
          <ViewerControl area="left" onClick={showPrevious}>
            <ChevronLeft size="50" />
          </ViewerControl>
        )}
        {hasNext && (
          <ViewerControl area="right" onClick={showNext}>
            <ChevronRight size="50" />
          </ViewerControl>
        )}
      </ViewerContainer>
    </Portal>
  )
}

interface MediaEntryProps {
  media: OfferFile
  canPlayVideo?: boolean
}

export const MediaEntry: React.FC<MediaEntryProps> = (props) => {
  return (
    <>
      {props.media.type === OfferFileType.image && <Image src={props.media.file.public} />}
      {props.media.type === OfferFileType.video && props.canPlayVideo && <VideoViewer src={props.media.videoUrl} />}
      {props.media.type === OfferFileType.video && !props.canPlayVideo && (
        <VideoThumbnail>
          <PlayButtonWrapper>
            <PlayButton />
          </PlayButtonWrapper>
        </VideoThumbnail>
      )}
    </>
  )
}

enum VideoLinkType {
  youtube,
  youtubeShare,
  other,
}

interface VideoViewerProps {
  src: string
}

const VideoViewer: React.FC<VideoViewerProps> = (props) => {
  const linkType = React.useMemo(() => {
    if (/youtube.com/.test(props.src)) {
      return VideoLinkType.youtube
    }

    if (/youtu.be/.test(props.src)) {
      return VideoLinkType.youtubeShare
    }

    return VideoLinkType.other
  }, [props.src])

  const youtubeVideoId = React.useMemo(() => {
    switch (linkType) {
      case VideoLinkType.youtube:
        const [path, query] = props.src.split('?')

        if (!query) {
          return path.split('/').pop()
        }

        const queryParams = query
          .split('&')
          .map((x) => x.split('='))
          .map(([key, value]) => ({ key, value }))

        const link = queryParams.find((x) => x.key === 'v')

        if (link) {
          return link.value
        }

        return path.split('/').pop()

      case VideoLinkType.youtubeShare:
        const queryShare = props.src.split('?').shift()!.split('/').pop()

        return queryShare

      default:
        return null
    }
  }, [props.src, linkType])

  switch (linkType) {
    case VideoLinkType.youtube:
    case VideoLinkType.youtubeShare:
      return (
        <YoutubeVideo
          width="660"
          height="415"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></YoutubeVideo>
      )

    case VideoLinkType.other:
      return <Video src={props.src} controls />
  }
}

const ViewerContainer = styled.div`
  display: grid;

  grid-template-columns: 1fr minmax(auto, 1200px) 1fr;
  grid-template-rows: 1fr 120px;
  grid-template-areas:
    'left-control main-media right-control'
    '. media-selector .';

  gap: 1rem;
  padding: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  background: rgba(6, 6, 40, 0.6);
  backdrop-filter: blur(16px);
`

const ViewerActiveMedia = styled.div`
  grid-area: main-media;
  place-self: center;
  height: 60vh;
`

const ViewerMediaSelector = styled.div`
  grid-area: media-selector;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  overflow-x: show;
`

const ViewerControl = styled.div<{ area: 'left' | 'right' }>`
  grid-area: ${(props) => props.area}-control;
  place-self: center;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.3);
  }
`

const ViewerMediaEntry = styled.div<{ active: boolean }>`
  opacity: ${(props) => (props.active ? '1' : '0.2')};
  border-radius: 8px;
  height: 120px;
  cursor: pointer;
  transition: transform 0.3s, opacity 0.3s;
  :hover {
    transform: scale(1.05);
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`

const Video = styled.video`
  border-radius: 8px;
`

const YoutubeVideo = styled.iframe`
  max-width: 100%;
  max-height: 100%;
`

const VideoThumbnail = styled.div`
  position: relative;
  height: 100%;
  width: 180px;
  border-radius: 8px;
  background: ${(props) => props.theme.launchpad.colors.foreground};
  backdrop-filter: blur(16px);
`

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`

const CloseButton = styled.button`
  border: none;
  background: transparent;
  position: fixed;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  transition: transform 0.3s;
  :hover {
    transform: scale(1.2);
  }
`
