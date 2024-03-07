import React, { useCallback, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { X } from 'react-feather'
import { Text } from 'rebass'
import { useExpertModeManager } from '../../state/user/hooks'
import { ButtonPrimary } from '../Button'
import { AutoColumn } from '../Column'
import Modal from '../Modal'
import { ReactComponent as WarningImg } from 'assets/images/NewWarning.svg'
import { RowCenter } from 'components/Row'

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
  // background: ${({ theme }) => theme.bg1};
  text-align: center;
`

const ExpertModalOuterBorder = styled.div`
  // padding: 35px 32px;

  // background: ${({ theme }) => theme.bg1};
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

  top: 0.75rem;
  right: 1rem;

  @media (min-width: 720px) {
    top: 2rem;
    right: 2rem;
  }

  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const ExpertModeButton = styled(ButtonPrimary)`
  border-radius: 6px;
  // border: 2px solid rgba(237, 3, 118, 1);

  height: 50px;

  background-color: #ff9999;
  color: #ffffff;

  &:hover {
    background-color: #ff9999;
  }

  &:focus {
    background-color: #ff9999;
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
    const confirmWord = `confirm`

    if (window.prompt(`Please type the word "${confirmWord}" to enable expert mode.`) === confirmWord) {
      toggleExpertMode()
      toggleConfirmation(false)
    }
  }, [toggleExpertMode, toggleConfirmation])

  return (
    <Modal isOpen={showConfirmation} onDismiss={() => toggleConfirmation(false)} maxHeight={100} maxWidth="500px">
      <ExpertModalOuterBorder>
        <ExpertModalContentWrapper>
          <AutoColumn gap="10px" style={{ maxWidth: '400px' }}>
            <RowCenter>
              <WarningImg />
            </RowCenter>
            <Text fontWeight={600} fontSize={18} lineHeight="42px" color={theme.text1}>
              <Trans>Are you sure?</Trans>
            </Text>

            <StyledCloseIcon onClick={() => toggleConfirmation(false)} />

            <Text fontWeight={300} fontSize={13} color={'#666680'} lineHeight="24px" textAlign="center">
              <Trans>
                Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result
                in bad rates and lost funds.
              </Trans>
            </Text>

            <ExpertModeButton data-testid="turn-on-expert-mode" padding="12px" onClick={confirmExpertMode}>
              <Text fontSize={18} fontWeight={600} id="confirm-expert-mode" lineHeight="20px">
                <Trans>Turn On Expert Mode</Trans>
              </Text>
            </ExpertModeButton>

            <Text fontWeight={600} fontSize={11} color={'#FF9999'} lineHeight="24px" textAlign="center">
              <Trans>Only use this mode if you know what you are doing</Trans>
            </Text>
          </AutoColumn>
        </ExpertModalContentWrapper>
      </ExpertModalOuterBorder>
    </Modal>
  )
}
