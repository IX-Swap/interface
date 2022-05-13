import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { StyledLogo } from 'components/Upload/styleds'
import { FileTypes } from 'components/Upload/types'
import { ellipsisText, gradientBorder, TYPE } from 'theme'
import { CollectionImage } from 'pages/NFTCollections/styleds'
import { ImageLoader } from 'components/ImageLoader'

import LogoWhite from '../../assets/svg/logo-white.svg'

interface NFTPreviewProps {
  uri: string
}

interface NFTPreviewData {
  file: string
  name: string
  description?: string
  isNSFW: boolean
  type: string
}

const NFTPreviewContainer = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.bgG1};
  padding: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 18px;
  :hover {
    ${gradientBorder}
    ::before {
      border-radius: 18px;
      z-index: 1;
    }
  }
`

const NFTPreviewImage = styled(ImageLoader)`
  border-radius: 16px;
  width: 100%;
  height: 100%;
  max-height: 232px;
  img {
    border-radius: 16px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const NFTPreviewAudio = styled.audio`
  border-radius: 16px;

  min-width: 350px;
  max-width: 350px;
  max-height: 380px;
`

const NFTPreviewVideo = styled.video`
  border-radius: 16px;

  min-width: 350px;
  max-width: 350px;
  max-height: 380px;
  object-fit: cover;
`

const NFTPreviewNameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  row-gap: 8px;
  text-align: center;
`
const NFTPreviewNSFWBadge = styled.div`
  padding: 0.25rem 1.25rem;

  border: 2px solid #333;
  border-radius: 2rem;
`

const LoaderWrapper = styled.div`
  height: 70%;

  display: flex;
  flex-flow: column nowrap;

  justify-content: center;
  align-items: center;

  padding: 2rem;
`

const NFTPreviewWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
  align-items: stretch;
  border-radius: 12px;
  flex-grow: 1;
`

const NFTPreviewWrapperCentered = styled(NFTPreviewWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
`

const Description = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: rgba(237, 206, 255, 0.5);
  ${ellipsisText}
`

const getFileType = (type: string) => {
  if (type.startsWith('audio')) {
    return FileTypes.AUDIO
  }

  if (type.startsWith('video')) {
    return FileTypes.VIDEO
  }

  if (type.startsWith('image')) {
    return FileTypes.IMAGE
  }

  return FileTypes.OTHER
}

type PreviewProps = {
  type: string
  path: string
}

export const NftFilePreview = ({ type, path }: PreviewProps) => {
  const getPreviewElement = useCallback(() => {
    const fileType = getFileType(type)
    switch (fileType) {
      case FileTypes.AUDIO:
        return (
          <NFTPreviewWrapperCentered>
            <NFTPreviewAudio src={path} controls />
          </NFTPreviewWrapperCentered>
        )

      case FileTypes.VIDEO:
        return (
          <NFTPreviewWrapper>
            <NFTPreviewVideo src={path} controls loop />
          </NFTPreviewWrapper>
        )
      case FileTypes.IMAGE:
        return (
          <NFTPreviewWrapper>
            <NFTPreviewImage src={path} />
          </NFTPreviewWrapper>
        )
      default:
        if (!path && !type) {
          return <StyledLogo />
        }
        return null
    }
  }, [type, path])

  return getPreviewElement()
}

const NFTPreview = (props: NFTPreviewProps) => {
  const [info, setInfo] = useState<NFTPreviewData | undefined>()

  useEffect(() => {
    fetch(props.uri)
      .then((res) => res.json())
      .then((res) => ({
        file: res.previewUrl ?? res.file,
        name: res.name,
        description: res.description,
        isNSFW: res.isNSFW === 'true',
      }))
      .then(async (res) => {
        const response = await fetch(res.file)
        const type = response.headers.get('content-type') ?? 'image'

        setInfo({ type, ...res })
      })
  }, [props.uri])

  return (
    <NFTPreviewContainer>
      {info && (
        <>
          <NftFilePreview type={info.type} path={info.file ?? LogoWhite} />
          <NFTPreviewNameContainer>
            <Name>{info?.name}</Name>
            {info.description && <Description>{info.description}</Description>}
            {info.isNSFW && (
              <NFTPreviewNSFWBadge>
                <TYPE.small>NSFW</TYPE.small>
              </NFTPreviewNSFWBadge>
            )}
          </NFTPreviewNameContainer>
        </>
      )}

      {!info && (
        <LoaderWrapper>
          <CollectionImage height="100%" width="100%" src={LogoWhite} />
          {/*<Dots>Loading</Dots>*/}
        </LoaderWrapper>
      )}
    </NFTPreviewContainer>
  )
}

export default NFTPreview
