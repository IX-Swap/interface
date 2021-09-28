import React from 'react'
import { t, Trans } from '@lingui/macro'
import { X } from 'react-feather'
import { Text } from 'rebass'
import styled from 'styled-components'
import { useExpertModeManager } from '../../state/user/hooks'
import { ButtonError } from '../Button'
import { AutoColumn } from '../Column'
import Modal from '../Modal'
import { RowBetween } from '../Row'

const ExpertModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`
const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`
const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`
interface props {
  showConfirmation: boolean
  toggleConfirmation: (arg: boolean) => void
}
export const ExpertModeModal = ({ showConfirmation = false, toggleConfirmation }: props) => {
  const { toggleExpertMode } = useExpertModeManager()

  return (
    <Modal isOpen={showConfirmation} onDismiss={() => toggleConfirmation(false)} maxHeight={100}>
      <ExpertModalContentWrapper>
        <AutoColumn gap="lg">
          <RowBetween style={{ padding: '0 2rem' }}>
            <div />
            <Text fontWeight={500} fontSize={20}>
              <Trans>Are you sure?</Trans>
            </Text>
            <StyledCloseIcon onClick={() => toggleConfirmation(false)} />
          </RowBetween>
          <Break />
          <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
            <Text fontWeight={500} fontSize={20}>
              <Trans>
                Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result
                in bad rates and lost funds.
              </Trans>
            </Text>
            <Text fontWeight={600} fontSize={20}>
              <Trans>ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.</Trans>
            </Text>
            <ButtonError
              data-testid="turn-on-expert-mode"
              error={true}
              padding={'12px'}
              onClick={() => {
                const confirmWord = t`confirm`
                if (window.prompt(t`Please type the word "${confirmWord}" to enable expert mode.`) === confirmWord) {
                  toggleExpertMode()
                  toggleConfirmation(false)
                }
              }}
            >
              <Text fontSize={20} fontWeight={500} id="confirm-expert-mode">
                <Trans>Turn On Expert Mode</Trans>
              </Text>
            </ButtonError>
          </AutoColumn>
        </AutoColumn>
      </ExpertModalContentWrapper>
    </Modal>
  )
}
