import React, { useContext, useState } from 'react'
import { X } from 'react-feather'
import { Trans } from '@lingui/macro'
import ReactGA from 'react-ga'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from '../../state/user/hooks'
import { ModalNewWrapper, TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import Toggle from '../Toggle'
import TransactionSettings from '../TransactionSettings'
import { Percent } from '@ixswap1/sdk-core'
import { ExpertModeModal } from './ExpertModeModal'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ModalBlurWrapper, ModalContentWrapper } from 'theme'

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
const SettingsModalContentWrapper = styled(ModalContentWrapper)`
  border-radius: 10px;
  // background: ${({ theme }) => theme.bg1};
  padding: 25px 20px;
  // border: 1px solid #e6e6ff;
  // margin-bottom: 14px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 22px 10px;
  `};
`

const SettingsModalContentWrapper2 = styled(ModalContentWrapper)`
  border-radius: 10px;
  // background: ${({ theme }) => theme.bg25};
  padding: 0px 20px 20px 20px;
  // border: 1px solid #e6e6ff;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 22px 10px;
  `};
`

const SettingsHeader = styled.span`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 20px;
  line-height: 33px;
  align-items: center;
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
        <RedesignedWideModal
          isOpen={open}
          onDismiss={toggle}
          minHeight={false}
          maxHeight={'fit-content'}
          mobileMaxHeight={90}
          scrollable
        >
          <ModalNewWrapper>
            <SettingsModalContentWrapper>
              <AutoColumn gap="md" style={{ padding: '1rem', gridRowGap: '18px' }}>
                <SettingsHeader>
                  <Text style={{ color: '#292933' }}>
                    <Trans>Transaction settings</Trans>
                  </Text>
                  <StyledClose stroke="black" onClick={toggle} />
                </SettingsHeader>
                <TransactionSettings placeholderSlippage={placeholderSlippage} />
              </AutoColumn>
            </SettingsModalContentWrapper>
            <SettingsModalContentWrapper2>
              <AutoColumn gap="md" style={{ padding: '0rem 1rem', gridRowGap: '18px' }}>
                <SettingsHeader>
                  <Text color={'#292933'}>
                    <Trans>Interface Settings</Trans>
                  </Text>
                </SettingsHeader>
                <RowBetween>
                  <RowFixed>
                    <TYPE.black fontWeight={400} fontSize={14} color={theme.text13}>
                      <Trans>Expert Mode</Trans>
                    </TYPE.black>
                    <QuestionHelper
                      text={
                        <Trans>Allow high price impact trades and skip the confirm screen. Use at your own risk.</Trans>
                      }
                    />
                  </RowFixed>
                  <Toggle
                    page="liquidity"
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
                    <TYPE.black fontWeight={400} fontSize={14} color={theme.text13}>
                      <Trans>Disable Multihops</Trans>
                    </TYPE.black>
                    <QuestionHelper text={<Trans>Restricts swaps to direct pairs only.</Trans>} />
                  </RowFixed>
                  <Toggle
                    page="liquidity"
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
            </SettingsModalContentWrapper2>
          </ModalNewWrapper>
        </RedesignedWideModal>
      )}
    </StyledSettings>
  )
})

SettingsModal.displayName = 'SettingsModal'

export default SettingsModal
