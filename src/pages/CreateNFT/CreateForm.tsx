import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { ButtonGradient } from 'components/Button'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import Upload from 'components/Upload'
import { AcceptFiles, FileTypes } from 'components/Upload/types'
import { getfileType } from 'components/Upload/utils'
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import {
  useCreateNft,
  useDeployCollection,
  useFetchMyCollections,
  useManageCreateForm,
  useMint,
  useNFTState,
} from 'state/nft/hooks'
import { NFTCollection, TraitType } from 'state/nft/types'
import { groupKeyValues } from 'state/nft/utils'
import { ExternalLink, TYPE } from 'theme'
import { CollectionDropdown } from './CollectionDropdown'
import { FreezeRadio } from './FreezeRadio'
import { LevelsPopup } from './LevelsPopup'
import { NSFWRadio } from './NSFWRadio'
import { PropertiesPopup } from './PropertiesPopup'
import { Traits } from './Traits'

export const CreateForm = () => {
  const {
    file,
    setFile,
    preview,
    setPreview,
    name,
    setName,
    link,
    setLink,
    description,
    setDescription,
    activeTraitType,
    setActiveTraitType,
    properties,
    setProperties,
    levels,
    setLevels,
    stats,
    setStats,
    isNSFW,
    setIsNSFW,
    selectedChain,
    setSelectedChain,
    collection,
    setCollection,
    newCollectionName,
    setNewCollectionName,
    freeze,
    setFreeze,
  } = useManageCreateForm()
  const [showCreateNewCollection, setShowCreateNewCollection] = useState(false)
  const deployCollection = useDeployCollection()
  const createNFTAsset = useCreateNft()
  const toggle = useToggleModal(ApplicationModal.PROPERTIES)
  const toggleNumeric = useToggleModal(ApplicationModal.LEVELS)
  const fetchMyCollection = useFetchMyCollections()
  const toggleLevelsStats = (traitType: TraitType) => {
    setActiveTraitType(traitType)
    toggleNumeric()
  }
  const onSelectCreateCollection = useCallback(() => {
    setCollection(null)
    setShowCreateNewCollection(true)
  }, [setCollection])
  const onSetCollection = useCallback(
    (collection: NFTCollection) => {
      setShowCreateNewCollection(false)
      setCollection(collection)
    },
    [setCollection]
  )
  const mint = useMint()

  const onDrop = (file: any) => {
    setFile(file)
  }

  useEffect(() => {
    fetchMyCollection()
  }, [fetchMyCollection])

  const getCreateNftDto = () => {
    if (!name || !file) {
      return null
    }
    return {
      file,
      name,
      freeze,
      keyValues: groupKeyValues({ description, link, properties, stats, levels, isNSFW }),
    }
  }
  const onSubmit = async (e: any) => {
    e.preventDefault()

    // await mint()

    const nftDto = getCreateNftDto()
    if (!nftDto) {
      return
    }
    const assetUri = await createNFTAsset(nftDto)
    if (newCollectionName && showCreateNewCollection) {
      deployCollection({ name: newCollectionName })
    }
    try {
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <LevelsPopup
        levels={activeTraitType === TraitType.PROGRESS ? levels : stats}
        setLevels={activeTraitType === TraitType.PROGRESS ? setLevels : setStats}
        traitType={activeTraitType}
      />
      <PropertiesPopup properties={properties} setProperties={setProperties} />
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
            <Upload onDrop={onDrop} file={file} />
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
              <Upload onDrop={(previewFile) => setPreview(previewFile)} file={preview} accept={AcceptFiles.IMAGE} />
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
              onSelect={onSetCollection}
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
                  It can be changed later on our platform, but it cannot be changed on blockchain
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
                      onChange={(e) => setNewCollectionName(e?.target?.value)}
                      placeholder={`my-cool-collection`}
                    />
                  </InputContainer>
                </ContainerRow>
              </InputPanel>
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
                    onChange={(e) => setLink(e?.target?.value)}
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
              onChange={(e) => setDescription(e?.target?.value)}
              placeholder={t`Provide a detailed description of your item`}
            />
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
          <NSFWRadio active={isNSFW} setActive={setIsNSFW} />
        </Flex>
        <Flex mx={-2} mb={4}>
          <FreezeRadio active={freeze} setActive={setFreeze} />
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
            <ButtonGradient width="140px">Create</ButtonGradient>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
