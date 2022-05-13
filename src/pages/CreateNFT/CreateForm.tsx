import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import styled from 'styled-components'

import { TYPE } from 'theme'
import { NftSizeLimit, NameSizeLimit, DescriptionSizeLimit } from 'constants/misc'
import { ButtonIXSGradient } from 'components/Button'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { AcceptFiles, FileTypes } from 'components/Upload/types'
import { getfileType } from 'components/Upload/utils'
import { routes } from 'utils/routes'

import { useAuthState } from 'state/auth/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal, useAddPopup } from 'state/application/hooks'
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
import { FileUploader } from './FileUploader'
import { StyledInput, StyledCreateCollectionBtn, StyledTextarea } from './styleds'

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
    onClearState,
  } = useCreateAssetActionHandlers()
  const { chainId } = useActiveWeb3React()
  const [isNotValid, setValidationStatus] = useState(true)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [beyondLimit, setLimit] = useState<string | null>(null)
  const [descriptionError, setDescriptionError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)
  const [maxSupplyError, setMaxSupplyError] = useState<string | null>(null)
  const [cleared, setClearState] = useState(false)
  const { account } = useActiveWeb3React()
  const { token } = useAuthState()

  const isLoggedIn = !!token && !!account
  const history = useHistory()
  const createAsset = useCreateNftAssetForm(history)
  const toggle = useToggleModal(ApplicationModal.PROPERTIES)
  const toggleNumeric = useToggleModal(ApplicationModal.LEVELS)
  const fetchMyCollections = useFetchMyCollections()

  const addPopup = useAddPopup()

  const toggleLevelsStats = (traitType: TraitType) => {
    onSetActiveTraitType(traitType)
    toggleNumeric()
  }
  // const onSelectCreateCollection = useCallback(() => {}, [onSetCollection])

  const onSelectCollection = useCallback(
    (collection: NFTCollection) => {
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
    if (
      !beyondLimit &&
      file &&
      name &&
      !nameError &&
      !descriptionError &&
      !maxSupplyError &&
      (collection || newCollectionName)
    ) {
      setValidationStatus(getfileType(file) !== FileTypes.IMAGE ? !preview : false)
      return
    }

    setValidationStatus(true)
  }, [beyondLimit, file, name, collection, newCollectionName, preview, nameError, descriptionError, maxSupplyError])

  const checkNameLimit = useCallback(() => {
    setNameError(name.length > NameSizeLimit ? `Max length is ${NameSizeLimit} chars` : null)
  }, [name])

  const checkDescriptionLimit = useCallback(() => {
    setDescriptionError(
      description.length > DescriptionSizeLimit ? `Max length is ${DescriptionSizeLimit} chars` : null
    )
  }, [description])

  const checkMaxSupplyLimit = useCallback(() => {
    setMaxSupplyError(!maxSupply || maxSupply <= 0 ? `Max number of items in collection must be greater than 0` : null)
  }, [maxSupply])

  useEffect(() => {
    onClearState()
    setClearState(true)
  }, [])

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
    checkMaxSupplyLimit()
  }, [checkMaxSupplyLimit])

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

  const isNotImage = file && getfileType(file) !== FileTypes.IMAGE

  return (
    <>
      {(pending || !isLoggedIn) && (
        <LoaderContainer>
          <LoaderThin size={63} />
        </LoaderContainer>
      )}

      <LevelsPopup
        levels={activeTraitType === TraitType.PROGRESS ? levels : stats}
        setLevels={activeTraitType === TraitType.PROGRESS ? onSetLevels : onSetStats}
        traitType={activeTraitType}
      />
      {cleared && <PropertiesPopup properties={properties} setProperties={onSetProperties} />}
      <Flex mb={4} flexDirection={'column'}>
        <Label htmlFor="collection" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex">
            <TYPE.body>
              <Trans>Collection</Trans>
            </TYPE.body>
            <TYPE.error error>*</TYPE.error>
          </Box>
          <StyledCreateCollectionBtn as={NavLink} to={routes.nftCollectionCreate} target="_blank">
            + Collection
          </StyledCreateCollectionBtn>
        </Label>
        <Box width={1}>
          <CollectionDropdown
            onSelect={onSelectCollection}
            selectedCollection={collection}
            newCollectionName={newCollectionName}
          />
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1}>
          <Label htmlFor="name" flexDirection="column" mb={2}>
            <Box display="flex">
              <TYPE.body>
                <Trans>Name</Trans>
              </TYPE.body>
              <TYPE.error error>*</TYPE.error>
            </Box>
          </Label>
          <StyledInput
            id={'item-name'}
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

          {nameError && <TYPE.error error>{nameError}</TYPE.error>}
        </Box>
      </Flex>

      <Flex mb={4}>
        <Box width={1}>
          <Label htmlFor="link" flexDirection="column" mb={2}>
            <TYPE.body>
              <Trans>External Link</Trans>
            </TYPE.body>
          </Label>

          <StyledInput
            className="item-link-input"
            id={'item-link'}
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
        </Box>
      </Flex>

      <Flex mb={4}>
        <Box width={1}>
          <Label htmlFor="description" flexDirection="column" mb={3}>
            <TYPE.body>
              <Trans>Description</Trans>
            </TYPE.body>
          </Label>
          <StyledTextarea
            onChange={(e) => onSetDescription(e?.target?.value)}
            placeholder={t`Provide a detailed description of your item`}
          />

          {descriptionError && <TYPE.error error>{descriptionError}</TYPE.error>}
        </Box>
      </Flex>
      <Flex mb={4} onClick={toggle}>
        <Traits type={TraitType.RECTANGLE} traitList={properties} />
      </Flex>
      <Flex mb={4} onClick={() => toggleLevelsStats(TraitType.PROGRESS)}>
        <Traits type={TraitType.PROGRESS} traitList={levels} />
      </Flex>
      <Flex mb={4} onClick={() => toggleLevelsStats(TraitType.NUMBER)}>
        <Traits type={TraitType.NUMBER} traitList={stats} />
      </Flex>
      <Flex mb={4}>
        <NSFWRadio active={isNSFW} setActive={onSetIsNSFW} />
      </Flex>
      <Flex mb={4}>
        <FreezeRadio active={freeze} setActive={onSetFreeze} />
      </Flex>

      <FileUploader title="Image, Video or Audio" onDrop={onSelectFile} file={file} accept={AcceptFiles.FILLES} />
      {isNotImage && (
        <Box width={1} marginTop="12px">
          <Label htmlFor="preview" flexDirection="column" mb={3}>
            <TYPE.descriptionThin fontSize={13}>
              Because you’ve included multimedia, you’ll need to provide an image (PNG, JPG, or GIF) for the card
              display of your item.
            </TYPE.descriptionThin>
          </Label>
          <FileUploader
            title=""
            onDrop={(previewFile) => onSelectPreview(previewFile)}
            file={preview}
            accept={AcceptFiles.IMAGE}
          />
        </Box>
      )}
      <Box margin="40px auto 0">
        {error && (
          <TYPE.error error marginBottom="16px">
            {error}
          </TYPE.error>
        )}
        <ButtonIXSGradient
          style={{ margin: '0 auto' }}
          width="140px"
          disabled={Boolean(isNotValid)}
          onClick={(e) => onSubmit(e)}
        >
          Create NFT
        </ButtonIXSGradient>
      </Box>
    </>
  )
}
