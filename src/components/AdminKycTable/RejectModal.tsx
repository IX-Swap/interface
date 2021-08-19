import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'

import { ButtonIXSWide } from 'components/Button'

import clipboardTextIcon from '../../assets/images/clipboard-text .svg'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'

interface Props {
  isModalOpen: boolean
  closeModal: () => void
}

export const RejectModal = ({ isModalOpen, closeModal }: Props) => {
  const [value, handleValue] = useState('Your KYC was rejected. Please contact us if you have any questions.')
  const [error, handleError] = useState('')

  const valdiate = useCallback(() => {
    if (value.length > 10000) {
      handleError(t`Maximum is 10000 chars`)
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

  const onReject = () => {
    closeModal()
  }

  return (
    <RedesignedWideModal isOpen={isModalOpen} onDismiss={closeModal}>
      <ModalContainer>
        <ModalContent>
          <Title>
            <Trans>Reject</Trans>
          </Title>
          <LabelContainer>
            <Label>Accompanying text</Label>
            <img src={clipboardTextIcon} alt="clipboardTextIcon" />
          </LabelContainer>
          <Textarea onChange={onValueChange} value={value} />

          <ButtonIXSWide disabled={Boolean(error)} onClick={onReject}>
            <Trans>{error || 'Reject'}</Trans>
          </ButtonIXSWide>
        </ModalContent>
      </ModalContainer>
    </RedesignedWideModal>
  )
}

const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 18px;
`

const ModalContainer = styled.div`
  background: ${({ theme: { bgG8 } }) => bgG8};
  padding: 35px;
  border-radius: 45px;
  backdrop-filter: blur(20px);
  @media (max-width: 768px) {
    width: calc(100% - 24px);
    padding: 12px;
    border-radius: 12px;
    margin: 0 auto;
  }
`

const ModalContent = styled.div`
  background: ${({ theme: { bgG4 } }) => bgG4};
  width: 555px;
  padding: 42px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
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
  background-color: ${({ theme }) => theme.bg12};
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
    color: #edceff50;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  padding: 16px 22px;
  margin-bottom: 31px;
  height: 308px;
  @media (max-width: 768px) {
    /* height: 308px; */
  }
`
