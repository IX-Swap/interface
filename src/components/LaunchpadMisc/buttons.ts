import styled from "styled-components"

const BaseButton = styled.button<{ grow?: number, height?: string, padding?: string }>`
  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  
  padding: ${props => props.padding ?? '0 2rem'};
  height: ${props => props.height ?? '48px'};

  cursor: pointer;

  border-radius: 6px;

  border: none;
  background: none;

  ${props => props.grow && `flex-grow: ${props.grow}`}
`

export const FilledButton = styled(BaseButton)<{ background?: string, color?: string }>`
  color: ${props => props.color ?? props.theme.launchpad.colors.background};
  background: ${props => props.background ?? props.theme.launchpad.colors.primary};
`

export const OutlineButton = styled(BaseButton)<{ borderColor?: string, color?: string, background?: string }>`
  color: ${props => props.color ?? props.theme.launchpad.colors.primary};
  border: 1px solid ${props => props.borderColor ?? props.theme.launchpad.colors.border.default};

  ${props => props.background && `background: ${props.background}`};
`