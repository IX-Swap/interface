import { PreviewParent, StyledLogo } from 'components/Upload/styleds'
import { FileTypes } from 'components/Upload/types'
import { Dots } from 'pages/Pool/styleds'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TYPE } from 'theme'
import LogoWhite from '../../assets/svg/logo-white.svg'
import { CollectionImage } from 'pages/NFTCollections/styleds'

interface NFTPreviewProps {
  uri: string
}

interface NFTPreviewData {
  file: string
  name: string

  isNSFW: boolean
  type: string
}

const NFTPreviewContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: space-between;
  align-items: stretch;

  border-radius: 1rem;

  background-color: #1b1b1b;

  min-width: 350px;
  width: 350px;
  height: 450px;
`

const NFTPreviewImage = styled.img`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  min-width: 350px;
  max-width: 350px;
  max-height: 380px;

  object-fit: cover;
`

const NFTPreviewAudio = styled.audio`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  min-width: 350px;
  max-width: 350px;
  max-height: 380px;
`

const NFTPreviewVideo = styled.video`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  min-width: 350px;
  max-width: 350px;
  max-height: 380px;
  object-fit: cover;
`

const NFTPreviewNameContainer = styled.div`
  display: flex;

  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  gap: 1rem;

  padding: 1rem;
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

  flex-flow: column;
  align-items: stretch;

  flex-grow: 1;
`

const NFTPreviewWrapperCentered = styled(NFTPreviewWrapper)`
  display: flex;

  justify-content: center;
  align-items: center;
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
            <TYPE.title5>{info?.name}</TYPE.title5>
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
