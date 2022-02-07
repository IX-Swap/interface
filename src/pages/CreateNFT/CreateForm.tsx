import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import styled from 'styled-components'
import { ExternalLink, TYPE } from 'theme'
import { NftSizeLimit, NameSizeLimit, DescriptionSizeLimit } from 'constants/misc'

import { ButtonGradient } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import Upload from 'components/Upload'
import { AcceptFiles, FileTypes } from 'components/Upload/types'
import { getfileType } from 'components/Upload/utils'

import { LOGIN_STATUS, useLogin } from 'state/auth/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal, useShowError, useAddPopup } from 'state/application/hooks'
import { NFTCollection, TraitType } from 'state/nft/types'
import {
  useAssetFormState,
  useCreateAssetActionHandlers,
  useCreateNftAssetForm,
  useFetchMyCollections,
} from 'state/nft/hooks'
import { useActiveWeb3React } from 'hooks/web3'

import { CollectionDropdown } from './CollectionDropdown'
import { FreezeRadio } from './FreezeRadio'
import { LevelsPopup } from './LevelsPopup'
import { NSFWRadio } from './NSFWRadio'
import { PropertiesPopup } from './PropertiesPopup'
import { Traits } from './Traits'
import Slider from 'components/Slider'
import { MAX_SUPPLY_RANGE } from 'state/nft/constants'

