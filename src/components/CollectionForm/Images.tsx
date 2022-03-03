import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { FileWithPath } from 'react-dropzone'

import { useCollectionFormState, useCollectionActionHandlers } from 'state/nft/hooks'
import uploadImg from 'assets/images/upload.svg'
import crossImg from 'assets/images/cross.svg'
import Upload from 'components/Upload'
import { AcceptFiles } from 'components/Upload/types'
import Column from 'components/Column'

import { ImagesContainer, LogoUploader, CoverUploader, UploadText, DeleteImage, ImageTitle } from './styled'

interface Props {
  collection?: any | null
}

export const Images = ({ collection }: Props) => {
  const [newLogo, setNewLogo] = useState('')
  const [newCover, setNewCover] = useState('')

  const { onSelectLogo: setLogo, onSelectCover: setCover } = useCollectionActionHandlers()
  const { cover, logo } = useCollectionFormState()

  const updateFiles = async () => {
    const logo = await createFile(collection?.logo)
    onLogoDrop(logo?.file)
    setNewLogo(logo?.link)

    const cover = await createFile(collection?.cover)
    onCoverDrop(cover?.file)
    setNewCover(cover?.link)
  }

  useEffect(() => {
    if (collection) {
      updateFiles()
    }
  }, [collection])

  const createFile = async (file: any) => {
    if (file) {
      const name = file?.name
      const response = await fetch(file?.public)
      const blob = await response.blob()
      const newFile = new File([blob], name, { type: blob.type, lastModified: new Date().getTime() })

      const fileWithPath = newFile as FileWithPath
      return { link: file?.public, file: fileWithPath }
    }

    return null
  }

  const onLogoDrop = (newLogo: any) => {
    setLogo(newLogo)
  }

  const onCoverDrop = (newCover: any) => {
    setCover(newCover)
  }

  const clearLogo = () => {
    setLogo(null)
  }

  const clearCover = () => {
    setCover(null)
  }

  return (
    <ImagesContainer>
      <Column>
        <ImageTitle>
          <Trans>Cover Image</Trans>
        </ImageTitle>
        <CoverUploader file={Boolean(cover)}>
          <Upload onDrop={onCoverDrop} file={cover} newFileWithPath={newCover} accept={AcceptFiles.IMAGE} />
          <img src={uploadImg} alt="uploadImg" />
          <UploadText>
            600 x 400 <br />
            <Trans>
              Drag and Drop
              <br /> or <span>Upload</span>
            </Trans>
          </UploadText>
          {cover && (
            <DeleteImage onClick={clearCover}>
              <img src={crossImg} alt="crossImg" />
            </DeleteImage>
          )}
        </CoverUploader>
      </Column>
      <Column>
        <ImageTitle>
          <Trans>Logo Image</Trans>
        </ImageTitle>
        <LogoUploader file={Boolean(logo)}>
          <Upload onDrop={onLogoDrop} isLogo file={logo} newFileWithPath={newLogo} accept={AcceptFiles.IMAGE} />
          <img src={uploadImg} alt="uploadImg" />
          <UploadText>
            350 x 350 <br />
            <Trans>
              Drag and Drop
              <br /> or <span>Upload</span>
            </Trans>
          </UploadText>
          {logo && (
            <DeleteImage isLogo onClick={clearLogo}>
              <img src={crossImg} alt="crossImg" />
            </DeleteImage>
          )}
        </LogoUploader>
      </Column>
    </ImagesContainer>
  )
}
