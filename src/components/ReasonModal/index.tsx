import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'

import { ModalBlurWrapper, ModalContentWrapper, TYPE, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonIXSWide } from 'components/Button'

import clipboardTextIcon from '../../assets/images/clipboard-text .svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAction: (reason?: string) => void
  actionBtnText: string
  title?: string
  inputLabel: string
  isRejectingApprovedKYC: boolean
}

export const ReasonModal = ({
  isOpen,
  onClose,
  onAction,
  actionBtnText,
  title,
  inputLabel,
  isRejectingApprovedKYC,
}: Props) => {
  const [value, handleValue] = useState('')
  const [error, handleError] = useState('')
  const valdiate = useCallback(() => {
    if (value.length > 1000) {
      handleError(t`Maximum is 1000 chars`)
    } else {
      handleError('')
    }
  }, [value])

  useEffect(() => {
    valdiate()
  }, [value, valdiate])

  const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleValue(e.target.value)
  }

  const onSubmit = () => {
    onAction(value)
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <ModalBlurWrapper data-testid="depositPopup">
        <ModalContent>
          <Title>
            {title && <span>{t`${title}`}</span>}
            <CloseIcon data-testid="cross" onClick={onClose} />
          </Title>
          {isRejectingApprovedKYC && (
            <>
              <TYPE.body2 marginBottom="8px">
                <Trans>Are you sure you want to reject this KYC after it was approved?</Trans>
              </TYPE.body2>
              <TYPE.smallError marginBottom="12px" fontSize={12}>
                <Trans>BE AWARE: All connected accreditations will be deleted for this KYC!</Trans>
              </TYPE.smallError>
            </>
          )}
          <LabelContainer>
            <Label>{t`${inputLabel}`}</Label>
            <img src={clipboardTextIcon} alt="clipboardTextIcon" />
          </LabelContainer>
          <Textarea onChange={onValueChange} value={value} />
          <ButtonIXSWide disabled={Boolean(error) || !value} onClick={onSubmit}>
            {t`${error || actionBtnText}`}
          </ButtonIXSWide>
        </ModalContent>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Label = styled.div`
  color: ${({ theme: { text2 } }) => text2};
  margin-right: 10px;
`

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 13px;
`

const Textarea = styled.textarea`
  resize: none;
  background-color: ${({ theme }) => `${theme.bg12}40`};
  font-weight: 300;
  font-size: 16px;
  border-radius: 36px;
  width: 100%;
  outline: none;
  border: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.text9};
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text2)};
  padding: 16px 22px;
  margin-bottom: 31px;
  height: 308px;
`
