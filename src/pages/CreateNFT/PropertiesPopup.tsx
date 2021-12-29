import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { ButtonGradientBorder, ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { CloseIcon, ModalBlurWrapper, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { Trait } from './types'

export const PropertiesPopup = ({
  properties,
  setProperties,
}: {
  properties: Array<Trait>
  setProperties: (properties: Array<Trait>) => void
}) => {
  const isOpen = useModalOpen(ApplicationModal.PROPERTIES)
  const toggle = useToggleModal(ApplicationModal.PROPERTIES)
  const [localProperties, setLocalProperties] = useState([...properties, { trait_type: '', value: '' }])
  const theme = useTheme()
  const onClose = () => {
    toggle()
  }
  const saveFinalProperties = () => {
    const copy = [...localProperties].filter((record) => record.trait_type && record.value)
    setProperties(copy)
    setLocalProperties(copy)
    onClose()
  }
  const deleteProperty = ({ index }: { index: number }) => {
    if (localProperties.length === 1) {
      setLocalProperties([{ trait_type: '', value: '' }])
      return
    }
    const copy = [...localProperties]
    const updated = copy.filter((record, i) => i !== index)
    setLocalProperties(updated)
  }

  const addProperty = () => {
    const updated = [...localProperties, { trait_type: '', value: '' }]
    setLocalProperties(updated)
  }

  const updateLocalProperties = ({
    index,
    trait_type,
    value,
  }: {
    index: number
    trait_type?: string
    value?: string
  }) => {
    const copy = [...localProperties]
    const updated = copy.map((record, i) => {
      if (i === index) {
        return {
          trait_type: trait_type === undefined ? record.trait_type : trait_type,
          value: value === undefined ? record.value : value,
        }
      }
      return record
    })
    setLocalProperties(updated)
  }
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="properties-popup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>Add Properties</Trans>
              </TYPE.title5>
              <CloseIcon data-testid="cross" onClick={toggle} />
            </RowBetween>
            <Column style={{ margin: '12px 0px', padding: '0' }}>
              <Row>
                <TYPE.description2 color={`${theme.text2}80`}>
                  <Trans>
                    Properties show up underneath your item, are clickable, and can be filtered in your
                    collection&apos;s sidebar.
                  </Trans>
                </TYPE.description2>
              </Row>
            </Column>
            <Column>
              {localProperties.map((property, index) => {
                return (
                  <Flex
                    flexDirection="column"
                    key={index}
                    my={2}
                    style={{ backgroundColor: theme.bg1, padding: '10px', borderRadius: '20px' }}
                  >
                    <CloseIcon
                      data-testid={`delete-${index}`}
                      style={{ alignSelf: 'flex-end' }}
                      onClick={() => deleteProperty({ index })}
                    />
                    <Flex mx={-2} mb={4} flexDirection="row">
                      <Box width={0.5} px={2}>
                        <Label htmlFor={`type-${index}`} flexDirection="column" mb={3}>
                          <Box mb={1}>
                            <Box display="flex">
                              <TYPE.body fontWeight={600}>
                                <Trans>Type</Trans>
                              </TYPE.body>
                            </Box>
                          </Box>
                        </Label>
                        <InputPanel id={`type-${index}`}>
                          <ContainerRow>
                            <InputContainer>
                              <Input
                                onChange={(e) => updateLocalProperties({ index, trait_type: e?.target?.value })}
                                placeholder={t`Character`}
                                className={`type-input`}
                                type="text"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                error={false}
                                pattern=".*$"
                                value={property.trait_type}
                                disabled={false}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                      </Box>
                      <Box width={0.5} px={2}>
                        <Label htmlFor={`type-${index}`} flexDirection="column" mb={3}>
                          <Box mb={1}>
                            <Box display="flex">
                              <TYPE.body fontWeight={600}>
                                <Trans>Name</Trans>
                              </TYPE.body>
                            </Box>
                          </Box>
                        </Label>
                        <InputPanel id={`name-${index}`}>
                          <ContainerRow>
                            <InputContainer>
                              <Input
                                onChange={(e) => updateLocalProperties({ index, value: e?.target?.value })}
                                placeholder={t`Name`}
                                className={`name-input`}
                                type="text"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                error={false}
                                pattern=".*$"
                                value={property.value}
                                disabled={false}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                      </Box>
                    </Flex>
                  </Flex>
                )
              })}
            </Column>
            <Box my={2}>
              <RowStart>
                <ButtonGradientBorder style={{ width: '100%' }} onClick={() => addProperty()}>
                  Add more
                </ButtonGradientBorder>
              </RowStart>
            </Box>

            <Box my={4}>
              <RowStart>
                <ButtonIXSWide onClick={() => saveFinalProperties()}>Save</ButtonIXSWide>
              </RowStart>
            </Box>
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
