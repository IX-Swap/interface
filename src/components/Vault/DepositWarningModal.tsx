import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, ModalContentWrapper, CloseIcon } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonText } from 'components/Button'
import { ReactComponent as WarningImg } from 'assets/images/NewWarning.svg'
import { isMobile } from 'react-device-detect'

interface Props {
  close: () => void
  networkName: string
  symbol?: string | null
}

export const DepositWarningModal = ({ close, networkName, symbol }: Props) => {
  return (
    <RedesignedWideModal isOpen onDismiss={close}>
      <ModalBlurWrapper
        data-testid="remove-tokens-for-manager "
        style={{ minWidth: isMobile ? '' : '450px', width: '100%', padding: '24px 15px' }}
      >
        <ModalContentWrapper>
          {/* <Wrapper> */}
          <CloseIcon
            style={{ position: 'absolute', right: '20px', color: '#B8B8CC', top: isMobile ? '10px' : '' }}
            data-testid="cross"
            onClick={close}
          />
          {/* </Wrapper> */}
          <Container>
            <WarningImg />
            <Title>
              <Trans>Warning</Trans>
            </Title>
            <Info>
              <Trans>
                Please execute the Transaction of {symbol || ''} <br /> Token to the Custodians wallet address <br /> on
                the {networkName} Blockchain
              </Trans>
            </Info>
            <StyledButton onClick={close}>
              <Trans>GOT IT</Trans>
            </StyledButton>
          </Container>
        </ModalContentWrapper>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  font-weight: 300;
  font-size: 20px;
  line-height: 32px;
  color: ${({ theme }) => theme.error};
  align-items: center;
  margin: 24px 32px;
  text-align: center;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #292933;
`
const Info = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  color: #666680;
  line-height: 20px;
`

const StyledButton = styled(ButtonText)`
  background-color: ${({ theme }) => theme.error};
  width: 100%;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  border-radius: 6px;
  margin-top: 8px;
  text-decoration: none;
`
