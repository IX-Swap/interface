import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import { ModalBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { KycItem } from 'state/admin/actions'
import { ReactComponent as ArrowLeft } from '../../assets/images/newCross.svg'
import IndividualFormV2 from './IndividualFormV2'
import { ReasonModal } from 'components/ReasonModal'
import { KYCStatuses } from 'pages/KYC/enum'
import { useApproveKyc, useRejectKyc, useResetKyc } from 'state/admin/hooks'
import { PinnedContentButton } from 'components/Button'
import { getCynopsisRisks } from 'state/kyc/hooks'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: KycItem
}

export const KycReviewModalV2 = ({ isOpen, onClose, data }: Props) => {
  const [openReasonModal, handleOpenReasonModal] = useState('')
  const [riskReportId, handleRiskReportId] = useState(0)

  const approveKyc = useApproveKyc()
  const rejectKyc = useRejectKyc()
  const resetKyc = useResetKyc()

  useEffect(() => {
    const fetchCynopsisRisks = async () => {
      const result = await getCynopsisRisks(data?.user.ethAddress)
      handleRiskReportId(result?.riskReport?.id || 0)
    }
    fetchCynopsisRisks()
  }, [data?.user.ethAddress])

  const closeModal = () => handleOpenReasonModal('')

  const reject = () => {
    handleOpenReasonModal('reject')
  }

  const approve = async () => {
    onClose()
    await approveKyc(data.id, riskReportId)
  }

  const onReasonAction = (reason?: string) => {
    if (openReasonModal === 'reject') {
      rejectKyc({ id: data.id, message: reason, riskReportId })
    } else {
      resetKyc({ id: data.id, message: reason })
    }
    closeModal()
    onClose()
  }

  return (
    <>
      <RedesignedWideModal isOpen={isOpen} onDismiss={onClose} scrollable>
        <ReasonModal
          isOpen={Boolean(openReasonModal)}
          onAction={onReasonAction}
          onClose={closeModal}
          actionBtnText="Submit"
          inputLabel="Accompanying text"
          title={openReasonModal === 'reject' ? 'Reject annotation' : 'Change request'}
          isRejectingApprovedKYC={openReasonModal === 'reject' && data.status === KYCStatuses.APPROVED}
        />
        <ModalBlurWrapper touchable data-testid="kyc-review">
          <TitleContainer>
            <TYPE.label fontSize={'24px'}>Individual KYC</TYPE.label>
            <ArrowLeft style={{ cursor: 'pointer' }} data-testid="cross" onClick={onClose} />
          </TitleContainer>
          <Body>
            <IndividualFormV2 data={data} />
            <ActionContainer>
              <RejectButton onClick={reject}>Reject</RejectButton>
              <ApproveButton onClick={approve}>Approve</ApproveButton>
            </ActionContainer>
          </Body>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const Body = styled.div`
  display: grid;
  row-gap: 35px;
`

const TitleContainer = styled.div`
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ActionContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  width: -webkit-fill-available;
`

const RejectButton = styled(PinnedContentButton)`
  background: none;
  color: #ff8282;
  border: 1px solid #e6e6ff;
`

const ApproveButton = styled(PinnedContentButton)`
  background: #1fba66;
`
