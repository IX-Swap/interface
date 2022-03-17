import React, { useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { Box, Flex } from 'rebass'

import { ButtonGradientBorder, ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { Trait } from 'state/nft/types'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'
import { useAssetFormState, useCreateAssetActionHandlers } from 'state/nft/hooks'
import { FileWithPath } from 'react-dropzone'

import { FileUploader } from './FileUploader'
import {
  StyledModalContentWrapper,
  StyledInput,
  NewCollectionContent,
  NewCollectionNameSizeRow,
  StyledNumericalInput,
  StyledTextarea,
  ChooseFileButton,
} from './styleds'
import { AcceptFiles } from 'components/Upload/types'

interface Props {
  toggle: () => void
}

type ValueTypes = number | string | null | FileWithPath

interface FormChange {
  name: string
  value?: ValueTypes
}

export const NewCollectionPopup = ({ toggle }: Props) => {
  const { newCollectionName, collectionDescription, collectionLogo, maxSupply } = useAssetFormState()

  const [form, handleForm] = useState({
    maxSupply,
    name: newCollectionName,
    description: collectionDescription || '',
    logo: collectionLogo || null,
  })

  const theme = useTheme()
  const { onSetNewCollectionName, onSetMaxSupply, onSetCollectionDescription, onSetCollectionLogo } =
    useCreateAssetActionHandlers()

  const onSave = () => {
    onSetNewCollectionName(form.name)
    onSetMaxSupply(form.maxSupply)
    onSetCollectionDescription(form.description)
    onSetCollectionLogo(form.logo)
    toggle()
  }

  const onFormChange = ({ name, value }: FormChange) => {
    handleForm((state) => ({ ...state, [name]: value }))
  }

  const onLogoDrop = (file: any) => {
    handleForm((state) => ({ ...state, logo: file }))
  }

  return (
    <RedesignedWideModal isOpen onDismiss={toggle} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="properties-popup">
        <StyledModalContentWrapper>
          <RowBetween>
            <TYPE.title5>
              <Trans>Collection</Trans>
            </TYPE.title5>
            <CloseIcon data-testid="cross" onClick={toggle} />
          </RowBetween>
          <NewCollectionContent>
            <Row marginBottom="8px">
              <FileUploader
                title=""
                file={form.logo}
                onDrop={onLogoDrop}
                isLogo
                accept={AcceptFiles.IMAGE}
                description={`PNG, JPG, SVG. \n 350 x 350`}
              />
              <Column>
                <TYPE.body color="rgba(237, 206, 255, 0.5)">
                  <Trans>We recommend an image</Trans>
                  <br />
                  <Trans>of at least 300x300. Gifs work too.</Trans>
                  <br />
                  <Trans>Max 5mb.</Trans>
                </TYPE.body>
                <ChooseFileButton>Choose File</ChooseFileButton>
              </Column>
            </Row>
            <NewCollectionNameSizeRow>
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
                  id={'collection-name'}
                  onChange={(e) => onFormChange({ name: 'name', value: e?.target?.value })}
                  placeholder={t`Collection Name...`}
                  className="item-name-input"
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  error={false}
                  pattern=".*$"
                  value={form.name}
                  disabled={false}
                />

                {/* {nameError && <TYPE.error error>{nameError}</TYPE.error>} */}
              </Box>
              <Box width={1}>
                <Label htmlFor="name" flexDirection="column" mb={2}>
                  <Box display="flex">
                    <TYPE.body>
                      <Trans>Collection Size</Trans>
                    </TYPE.body>
                    <TYPE.error error>*</TYPE.error>
                  </Box>
                </Label>
                <StyledNumericalInput
                  id={'collection-name'}
                  onUserInput={(value) => onFormChange({ name: 'maxSupply', value })}
                  placeholder="1000"
                  className="item-name-input"
                  value={form.maxSupply}
                />

                {/* {nameError && <TYPE.error error>{nameError}</TYPE.error>} */}
              </Box>
            </NewCollectionNameSizeRow>
            <Box width={1}>
              <Label htmlFor="name" flexDirection="column" mb={2}>
                <TYPE.body>
                  <Trans>Description</Trans>
                </TYPE.body>
              </Label>
              <StyledTextarea
                onChange={(e) => onFormChange({ name: 'description', value: e?.target?.value })}
                placeholder={t`Provide a detailed description of your collection...`}
                value={form.description}
              />

              {/* {nameError && <TYPE.error error>{nameError}</TYPE.error>} */}
            </Box>

            <ButtonIXSWide onClick={onSave}>Save</ButtonIXSWide>
          </NewCollectionContent>
        </StyledModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
