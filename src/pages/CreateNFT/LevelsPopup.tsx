import { t, Trans } from '@lingui/macro'
import { Label } from '@rebass/forms'
import { ButtonGradientBorder, ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { Input as NumericalInput } from 'components/NumericalInput'
import { ContainerRow, Input, InputContainer, InputPanel } from 'components/Input'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween, RowStart } from 'components/Row'
import useTheme from 'hooks/useTheme'
import React, { useState, useEffect } from 'react'
import { Box, Flex } from 'rebass'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { CloseIcon, ModalBlurWrapper, ModalContentWrapper, ModalPadding, TYPE } from 'theme'
import { NumericTrait, traitsTitle, TraitType } from './types'

export const LevelsPopup = ({
  levels,
  setLevels,
  traitType,
}: {
  levels: Array<NumericTrait>
  setLevels: (properties: Array<NumericTrait>) => void
  traitType: TraitType
}) => {
  const isOpen = useModalOpen(ApplicationModal.LEVELS)
  const toggle = useToggleModal(ApplicationModal.LEVELS)
  const [localLevels, setLocalLevels] = useState<Array<NumericTrait>>([])
  const theme = useTheme()
  const onClose = () => {
    toggle()
  }

  useEffect(() => {
    if (isOpen) {
      setLocalLevels([...levels, { trait_type: '', value: 3, max_value: 5 }])
    }
  }, [isOpen, levels])

  const saveFinalLevels = () => {
    const copy = [...localLevels].filter(
      (record) => record.trait_type && record.max_value > 0 && record.max_value >= record.value
    )
    setLevels(copy)
    setLocalLevels(copy)
    onClose()
  }

  const deleteLevel = ({ index }: { index: number }) => {
    if (localLevels.length === 1) {
      setLocalLevels([{ trait_type: '', value: 3, max_value: 5 }])
      return
    }
    const copy = [...localLevels]
    const updated = copy.filter((record, i) => i !== index)
    setLocalLevels(updated)
  }

  const addLevel = () => {
    const updated = [...localLevels, { trait_type: '', value: 3, max_value: 5 }]
    setLocalLevels(updated)
  }

  const updateLocalLevels = ({
    index,
    trait_type,
    value,
    max_value,
  }: {
    index: number
    trait_type?: string
    value?: number
    max_value?: number
  }) => {
    const copy = [...localLevels]
    const updated = copy.map((record, i) => {
      if (i === index) {
        return {
          trait_type: trait_type === undefined ? record.trait_type : trait_type,
          value: value === undefined ? record.value : value,
          max_value: max_value === undefined ? record.max_value : max_value,
        }
      }
      return record
    })
    setLocalLevels(updated)
  }
  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="levels-popup">
        <ModalContentWrapper>
          <ModalPadding>
            <RowBetween>
              <TYPE.title5>
                <Trans>Add</Trans> {traitsTitle[traitType]}
              </TYPE.title5>
              <CloseIcon data-testid="cross" onClick={toggle} />
            </RowBetween>
            <Column style={{ margin: '12px 0px', padding: '0' }}>
              <Row>
                <TYPE.description2 color={`${theme.text2}80`}>
                  {traitsTitle[traitType]}{' '}
                  <Trans>
                    show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.
                  </Trans>
                </TYPE.description2>
              </Row>
            </Column>
            <Column>
              {localLevels.map((level, index) => {
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
                      onClick={() => deleteLevel({ index })}
                    />
                    <Flex mx={-2} mb={4} px={2} flexDirection="column" style={{ gap: '10px' }}>
                      <Box width={1}>
                        <Label htmlFor={`name-${index}`} flexDirection="column" mb={3}>
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
                                onChange={(e) => updateLocalLevels({ index, trait_type: e?.target?.value })}
                                placeholder={t`Speed`}
                                className={`name-input`}
                                type="text"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                error={false}
                                pattern=".*$"
                                value={level.trait_type}
                                disabled={false}
                              />
                            </InputContainer>
                          </ContainerRow>
                        </InputPanel>
                      </Box>
                      <Box width={1}>
                        <Label htmlFor={`value-${index}`} flexDirection="column" mb={3}>
                          <Box mb={1}>
                            <Box display="flex">
                              <TYPE.body fontWeight={600}>
                                <Trans>Value</Trans>
                              </TYPE.body>
                            </Box>
                          </Box>
                        </Label>
                        <Row>
                          <InputPanel id={`value-${index}`} style={{ width: '48%' }}>
                            <ContainerRow>
                              <InputContainer>
                                <NumericalInput
                                  className="value-input"
                                  value={level.value}
                                  maxLength={6}
                                  onUserInput={(e) => updateLocalLevels({ index, value: Number(e) })}
                                />
                              </InputContainer>
                            </ContainerRow>
                          </InputPanel>
                          <Box mx={1}>
                            <Trans>of</Trans>
                          </Box>
                          <InputPanel id={`max-${index}`} style={{ width: '48%' }}>
                            <ContainerRow>
                              <InputContainer>
                                <NumericalInput
                                  className="max-input"
                                  maxLength={6}
                                  value={level.max_value}
                                  placeholder={'5'}
                                  onUserInput={(e) => updateLocalLevels({ index, max_value: Number(e) })}
                                />
                              </InputContainer>
                            </ContainerRow>
                          </InputPanel>
                        </Row>
                      </Box>
                    </Flex>
                  </Flex>
                )
              })}
            </Column>
            <Box my={2}>
              <RowStart>
                <ButtonGradientBorder style={{ width: '100%' }} onClick={() => addLevel()}>
                  Add more
                </ButtonGradientBorder>
              </RowStart>
            </Box>
            <Box my={4}>
              <RowStart>
                <ButtonIXSWide onClick={() => saveFinalLevels()}>Save</ButtonIXSWide>
              </RowStart>
            </Box>
          </ModalPadding>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
