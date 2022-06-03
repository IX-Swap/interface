import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, ModalContentWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonText } from 'components/Button'

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
        style={{ maxWidth: '612px', minWidth: '320px', width: '100%' }}
      >
        <ModalContentWrapper>
          <Container>
            <Title>
              <Trans>WARNING!</Trans>
            </Title>

            <Info>
              <Trans>
                Please execute the <span>Transaction of {symbol || ''} Tokens</span> to the{' '}
                <span>Custodians wallet</span> address on the <span>{networkName} Blockchain</span>
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
  row-gap: 24px;
  font-weight: 300;
  font-size: 20px;
  line-height: 32px;
  color: ${({ theme }) => theme.error};
  align-items: center;
  margin: 24px 32px;
  text-align: center;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
`
const Info = styled.div`
  text-align: center;
  > span {
    font-weight: 500;
  }
`

const StyledButton = styled(ButtonText)`
  background-color: ${({ theme }) => theme.error};
  width: 152px;
  padding: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  border-radius: 40px;
  margin-top: 8px;
  text-decoration: none;
`