export const CreateForm = () => {
  const {
    file,
    name,
    description,
    freeze,
    link,
    properties,
    stats,
    levels,
    isNSFW,
    preview,
    maxSupply,
    collection,
    newCollectionName,
    activeTraitType,
  } = useAssetFormState()
  const {
    onSelectFile,
    onSelectPreview,
    onSetName,
    onSetLink,
    onSetFreeze,
    onSetDescription,
    onSetActiveTraitType,
    onSetProperties,
    onSetLevels,
    onSetStats,
    onSetIsNSFW,
    onSetCollection,
    onSetNewCollectionName,
    onSetMaxSupply,
    onClearState,
  } = useCreateAssetActionHandlers()
  const { chainId } = useActiveWeb3React()
  const [showCreateNewCollection, setShowCreateNewCollection] = useState(false)
  const [isNotValid, setValidationStatus] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [beyondLimit, setLimit] = useState<string | null>(null)
  const [isLogged, setAuthState] = useState(false)
  const [descriptionError, setDescriptionError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)

  const login = useLogin({ mustHavePreviousLogin: false })
  const showError = useShowError()
  const history = useHistory()
  const createAsset = useCreateNftAssetForm(history)
  const toggle = useToggleModal(ApplicationModal.PROPERTIES)
  const toggleNumeric = useToggleModal(ApplicationModal.LEVELS)
  const fetchMyCollections = useFetchMyCollections()

  const addPopup = useAddPopup()

  const checkAuthorization = useCallback(async () => {
    setPending(true)
    const status = await login()

    if (status !== LOGIN_STATUS.SUCCESS) {
      showError(t`To create NFT you need to login. Please try again`)
      history.push('/swap')
    }

    setAuthState(true)
    setPending(false)
  }, [login, setAuthState, history, showError])

  const toggleLevelsStats = (traitType: TraitType) => {
    onSetActiveTraitType(traitType)
    toggleNumeric()
  }
  const onSelectCreateCollection = useCallback(() => {
    onSetCollection(null)
    setShowCreateNewCollection(true)
  }, [onSetCollection])

  const onSelectCollection = useCallback(
    (collection: NFTCollection) => {
      setShowCreateNewCollection(false)
      onSetCollection(collection)
    },
    [onSetCollection]
  )

  const checkFileSize = useCallback(() => {
    if (file) {
      const validation = file.size > NftSizeLimit ? `File is larger than ${NftSizeLimit} bytes` : null
      setLimit(validation)
      return
    }

    setLimit(null)
  }, [file])

  const checkValidation = useCallback(() => {
    if (!beyondLimit && file && name && !nameError && !descriptionError && (collection || newCollectionName)) {
      setValidationStatus(getfileType(file) !== FileTypes.IMAGE ? !preview : false)
      return
    }

    setValidationStatus(true)
  }, [beyondLimit, file, name, collection, newCollectionName, preview, nameError, descriptionError])

  const checkNameLimit = useCallback(() => {
    setNameError(name.length > NameSizeLimit ? `Max length is ${NameSizeLimit} chars` : null)
  }, [name])

  const checkDescriptionLimit = useCallback(() => {
    setDescriptionError(
      description.length > DescriptionSizeLimit ? `Max length is ${DescriptionSizeLimit} chars` : null
    )
  }, [description])

  useEffect(() => {
    onClearState()
  }, [])

  useEffect(() => {
    if (!isLogged && !pending) {
      const timerFunc = setTimeout(checkAuthorization, 3000)

      return () => clearTimeout(timerFunc)
    }
  }, [isLogged, checkAuthorization])

  useEffect(() => {
    setError(null)
    checkValidation()
  }, [checkValidation])

  useEffect(() => {
    checkNameLimit()
  }, [checkNameLimit])

  useEffect(() => {
    checkDescriptionLimit()
  }, [checkDescriptionLimit])

  useEffect(() => {
    checkFileSize()
  }, [checkFileSize])

  useEffect(() => {
    fetchMyCollections(chainId)
  }, [fetchMyCollections, chainId])

  const onSubmit = async (e: any) => {
    setPending(true)

    try {
      e.preventDefault()
      await createAsset()

      addPopup({
        info: {
          success: true,
          summary: `Created your ${name} NFT successfully`,
        },
      })
    } catch (error: any) {
      setError(error.message)
      setPending(false)
    }
  }

  const LoaderContainer = styled.div`
    z-index: 5;
    opacity: 0.4;
    display: flex;
    background-color: #380846;

    color: #ffffff;
    pointer-events: auto;

    align-items: center;
    justify-content: center;
    position: fixed;
    border-radius: inherit;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 100%;
    width: 100%;

    transition: inherit;
    will-change: opacity;
    box-sizing: inherit;
  `

  return (
    <>
      {pending && (
        <LoaderContainer>
          <LoaderThin size={63} />
        </LoaderContainer>
      )}

      <LevelsPopup
        levels={activeTraitType === TraitType.PROGRESS ? levels : stats}
        setLevels={activeTraitType === TraitType.PROGRESS ? onSetLevels : onSetStats}
        traitType={activeTraitType}
      />
      <PropertiesPopup properties={properties} setProperties={onSetProperties} />
      <Box py={3}>
        <Flex mx={-2} mb={4}>
          <Box width={1} px={2}>
            <Label htmlFor="file" flexDirection="column" mb={3}>
              <Box display="flex">
                <TYPE.body fontWeight={600}>Image, Video, Audio, or 3D Model.</TYPE.body>
                <TYPE.error error>*</TYPE.error>
              </Box>
              <TYPE.descriptionThin fontSize={13}>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
              </TYPE.descriptionThin>
            </Label>
            <Upload onDrop={onSelectFile} file={file} />

            {beyondLimit && (
              <TYPE.error fontWeight={500} fontSize={16} error>
                {beyondLimit}
              </TYPE.error>
            )}
          </Box>
        </Flex>
        {file && getfileType(file) !== FileTypes.IMAGE && (
          <Flex mx={-2} mb={4}>
            <Box width={1} px={2}>
              <Label htmlFor="preview" flexDirection="column" mb={3}>
                <Box display="flex">
                  <TYPE.body fontWeight={600}>Preview Image</TYPE.body>
                  <TYPE.error error>*</TYPE.error>
                </Box>
                <TYPE.descriptionThin fontSize={13}>
                  Because you’ve included multimedia, you’ll need to provide an image (PNG, JPG, or GIF) for the card
                  display of your item.
                </TYPE.descriptionThin>
              </Label>
              <Upload
                onDrop={(previewFile) => onSelectPreview(previewFile)}
                file={preview}
                accept={AcceptFiles.IMAGE}
              />
            </Box>
          </Flex>
        )}
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
                    onChange={(e) => onSetName(e?.target?.value)}
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
        <Flex mx={-2} mb={4} flexDirection={'column'}>
          <Label htmlFor="collection" flexDirection="column" mb={3}>
            <Box mb={1}>
              <Box display="flex">
                <TYPE.body fontWeight={600}>
                  <Trans>Collection</Trans>
                </TYPE.body>
                <TYPE.error error>*</TYPE.error>
              </Box>
            </Box>
          </Label>
          <Box width={1} px={2}>
            <CollectionDropdown
              onSelectCreateCollection={onSelectCreateCollection}
              onSelect={onSelectCollection}
              selectedCollection={collection}
              newCollectionName={newCollectionName}
            />
          </Box>
        </Flex>
        {showCreateNewCollection && (
          <Flex mx={-2} mb={4}>
            <Box width={1} px={2}>
              <Label htmlFor="link" flexDirection="column" mb={3}>
                <Box mb={1}>
                  <TYPE.body fontWeight={600}>
                    <Trans>New Collection Name</Trans>
                  </TYPE.body>
                </Box>
                <TYPE.descriptionThin fontSize={13}>
                  Create a new collection to keep up to {maxSupply} items. The name can be changed later on our
                  platform, but it cannot be changed on blockchain
                </TYPE.descriptionThin>
              </Label>
              <InputPanel id={'collection-name'}>
                <ContainerRow>
                  <InputContainer>
                    <Input
                      className="collection-name-input"
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      error={false}
                      pattern=".*$"
                      value={newCollectionName}
                      disabled={false}
                      onChange={(e) => onSetNewCollectionName(e?.target?.value)}
                      placeholder={`my-cool-collection`}
                    />
                  </InputContainer>
                </ContainerRow>
              </InputPanel>
              <Flex flexDirection="column" mt={4}>
                <Label htmlFor="supply-value" mb={2}>
                  <TYPE.body fontWeight={600}>
                    <Trans>Select max number of items in collection</Trans>
                  </TYPE.body>
                </Label>
                <Slider
                  id="supply-value"
                  min={1}
                  step={1}
                  max={MAX_SUPPLY_RANGE}
                  value={maxSupply}
                  onChange={(e) => onSetMaxSupply(e)}
                />
              </Flex>
              <Flex justifyContent="space-between">
                <TYPE.body>{maxSupply}</TYPE.body>
                <TYPE.body>{MAX_SUPPLY_RANGE}</TYPE.body>
              </Flex>
            </Box>
          </Flex>
        )}
        <Flex mx={-2} mb={4}>
          <Box width={1} px={2}>
            <Label htmlFor="link" flexDirection="column" mb={3}>
              <Box mb={1}>
                <TYPE.body fontWeight={600}>
                  <Trans>External Link</Trans>
                </TYPE.body>
              </Box>
              <TYPE.descriptionThin fontSize={13}>
                We will include a link to this URL on this item&apos;s detail page, so that users can click to learn
                more about it. You are welcome to link to your own webpage with more details.
              </TYPE.descriptionThin>
            </Label>
            <InputPanel id={'item-name'}>
              <ContainerRow>
                <InputContainer>
                  <Input
                    className="item-link-input"
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    error={false}
                    pattern=".*$"
                    value={link}
                    disabled={false}
                    onChange={(e) => onSetLink(e?.target?.value)}
                    placeholder={`https://yoursite.io/item/123`}
                  />
                </InputContainer>
              </ContainerRow>
            </InputPanel>
          </Box>
        </Flex>
        <Flex mx={-2} mb={4}>
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
              onChange={(e) => onSetDescription(e?.target?.value)}
              placeholder={t`Provide a detailed description of your item`}
            />

            {descriptionError && <TYPE.error error>{descriptionError}</TYPE.error>}
          </Box>
        </Flex>
        <Flex mx={-2} mb={4} onClick={toggle}>
          <Traits type={TraitType.RECTANGLE} traitList={properties} />
        </Flex>
        <Flex mx={-2} mb={4} onClick={() => toggleLevelsStats(TraitType.PROGRESS)}>
          <Traits type={TraitType.PROGRESS} traitList={levels} />
        </Flex>
        <Flex mx={-2} mb={4} onClick={() => toggleLevelsStats(TraitType.NUMBER)}>
          <Traits type={TraitType.NUMBER} traitList={stats} />
        </Flex>
        <Flex mx={-2} mb={4}>
          <NSFWRadio active={isNSFW} setActive={onSetIsNSFW} />
        </Flex>
        <Flex mx={-2} mb={4}>
          <FreezeRadio active={freeze} setActive={onSetFreeze} />
        </Flex>
        {/* For the moment we will deploy on the chain the user is on */}
        {/* <Flex my={4}>
          <Box width={1}>
            <Label htmlFor="chainId" flexDirection="column" mb={3}>
              <Box mb={1}>
                <TYPE.body fontWeight={600}>
                  <Trans> Blockchain</Trans>
                </TYPE.body>
              </Box>
            </Label>
            <ChainDropdown onSelect={setSelectedChain} selectedChain={selectedChain} />
          </Box>
        </Flex> */}

        <Flex mx={-2} flexWrap="wrap">
          <Box px={2} mr="auto" onClick={(e) => onSubmit(e)}>
            {error && <TYPE.error error>{error}</TYPE.error>}

            {!isNotValid && (
              <ButtonGradient width="140px" disabled={Boolean(isNotValid)}>
                Create
              </ButtonGradient>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}
