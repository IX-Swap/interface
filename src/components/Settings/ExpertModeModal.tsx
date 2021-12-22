import React, { useCallback, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { X } from 'react-feather'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'
import { useExpertModeManager } from '../../state/user/hooks'
import { ButtonPrimary } from '../Button'
import { AutoColumn } from '../Column'
import Modal from '../Modal'

const ExpertModalContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  padding: 2rem 0.5rem;

  @media (min-width: 960px) {
    padding: 4rem 6rem;
  }

  border-radius: 20px;
  background: radial-gradient(53.24% 225.7% at 49.91% 82.11%, rgba(123, 66, 169, 0.04) 0%, rgba(237, 3, 118, 0.02) 100%),
    #0f0518;
  text-align: center;
`

const ExpertModalOuterBorder = styled.div`
  padding: 35px 32px;

  backdrop-filter: blur(20px);
  background: radial-gradient(93.65% 93.65% at 58.57% 22.42%, rgba(206, 20, 132, 0.099) 0%, rgba(26, 18, 58, 0) 100%),
    rgba(44, 37, 74, 0.2);

  border-radius: 20px;

  @media (min-width: 720px) {
    border-radius: 45px;
  }

  width: 100%;
`

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;

  position: absolute;

  top: 2rem;
  right: 2rem;

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

const ExpertModeButton = styled(ButtonPrimary)`
  border-radius: 40px;
  border: 2px solid rgba(237, 3, 118, 1);

  // height: 50px;

  background-color: transparent;
  color: rgba(237, 3, 118, 1);

  &:hover {
    background-color: unset;
  }

  &:focus {
    background-color: unset;
  }
`

interface props {
  showConfirmation: boolean
  toggleConfirmation: (arg: boolean) => void
}

export const ExpertModeModal = ({ showConfirmation = false, toggleConfirmation }: props) => {
  const { toggleExpertMode } = useExpertModeManager()

  const theme = useContext(ThemeContext)

  const confirmExpertMode = useCallback(() => {
    const confirmWord = t`confirm`

    if (window.prompt(t`Please type the word "${confirmWord}" to enable expert mode.`) === confirmWord) {
      toggleExpertMode()
      toggleConfirmation(false)
    }
  }, [toggleExpertMode, toggleConfirmation])

  return (
    <Modal isOpen={showConfirmation} onDismiss={() => toggleConfirmation(false)} maxHeight={100} maxWidth="550px">
      <ExpertModalOuterBorder>
        <ExpertModalContentWrapper>
          <AutoColumn gap="30px" style={{ maxWidth: '400px' }}>
            <Text fontWeight={600} fontSize={28} lineHeight="42px" color={theme.bg10}>
              <Trans>Are you sure?</Trans>
            </Text>

            <StyledCloseIcon onClick={() => toggleConfirmation(false)} />

            <Text fontWeight={300} fontSize={16} lineHeight="24px" textAlign="center">
              <Trans>
                Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result
                in bad rates and lost funds.
              </Trans>
            </Text>

            <Text fontWeight={600} fontSize={18} lineHeight="24px" textAlign="center">
              <Trans>ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.</Trans>
            </Text>

            <ExpertModeButton data-testid="turn-on-expert-mode" padding="12px" onClick={confirmExpertMode}>
              <Text fontSize={18} fontWeight={600} id="confirm-expert-mode" lineHeight="20px">
                <Trans>Turn On Expert Mode</Trans>
              </Text>
            </ExpertModeButton>
          </AutoColumn>
        </ExpertModalContentWrapper>
      </ExpertModalOuterBorder>
    </Modal>
  )
}
