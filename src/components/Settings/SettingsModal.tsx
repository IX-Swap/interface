import React, { useContext, useState } from 'react'
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

const MenuFlyoutWrapper = styled.span`
  background-color: ${({ theme }) => theme.bg8};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: fixed;
  top: 138px;
  height: 380px;
  min-width: 30rem;
  z-index: 100;
  right: calc(50% - (30rem / 2));
  ${({ theme }) => theme.mediaWidth.upToSmall`
     top: 11rem;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 90%;
    max-width: 90%;
    right: calc(50% - (90% / 2));
  `};
  user-select: none;
`

const MenuFlyout = styled.span`
  background-color: ${({ theme }) => theme.bg8};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: fixed;
  top: 138px;
  height: 380px;
  min-width: 30rem;
  z-index: 100;
  right: calc(50% - (30rem / 2));
  ${({ theme }) => theme.mediaWidth.upToSmall`
     top: 11rem;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    min-width: 90%;
    max-width: 90%;
    right: calc(50% - (90% / 2));
  `};
  user-select: none;
`
const SettingsModal = React.forwardRef(({ placeholderSlippage }: { placeholderSlippage: Percent }) => {
  const open = useModalOpen(ApplicationModal.SETTINGS)
  const toggle = useToggleSettingsMenu()

  const theme = useContext(ThemeContext)

  const [expertMode, toggleExpertMode] = useExpertModeManager()

  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()

  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledSettings>
      <ExpertModeModal showConfirmation={showConfirmation} toggleConfirmation={setShowConfirmation} />
      {open && (
        <MenuFlyout>
          <AutoColumn gap="md" style={{ padding: '1rem' }}>
            <Text fontWeight={600} fontSize={14}>
              <Trans>Transaction Settings</Trans>
            </Text>
            <TransactionSettings placeholderSlippage={placeholderSlippage} />
            <Text fontWeight={600} fontSize={14}>
              <Trans>Interface Settings</Trans>
            </Text>
            <RowBetween>
              <RowFixed>
                <TYPE.black fontWeight={400} fontSize={14} color={theme.text2}>
                  <Trans>Toggle Expert Mode</Trans>
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
      )}
    </StyledSettings>
  )
})

SettingsModal.displayName = 'SettingsModal'

export default SettingsModal
