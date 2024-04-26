import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { PinnedContentButton } from 'components/Button'
import { useChangeLbpStatus } from 'state/lbp/hooks'
import { ReactComponent as PauseIcon } from '../../../../assets/images/circlePause.svg'
import { ReactComponent as CloseStopIcon } from '../../../../assets/images/circleStop.svg'
import { ReactComponent as PlayIcon } from '../../../../assets/images/circlePlay.svg'

interface BuyModalProps {
  isOpen: boolean
  onClose: () => void
  currentStatus: string
  statusText: any
  lbpId: string
  updateStatus?: any
}

const ConfirmStatus = ({ isOpen, onClose, statusText, lbpId, updateStatus }: BuyModalProps) => {
  const [loading, setLoading] = useState(false)
  const changeLbpStatus = useChangeLbpStatus()
  const handleConfirm = () => {
    setLoading(true)
    const newStatus = getStatusFromString(statusText)
    if (newStatus) {
      changeLbpStatus(lbpId, newStatus)
        .then(() => {
          onClose()
          updateStatus(newStatus)
          setLoading(false)
        })
        .catch((error: any) => {
          setLoading(false)
          console.error('Error changing LBP status:', error)
        })
    }
  }

  const getStatusFromString = (text: string): string | null => {
    switch (text.toLowerCase()) {
      case 'pause':
        return 'paused'
      case 'start':
        return 'live'
      case 'close':
        return 'closed'
      default:
        return null
    }
  }

  return (
    <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={'fit-content'} scrollable>
      <CustomModalBlurWrapper>
        <ModalContent>
          <Body>
            <ImageWrapper>
              {statusText === 'Pause' ? <PauseIcon /> : statusText === 'Start' ? <PlayIcon /> : <CloseStopIcon />}
            </ImageWrapper>

            <TYPE.title9 lineHeight={'30px'}>Are you sure</TYPE.title9>
            <TYPE.title9 lineHeight={'30px'}> you want to {statusText}?</TYPE.title9>
          </Body>

          <ButtonWrapper>
            <CancelButton onClick={onClose}>No</CancelButton>
            <PinnedContentButton disabled={loading} onClick={handleConfirm}>
              {loading ? 'confirming..' : 'Yes'}
            </PinnedContentButton>
          </ButtonWrapper>
        </ModalContent>
      </CustomModalBlurWrapper>
    </RedesignedWideModal>
  )
}

export default ConfirmStatus

const CustomModalBlurWrapper = styled(ModalBlurWrapper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 30px;
`

const Body = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const ImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
`

const CancelButton = styled(PinnedContentButton)`
  background: #ffffff;
  border: 1px solid #6666ff33;
  color: #6666ff;
`
