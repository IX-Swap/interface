import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { PinnedContentButton } from 'components/Button'
import { TYPE } from 'theme'
import Column from 'components/Column'
import Modal from 'components/Modal'
import { FormCard } from './styleds'
import home from 'assets/images/newHomeIcon.svg'
import group from 'assets/images/newLearnMoreIcon.svg'

const CustomColumn = styled(Column)`
  align-items: stretch;
`

const StyledButton = styled(PinnedContentButton)`
  width: 100%;
  margin-top: 32px;
  border: 1px solid #6666ff33;
  background: #ffffff;
  color: #292933;
  justify-content: left;
`

const ButtonImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`

export const RestrictedModal: FC = () => {
  const [showTaxModal, setShowTaxModal] = useState(true)

  return (
    <Modal isOpen={showTaxModal} onDismiss={() => setShowTaxModal(true)}>
      <FormCard>
        <CustomColumn>
          <TYPE.mediumHeader>Restricted Access</TYPE.mediumHeader>
          <br />
          <TYPE.description2>
            Your IP address has been restricted from accessing this site
            <br />
          </TYPE.description2>

          <StyledButton type="button" onClick={() => location.replace('https://www.ixs.finance/learning-hub')}>
            <ButtonImage src={home} alt="homeImg" />
            IXSwap Home
          </StyledButton>
          <StyledButton type="button" onClick={() => location.replace('https://www.ixs.finance/faq')}>
            <ButtonImage src={group} alt="groupImg" />
            Learn More
          </StyledButton>
        </CustomColumn>
      </FormCard>
    </Modal>
  )
}
