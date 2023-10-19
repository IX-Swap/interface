import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ModalBlurWrapper, ModalContentWrapper, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonGradientBorder, ButtonIXSGradient, PinnedContentButton } from 'components/Button'

import { Option } from './TokensBlock'
import { Line } from 'components/Line'
import { RowEnd } from 'components/Row'
import { CloseIcon } from '../../theme'

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
        style={{ maxWidth: '500px', minWidth: '320px', width: '100%', position: 'relative' }}
      >
        <ModalContentWrapper>
          <CloseIcon style={{ position: 'absolute', right: '20px', top: '10px' }} data-testid="cross" onClick={close} />
          <Container>
            <TYPE.title7>
              Are you sure you want to <br /> remove from the management <br /> list of this manager?{' '}
            </TYPE.title7>
            <Line style={{ margin: '20px 0px' }} />
            <TokenList>
              {tokens.map(({ icon, label }) => (
                <Token key={label}>
                  {icon}
                  {label}
                </Token>
              ))}
            </TokenList>
          </Container>
          <Line style={{ margin: '20px 0px' }} />
          <ButtonsContainer>
            <PinnedContentButton
              style={{
                background: 'none',
                color: '#B8B8CC',
                border: '1px solid #E6E6FF ',
                padding: '12px, 16px',
              }}
              onClick={close}
            >
              <Trans>Cancel</Trans>
            </PinnedContentButton>
            <PinnedContentButton style={{ padding: '12px, 16px' }} onClick={onConfirm}>
              <Trans>Remove</Trans>
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
  row-gap: 8px;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  align-items: left;
  margin: 24px 32px;
  text-align: left;
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

  border: 1px solid #e6e6ff;
  border-radius: 6px;
  padding: 10px;
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
