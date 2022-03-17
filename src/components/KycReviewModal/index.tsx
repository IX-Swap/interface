import React, { useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'

import { ModalBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonIXSWide, ButtonPinkBorder, ButtonGradientBorder } from 'components/Button'
import { ReasonModal } from 'components/ReasonModal'
import { CorporateKyc, IndividualKyc, KycItem } from 'state/admin/actions'
import { shortenAddress } from 'utils'
import { useApproveKyc, useRejectKyc, useResetKyc } from 'state/admin/hooks'

import { CorporateForm } from './CorporateForm'
import { IndividualForm } from './IndividualForm'
import { getCynopsisRisks } from 'state/kyc/hooks'

interface Props {
  isOpen: boolean
  onClose: () => void
  data: KycItem
}

export const KycReviewModal = ({ isOpen, onClose, data }: Props) => {
  const [openReasonModal, handleOpenReasonModal] = useState('')
  const [riskJSON, setRiskJSON] = useState<any>(null)
  const approveKyc = useApproveKyc()
  const rejectKyc = useRejectKyc()
  const resetKyc = useResetKyc()

  useEffect(() => {
    const fetchCynopsisRisks = async () => {
      const result = await getCynopsisRisks(data?.user.ethAddress)
      setRiskJSON(result?.riskReport?.riskJson?.riskScore ? result.riskReport.riskJson : null)
    }

    fetchCynopsisRisks()
  }, [])

  const kyc = (data.individualKycId ? data.individual : data.corporate) || ({} as IndividualKyc | CorporateKyc)

  const approve = async () => {
    onClose()
    await approveKyc(data.id)
  }

  const closeModal = () => handleOpenReasonModal('')

  const reject = () => {
    handleOpenReasonModal('reject')
  }

  const changeRequest = () => {
    handleOpenReasonModal('changeRequest')
  }

  const onReasonAction = (reason?: string) => {
    if (openReasonModal === 'reject') {
      rejectKyc({ id: data.id, message: reason })
    } else {
      resetKyc({ id: data.id, message: reason })
    }
    closeModal()
    onClose()
    // TO DO - handle action
  }

  return (
    <>
      <ReasonModal
        isOpen={Boolean(openReasonModal)}
        onAction={onReasonAction}
        onClose={closeModal}
        actionBtnText="Submit"
        inputLabel="Accompanying text"
        title={openReasonModal === 'reject' ? 'Reject annotation' : 'Change request'}
      />
      <RedesignedWideModal
        isOpen={isOpen}
        onDismiss={onClose}
        minHeight={false}
        maxHeight={'fit-content'}
        scrollable
        isLarge
      >
        <ModalBlurWrapper data-testid="kyc-review">
          <ModalContent>
            <TitleContainer>
              <Title>
                <div>
                  <Trans>KYC</Trans>&nbsp;-&nbsp;
                </div>
                {shortenAddress(data.user.ethAddress)} ({t`${data.individualKycId ? 'Individual' : 'Corporate'}`})
              </Title>
              <CloseIcon data-testid="cross" onClick={onClose} />
            </TitleContainer>
            <Body>
              {data.individualKycId ? (
                <IndividualForm riskJSON={riskJSON} data={kyc} />
              ) : (
                <CorporateForm riskJSON={riskJSON} data={kyc} />
              )}
            </Body>
            <ActionsContainer>
              <ButtonIXSWide onClick={approve}>
                <Trans>Approve</Trans>
              </ButtonIXSWide>
              <ButtonPinkBorder onClick={reject}>
                <Trans>Reject</Trans>
              </ButtonPinkBorder>
              <ButtonGradientBorder onClick={changeRequest}>
                <Trans>Request a change</Trans>
              </ButtonGradientBorder>
            </ActionsContainer>
          </ModalContent>
        </ModalBlurWrapper>
      </RedesignedWideModal>
    </>
  )
}

const Body = styled.div`
  display: grid;
  row-gap: 35px;
`

const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 35px;
  row-gap: 35px;
  margin-top: 35px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 1fr;
  }
  > button {
    width: 100%;
  }
  > button:nth-child(2) {
    color: ${({ theme: { error } }) => error};
  }
`

const TitleContainer = styled.div`
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalContent = styled(ModalContentWrapper)`
  padding: 29px 38px 42px 42px;
  border-radius: 20px;
  min-width: 80vw;
  max-width: 90vw;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 16px;
  }
`

const Title = styled.div`
  font-size: 22px;
  display: flex;
  align-items: center;
  color: ${({ theme: { text2 } }) => text2};
  > :first-child {
    font-weight: 600;
  }
`
