import React, { useState } from 'react'
import { t, Trans } from '@lingui/macro'

import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import Row, { RowBetween } from 'components/Row'
import useTheme from 'hooks/useTheme'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { Trait } from 'state/nft/types'
import { CloseIcon, ModalBlurWrapper, TYPE } from 'theme'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'

import {
  StyledModalContentWrapper,
  AddItemContainer,
  AddNewItemButton,
  PropertyInputsContainer,
  StyledInput,
  PropertyInputsNames,
} from './styleds'

export const PropertiesPopup = ({
  properties,
  setProperties,
}: {
  properties: Array<Trait>
  setProperties: (properties: Array<Trait>) => void
}) => {
  const isOpen = useModalOpen(ApplicationModal.PROPERTIES)
  const toggle = useToggleModal(ApplicationModal.PROPERTIES)
  const [localProperties, setLocalProperties] = useState(properties)
  const theme = useTheme()
  const onClose = () => {
    const copy = [...localProperties].filter((record) => record.trait_type && record.value)
    setProperties(copy)
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
        <StyledModalContentWrapper>
          <RowBetween>
            <TYPE.title5>
              <Trans>Add Properties</Trans>
            </TYPE.title5>
            <CloseIcon data-testid="cross" onClick={toggle} />
          </RowBetween>
          <Column style={{ marginTop: '8px', padding: '0' }}>
            <Row>
              <TYPE.description2 color={`${theme.text2}80`}>
                <Trans>
                  Properties show up underneath your item, are clickable, and can be filtered in your collection&apos;s
                  sidebar.
                </Trans>
              </TYPE.description2>
            </Row>
          </Column>
          <Column>
            <AddItemContainer>
              {Boolean(localProperties.length) && (
                <PropertyInputsNames>
                  <div>
                    <Trans>Type</Trans>
                  </div>
                  <div>
                    <Trans>Name</Trans>
                  </div>
                </PropertyInputsNames>
              )}
              {localProperties.map((property, index) => {
                return (
                  <PropertyInputsContainer key={index} haveDelete={Boolean(property.trait_type)}>
                    <div className="delete-row" onClick={() => deleteProperty({ index })}>
                      <CrossIcon />
                    </div>
                    <StyledInput
                      onChange={(e: any) => updateLocalProperties({ index, trait_type: e?.target?.value })}
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
                    <StyledInput
                      onChange={(e: any) => updateLocalProperties({ index, value: e?.target?.value })}
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
                  </PropertyInputsContainer>
                )
              })}
              <AddNewItemButton onClick={() => addProperty()}>Add more</AddNewItemButton>
            </AddItemContainer>
          </Column>
          <ButtonIXSWide onClick={() => saveFinalProperties()}>Save</ButtonIXSWide>
        </StyledModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
