import React, { useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { useExpertModeManager } from '../../state/user/hooks'
import { Percent } from '@ixswap1/sdk-core'
import SettingsModal from './SettingsModal'
import { ReactComponent as SettingsFull } from 'assets/images/settings-full.svg'
import { ReactComponent as SettingsEmpty } from 'assets/images/settings-empty.svg'

const SettingsIcon = ({ open }: { open: boolean }) => <>{open ? <SettingsFull /> : <SettingsEmpty />}</>
const StyledMenuIcon = styled(SettingsIcon)`
  height: 22px;
  width: 22px;
  :hover {
    opacity: 0.7;
  }
`
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  right: 3px;
  font-size: 14px;
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
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.SETTINGS)
  const toggle = useToggleSettingsMenu()

  const { expertMode } = useExpertModeManager()

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton id="open-settings-dialog-button" onClick={toggle}>
        <StyledMenuIcon open={open} />
        {expertMode ? (
          <EmojiWrapper>
            <span role="img" aria-label="wizard-icon">
              🧙
            </span>
          </EmojiWrapper>
        ) : null}
      </StyledMenuButton>
      <SettingsModal placeholderSlippage={placeholderSlippage} />
    </StyledMenu>
  )
}
