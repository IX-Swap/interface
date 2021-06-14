import React, { useContext, useState } from 'react'
import { X } from 'react-feather'
import { Trans } from '@lingui/macro'
import ReactGA from 'react-ga'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import Toggle from '../Toggle'
import TransactionSettings from '../TransactionSettings'
import { Percent } from '@uniswap/sdk-core'
import { ExpertModeModal } from './ExpertModeModal'

const StyledSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
  }
`

const MenuFlyoutWrapper = styled.span`
  background: ${({ theme }) => theme.bgGradientShadow};
  border-radius: 45px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: fixed;
  top: 100px;
  height: 609px;
  min-width: 622px;
  z-index: 100;
  padding: 34px;
  backdrop-filter: blur(20px);
  right: calc(50% - (622px / 2));
  ${({ theme }) => theme.mediaWidth.upToSmall`
     top: 0;
     overflow-y:scroll;
     padding: 0;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 100%;
    max-width: 100%;
    right: 0;
  `};
  user-select: none;
`
const SettingsHeader = styled.span`
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`

const MenuFlyout = styled.span`
  background-color: ${({ theme }) => theme.bg8};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1.25rem 1.5rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     padding: 0.5rem;
  `};
`
const SettingsModal = React.forwardRef(({ placeholderSlippage }: { placeholderSlippage: Percent }) => {
  const open = useModalOpen(ApplicationModal.SETTINGS)
  const toggle = useToggleSettingsMenu()

  const theme = useContext(ThemeContext)

  const { expertMode, toggleExpertMode } = useExpertModeManager()

  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()

  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledSettings>
      <ExpertModeModal showConfirmation={showConfirmation} toggleConfirmation={setShowConfirmation} />
      {open && (
        <MenuFlyoutWrapper>
          <MenuFlyout>
            <AutoColumn gap="md" style={{ padding: '1rem', gridRowGap: '18px' }}>
              <SettingsHeader>
                <Text>
                  <Trans>Transaction Settings</Trans>
                </Text>
                <StyledClose stroke="white" onClick={toggle} />
              </SettingsHeader>
              <TransactionSettings placeholderSlippage={placeholderSlippage} />
              <SettingsHeader>
                <Text>
                  <Trans>Interface Settings</Trans>
                </Text>
              </SettingsHeader>

              <RowBetween>
                <RowFixed>
                  <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                    <Trans>Expert Mode</Trans>
                  </TYPE.black>
                  <QuestionHelper
                    text={
                      <Trans>Allow high price impact trades and skip the confirm screen. Use at your own risk.</Trans>
                    }
                  />
                </RowFixed>
                <Toggle
                  id="toggle-expert-mode-button"
                  isActive={expertMode}
                  toggle={
                    expertMode
                      ? () => {
                          toggleExpertMode()
                          setShowConfirmation(false)
                        }
                      : () => {
                          toggle()
                          setShowConfirmation(true)
                        }
                  }
                />
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                    <Trans>Disable Multihops</Trans>
                  </TYPE.black>
                  <QuestionHelper text={<Trans>Restricts swaps to direct pairs only.</Trans>} />
                </RowFixed>
                <Toggle
                  id="toggle-disable-multihop-button"
                  isActive={singleHopOnly}
                  toggle={() => {
                    ReactGA.event({
                      category: 'Routing',
                      action: singleHopOnly ? 'disable single hop' : 'enable single hop',
                    })
                    setSingleHopOnly(!singleHopOnly)
                  }}
                />
              </RowBetween>
            </AutoColumn>
          </MenuFlyout>
        </MenuFlyoutWrapper>
      )}
    </StyledSettings>
  )
})

SettingsModal.displayName = 'SettingsModal'

export default SettingsModal
