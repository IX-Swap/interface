import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'

import { ModalBlurWrapper, ModalContentWrapper, MEDIA_WIDTHS, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonIXSWide, ButtonPinkBorder, ButtonGradientBorder } from 'components/Button'

import { Cynopsis } from './Cynopsis'
import { CorporateInformation } from './CorporateInformation'
import { CompanyAuthorizedPersonnel } from './CompanyAuthorizedPersonnel'
import { Address } from './Address'
import { ResidentialAddress } from './ResidentialAddress'
import { SourceOfFunds } from './SourceOfFunds'
import { InvestorStatusDeclaration } from './InvestorStatusDeclaration'
import { Fatca } from './Fatca'
import { OptInRequirement } from './OptInRequirement'
import { TaxDeclaration } from './TaxDeclaration'
import { BeneficialOwners } from './BeneficialOwners'
import { UploadDocuments } from './UploadDocuments'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const KycReviewModal = ({ isOpen, onClose }: Props) => {
  const approve = () => {
    onClose()
  }
  const reject = () => {
    onClose()
  }

  const changeRequest = () => {
    onClose()
  }

  return (
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
              0xC0...6Cc2 (Corporate)
            </Title>
            <CloseIcon data-testid="cross" onClick={onClose} />
          </TitleContainer>
          <Body>
            <Cynopsis />
            <CorporateInformation />
            <CompanyAuthorizedPersonnel />
            <Address />
            <ResidentialAddress />
            <SourceOfFunds />
            <InvestorStatusDeclaration />
            <Fatca />
            <OptInRequirement />
            <TaxDeclaration />
            <BeneficialOwners />
            <UploadDocuments />
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
