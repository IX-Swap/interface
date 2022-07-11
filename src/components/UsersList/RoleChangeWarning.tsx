import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, ModalContentWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import { ROLES_LABEL } from 'constants/roles'
import arrowImg from 'assets/images/arrow-right-white.png'

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
          <Container>
            <Trans>
              Changing the role of the user,
              <br />
              will lead to a change in his access to certain functionality.
              <Warning>Proceed with changes?</Warning>
            </Trans>
            <RolesContainer>
              {ROLES_LABEL[role] || '-'}
              <img src={arrowImg} alt="arrowImg" width="12px" />
              {ROLES_LABEL[newRole]}
            </RolesContainer>
          </Container>
          <ButtonsContainer>
            <ButtonIXSGradient onClick={onConfirm}>
              <Trans>Change</Trans>
            </ButtonIXSGradient>
            <ButtonGradientBorder onClick={close}>
              <Trans>Cancel</Trans>
            </ButtonGradientBorder>
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
  color: #ffffff;
  align-items: center;
  margin: 24px 16px;
  text-align: center;
`

const Warning = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const RolesContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.text9};
  border-radius: 24px;
  padding: 8px 12px;
  column-gap: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
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
