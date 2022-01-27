import React, { FC, useState, useEffect, useCallback } from 'react'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { FileWithPath } from 'file-selector'
import { Label } from '@rebass/forms'

import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import Upload from 'components/Upload'
import { ExternalLink, TYPE } from 'theme'
import { ButtonGradient } from 'components/Button'
import { useCollectionActionHandlers, useCollectionFormState } from 'state/nft/hooks'
import { NameSizeLimit, DescriptionSizeLimit } from 'constants/misc'

interface UpdateFormProps {
  collection?: any | null
  onSubmit: () => Promise<any>
  actionName?: string
}

export const CollectionForm = ({ collection, onSubmit, actionName = 'Update' }: UpdateFormProps) => {
  const {
    onSelectLogo: setLogo,
    onSelectBanner: setBanner,
    onSelectCover: setCover,
    onSetDescription: setDescription,
    onSetName: setName,
    onClearCollectionState,
  } = useCollectionActionHandlers()
  const { cover, logo, banner, name, description } = useCollectionFormState()
  const [newLogo, setNewLogo] = useState('')
  const [newBanner, setNewBanner] = useState('')
  const [newCover, setNewCover] = useState('')
  const [isValid, setValidation] = useState(false)
  const [descriptionError, setDescriptionError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)

  const checkValidation = useCallback(() => {
    if (name && description) {
      setValidation(name.length <= NameSizeLimit && description.length <= DescriptionSizeLimit)
      return
    }

    setValidation(false)
  }, [name, description])

  const checkNameLimit = useCallback(() => {
    setNameError(name.length > NameSizeLimit ? `Max length is 100 chars` : null)
  }, [name])

  const checkDescriptionLimit = useCallback(() => {
    setDescriptionError(description.length > DescriptionSizeLimit ? `Max length is 1000 chars` : null)
  }, [description])

  const updateFiles = async () => {
    const logo = await createFile(collection?.logo)
    onLogoDrop(logo?.file)
    setNewLogo(logo?.link)

    const cover = await createFile(collection?.cover)
    onCoverDrop(cover?.file)
    setNewCover(cover?.link)

    const banner = await createFile(collection?.banner)
    onBannerDrop(banner?.file)
    setNewBanner(banner?.link)
  }

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

  const onBannerDrop = (newBanner: any) => {
    setBanner(newBanner)
  }

  useEffect(() => {
    onClearCollectionState()
  }, [])

  useEffect(() => {
    if (collection) {
      setName(collection?.name)
      setDescription(collection?.description)

      updateFiles()
    }
  }, [collection, setName, setDescription])

  useEffect(() => {
    checkValidation()
  }, [checkValidation])

  useEffect(() => {
    checkDescriptionLimit()
  }, [checkDescriptionLimit])

  useEffect(() => {
    checkNameLimit()
  }, [checkNameLimit])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    onSubmit()
    return
  }

  return (
    <Box as="form" py={3}>
      <Flex mx={-2} mb={4}>
        <Box width={1} px={2} mb={5} pb={4}>
          <Label htmlFor="file" flexDirection="column" mb={3}>
            <Box display="flex">
              <TYPE.body fontWeight={600}>Logo image</TYPE.body>
            </Box>
            <TYPE.descriptionThin fontSize={13}>
              This image will also be used for navigation, 350 x 350 recommended
            </TYPE.descriptionThin>
            <Upload width="350px" height="350px" isLogo onDrop={onLogoDrop} file={logo} newFileWithPath={newLogo} />
          </Label>
        </Box>
      </Flex>

      <Flex mx={-2} mb={5}>
        <Box width={1} px={2} mb={5} pb={4}>
          <Label htmlFor="file" flexDirection="column" mb={3}>
            <Box display="flex">
              <TYPE.body fontWeight={600}>Cover image</TYPE.body>
            </Box>
            <TYPE.descriptionThin fontSize={13}>
              (optional) This image will be used for featuring your collection on the homepage, category pages, or other
              promotional areas. 600x400 recommended.
            </TYPE.descriptionThin>
            <Upload width="600px" height="400px" onDrop={onCoverDrop} file={cover} newFileWithPath={newCover} />
          </Label>
        </Box>
      </Flex>

      <Flex mx={-2} mb={4}>
        <Box width={1} px={2} mb={5} pb={5}>
          <Label htmlFor="file" flexDirection="column" mb={3}>
            <Box display="flex">
              <TYPE.body fontWeight={600}>Banner image</TYPE.body>
            </Box>
            <TYPE.descriptionThin fontSize={13}>
              (optional) This image will appear at the top of your collection page. Avoid including too much text in
              this banner image, as the dimensions change on different devices. 1400x400 recommended
            </TYPE.descriptionThin>
            <Upload
              isBanner
              width="100%"
              height="400px"
              onDrop={onBannerDrop}
              file={banner}
              newFileWithPath={newBanner}
            />
          </Label>
        </Box>
      </Flex>

      <Flex mx={-2} mb={4}>
        <Box width={1} px={2}>
          <Label htmlFor="name" flexDirection="column" mb={3}>
            <Box mb={1}>
              <Box display="flex">
                <TYPE.body fontWeight={600}>
                  <Trans>Name</Trans>
                </TYPE.body>
                <TYPE.error error>*</TYPE.error>
              </Box>
            </Box>
          </Label>
          <InputPanel id={'item-name'}>
            <ContainerRow>
              <InputContainer>
                <Input
                  onChange={(e) => setName(e?.target?.value)}
                  placeholder={t`Item name`}
                  className="item-name-input"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  error={false}
                  pattern=".*$"
                  value={name}
                  disabled={false}
                />
              </InputContainer>
            </ContainerRow>
          </InputPanel>

          {nameError && <TYPE.error error>{nameError}</TYPE.error>}
        </Box>
      </Flex>

      <Flex mx={-2} mb={2}>
        <Box width={1} px={2}>
          <Label htmlFor="description" flexDirection="column" mb={3}>
            <Box mb={1}>
              <TYPE.body fontWeight={600}>
                <Trans>Description</Trans>
              </TYPE.body>
            </Box>
            <TYPE.descriptionThin fontSize={13}>
              The description will be included on the item&apos;s detail page underneath its image.{' '}
              <ExternalLink href={'https://www.markdownguide.org/cheat-sheet/'} style={{ fontWeight: 600 }}>
                Markdown
              </ExternalLink>{' '}
              syntax is supported
            </TYPE.descriptionThin>
          </Label>
          <Textarea
            style={{ height: '150px' }}
            onChange={(e) => setDescription(e?.target?.value)}
            placeholder={t`Provide a detailed description of your item`}
            value={description}
          />

          {descriptionError && <TYPE.error error>{descriptionError}</TYPE.error>}
        </Box>
      </Flex>

      <Flex mx={-2} flexWrap="wrap">
        {isValid && (
          <Box px={1} mr="auto" onClick={(e) => handleSubmit(e)}>
            <ButtonGradient width="140px">{actionName}</ButtonGradient>
          </Box>
        )}
      </Flex>
    </Box>
  )
}
