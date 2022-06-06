import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, ModalContentWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'

import { Option } from './TokensBlock'

interface Props {
  close: () => void
  onConfirm: () => void
  tokens: Option[]
}

export const RemoveTokensWarning = ({ tokens, close, onConfirm }: Props) => {
  return (
    <RedesignedWideModal isOpen onDismiss={close}>
      <ModalBlurWrapper
        data-testid="remove-tokens-for-manager "
        style={{ maxWidth: '582px', minWidth: '320px', width: '100%', position: 'relative' }}
      >
        <ModalContentWrapper>
          <Container>
            <Trans>Are you sure you want to remove </Trans>
            <TokenList>
              {tokens.map(({ icon, label }) => (
                <Token key={label}>
                  {icon}
                  {label}
                </Token>
              ))}
            </TokenList>
            <Trans>from the management list of this manager?</Trans>
          </Container>
          <ButtonsContainer>
            <ButtonIXSGradient onClick={onConfirm}>
              <Trans>Remove</Trans>
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
  row-gap: 8px;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #ffffff;
  align-items: center;
  margin: 24px 32px;
  text-align: center;
`
const TokenList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  row-gap: 16px;
  column-gap: 24px;
  flex-wrap: wrap;
`

const Token = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
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
