import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { ButtonGradient } from 'components/Button'
import { ContainerRow, Input, InputContainer, InputPanel, Textarea } from 'components/Input'
import Upload from 'components/Upload'
import { AcceptFiles, FileTypes } from 'components/Upload/types'
import { getfileType } from 'components/Upload/utils'
import { SupportedChainId } from 'constants/chains'
import { FileWithPath } from 'file-selector'
import React, { useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import { KeyValues, pinFileToIPFS } from 'services/pinataService'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { ExternalLink, TYPE } from 'theme'
import { ChainDropdown } from './ChainDropdown'
import { useGetSupply, useMint } from './hooks'
import { LevelsPopup } from './LevelsPopup'
import { NSFWRadio } from './NSFWRadio'
import { PropertiesPopup } from './PropertiesPopup'
import { Traits } from './Traits'
import { TraitType } from './types'

export const CreateForm = () => {
  const [file, setFile] = useState<FileWithPath | null>(null)
  const [preview, setPreview] = useState<FileWithPath | null>(null)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const toggle = useToggleModal(ApplicationModal.PROPERTIES)
  const [activeTraitType, setActiveTraitType] = useState(TraitType.PROGRESS)
  const toggleNumeric = useToggleModal(ApplicationModal.LEVELS)

  const toggleLevelsStats = (traitType: TraitType) => {
    setActiveTraitType(traitType)
    toggleNumeric()
  }
  const mint = useMint()
  const getSupply = useGetSupply()
  const [properties, setProperties] = useState<Array<{ name: string; value: string }>>([])
  const [levels, setLevels] = useState<Array<{ name: string; value: number; max: number }>>([])
  const [stats, setStats] = useState<Array<{ name: string; value: number; max: number }>>([])
  const [isNSFW, setIsNSFW] = useState(false)
  const [selectedChain, setSelectedChain] = useState(SupportedChainId.MAINNET)
  const onDrop = (file: any) => {
    setFile(file)
  }

  useEffect(() => {
    getSupply()
  })

  const onSubmit = async (e: any) => {
    e.preventDefault()
    await mint()
    return
    // if (!file || !name) {
    //   return
    // }
    // const keyValues: KeyValues = {}
    // if (description) {
    //   keyValues.description = description
    // }
    // if (link) {
    //   keyValues.link = link
    // }
    // if (properties.length) {
    //   keyValues.properties = JSON.stringify(properties)
    // }
    // if (stats.length) {
    //   keyValues.stats = JSON.stringify(stats)
    // }
    // if (levels.length) {
    //   keyValues.levels = JSON.stringify(levels)
    // }
    // keyValues.isNSFW = String(isNSFW)
    // keyValues.selectedChain = selectedChain
    // try {
    //   const result = await pinFileToIPFS({ file, name, keyValues })
    //   console.log(result)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  return (
    <>
      <LevelsPopup
        levels={activeTraitType === TraitType.PROGRESS ? levels : stats}
        setLevels={activeTraitType === TraitType.PROGRESS ? setLevels : setStats}
        traitType={activeTraitType}
      />
      <PropertiesPopup properties={properties} setProperties={setProperties} />
      <Box as="form" py={3}>
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
        <Flex my={4}>
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
        </Flex>
        <Flex mx={-2} flexWrap="wrap">
          <Box px={2} mr="auto" onClick={(e) => onSubmit(e)}>
            <ButtonGradient width="140px">Create</ButtonGradient>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
