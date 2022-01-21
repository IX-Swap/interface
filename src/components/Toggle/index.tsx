import React from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
  padding: 11px;
  border-radius: 100%;
  opacity: ${({ isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? 1 : 0.3) : 0)};
  background: ${({ theme, isActive, isOnSwitch }) =>
    isActive ? (isOnSwitch ? theme.bgG6 : theme.bg10) : 'transparent'};
  :hover {
    user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
  }
`

const StyledToggle = styled.button<{ isActive?: boolean; activeElement?: boolean; disabled?: boolean }>`
  border-radius: 36px;
  box-shadow: 0px 0px 4px rgba(182, 111, 242, 0.25);
  border: 1px solid ${({ theme }) => theme.popUpInputBorder};
  background: ${({ theme }) => theme.bg7};
  padding: 2px;
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  height: fit-content;
`

const ToggleContainer = styled.span`
  display: flex;
  align-items: center;
`
const MirrorImage = styled.span`
  transform: rotateY(180deg);
`
const LabelContainer = styled.span<{ isActive?: boolean }>`
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  line-height: 24px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  margin-right: 0.5rem;
`

export interface ToggleProps {
  id?: string
  isActive: boolean
  toggle: () => void
  showLabel?: boolean
  disabled?: boolean
}

export default function Toggle({ id, isActive, toggle, showLabel = true, disabled = false }: ToggleProps) {
  return (
    <ToggleContainer>
      {showLabel && (
        <LabelContainer isActive={isActive}>
          <Trans>{isActive ? 'On' : 'Off'}</Trans>
        </LabelContainer>
      )}
      <MirrorImage>
        <StyledToggle id={id} isActive={isActive} onClick={toggle} disabled={disabled}>
          <ToggleElement isActive={isActive} isOnSwitch={true}></ToggleElement>
          <ToggleElement isActive={!isActive} isOnSwitch={false}></ToggleElement>
        </StyledToggle>
      </MirrorImage>
    </ToggleContainer>
  )
}
