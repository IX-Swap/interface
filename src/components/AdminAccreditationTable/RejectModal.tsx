import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'

import { ButtonIXSWide } from 'components/Button'

import clipboardTextIcon from '../../assets/images/clipboard-text .svg'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import closeIcon from '../../assets/images/cross.svg'
import { useDeclineAccreditation } from 'state/admin/hooks'

interface Props {
  isModalOpen: boolean
  searchValue: string
  closeModal: () => void
  id: number
}

export const RejectModal = ({ searchValue, isModalOpen, closeModal, id }: Props) => {
  const declineAccreditation = useDeclineAccreditation()
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

  const onReject = async () => {
    try {
      await declineAccreditation({ id, message: value }, searchValue)
      closeModal()
    } catch (e) {}
  }

  return (
    <RedesignedWideModal isOpen={isModalOpen} onDismiss={closeModal}>
      <ModalContainer>
        <ModalContent>
          <Title>
            <Trans>Reject</Trans>
            <img src={closeIcon} alt={closeIcon} width="18px" height="18px" onClick={closeModal} />
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
  display: grid;
  grid-template-columns: auto 32px;
  grid-gap: 15px;
  align-items: center;
  > img {
    cursor: pointer;
  }
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
  padding: 32px 42px 42px;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
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
    color: ${({ theme }) => theme.text9};
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  padding: 16px 22px;
  margin-bottom: 31px;
  height: 308px;
`
