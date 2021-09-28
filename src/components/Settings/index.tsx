import { Percent } from '@ixswap1/sdk-core'
import Astronaut from 'assets/images/astronaut.svg'
import { ReactComponent as SettingsEmpty } from 'assets/images/settings-empty.svg'
import { ReactComponent as SettingsFull } from 'assets/images/settings-full.svg'
import React from 'react'
import styled from 'styled-components'
import { SvgIconWrapper } from 'theme'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { useExpertModeManager } from '../../state/user/hooks'
import SettingsModal from './SettingsModal'
const SettingsIcon = ({ open }: { open: boolean }) => <>{open ? <SettingsFull /> : <SettingsEmpty />}</>
const StyledMenuIcon = styled(SettingsIcon)`
  height: 22px;
  width: 22px;
  :hover {
    opacity: 0.7;
  }
`
const EmojiWrapper = styled.div`
  position: relative;
`

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   align-self: flex-end;
   margin-left: auto;
  `};
`

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  margin: 0;
  padding: 13px;
  border-radius: 100%;
  height: fit-content;
  display: flex;
  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    opacity: 0.8;
  }
`

export default function SettingsTab({ placeholderSlippage }: { placeholderSlippage: Percent }) {
  const open = useModalOpen(ApplicationModal.SETTINGS)
  const toggle = useToggleSettingsMenu()

  const { expertMode } = useExpertModeManager()

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu>
      <StyledMenuButton id="open-settings-dialog-button" onClick={toggle}>
        <StyledMenuIcon open={open} />
        {expertMode ? (
          <EmojiWrapper>
            <SvgIconWrapper size={25}>
              <img src={Astronaut} aria-label="astronaut-icon" />
            </SvgIconWrapper>
          </EmojiWrapper>
        ) : null}
      </StyledMenuButton>
      <SettingsModal placeholderSlippage={placeholderSlippage} />
    </StyledMenu>
  )
}
