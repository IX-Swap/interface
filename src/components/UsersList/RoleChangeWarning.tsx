import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, ModalContentWrapper, TYPE, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonGradientBorder, ButtonIXSGradient, PinnedContentButton } from 'components/Button'
import { ROLES_LABEL } from 'constants/roles'
import arrowImg from 'assets/images/newBack.svg'
// import ProfileIcon from 'assets/images/profileIconButton.svg'
import { Box } from 'rebass'
import { ReactComponent as ProfileIcon } from 'assets/images/profileIconButton.svg'

interface Props {
  close: () => void
  onConfirm: () => void
  role?: string
  newRole: string
}

export const RoleChangeWarning = ({ role = '', newRole, close, onConfirm }: Props) => {
  return (
    <RedesignedWideModal isOpen onDismiss={close}>
      <ModalBlurWrapper
        data-testid="remove-tokens-for-manager "
        style={{ maxWidth: '612px', minWidth: '320px', width: '100%', position: 'relative' }}
      >
        <ModalContentWrapper>
          <CloseIcon style={{ position: 'absolute', right: '10px' }} onClick={close} />
          <Container>
            <TYPE.title7 style={{ lineHeight: '25px' }}>
              Changing the role of the user, <br /> will lead to a change in his <br /> access to certain functionality.
              <br />
              Proceed with changes?
            </TYPE.title7>
            <RolesContainer>
              <div style={{ border: '1px solid #E6E6FF', padding: '12px 20px', borderRadius: '8px' }}>
                <ProfileIcon style={{ marginRight: '5px' }} />
                {ROLES_LABEL[role] || '-'}
              </div>
              <img src={arrowImg} style={{ transform: 'rotate(180deg)' }} color="red" alt="arrowImg" width="16px" />
              <div style={{ border: '1px solid #E6E6FF', padding: '12px 20px', borderRadius: '8px' }}>
                <ProfileIcon style={{ marginRight: '5px' }} />
                {ROLES_LABEL[newRole]}
              </div>
            </RolesContainer>
          </Container>
          <ButtonsContainer>
            <PinnedContentButton
              style={{ border: '1px solid #E6E6FF', background: '#FFFFFF', color: '#B8B8CC', padding: '30px' }}
              onClick={close}
            >
              <Trans>Cancel</Trans>
            </PinnedContentButton>
            <PinnedContentButton style={{ padding: '30px' }} onClick={onConfirm}>
              <Trans>Change</Trans>
            </PinnedContentButton>
          </ButtonsContainer>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  // color: #ffffff;
  align-items: center;
  margin: 24px 16px;
  text-align: center;
`

const Warning = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const RolesContainer = styled.div`
  // border: 1px solid ${({ theme }) => theme.text9};
  // border-radius: 24px;
  padding: 8px 12px;
  column-gap: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  // color: #ffffff;
  margin: 24px 0px 0px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  row-gap: 16px;
  column-gap: 32px;
  margin-top: 8px;
  margin-bottom: 24px;
  button {
    height: 40px;
    min-height: 40px;
    font-weight: 600;
    font-size: 16px;
    padding: 16px 24px;
  }
`
