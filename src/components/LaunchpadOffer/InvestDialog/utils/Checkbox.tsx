import { text11 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled, { useTheme } from 'styled-components'

interface Props {
  checked: boolean
  onChange?: (value: boolean) => void
}

interface BaseProps {
  state: boolean
  toggle: () => void
  disabled?: boolean
}
interface BasePropsWithLabel extends BaseProps {
  label: string
  labelStyle?: React.CSSProperties
}

export const BaseCheckbox = ({ toggle, state, disabled = false }: BaseProps) => {
  const theme = useTheme()
  const onClick = () => {
    if (!disabled) {
      toggle()
    }
  }
  return (
    <ButtonWrapper onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="16"
          height="16"
          rx="2"
          ry="2"
          fill={state ? theme.launchpad.colors.primary : theme.launchpad.colors.background}
          strokeWidth="2px"
          stroke={theme.launchpad.colors.border.default}
        />

        {state && (
          <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </ButtonWrapper>
  )
}

export const Checkbox: React.FC<Props> = (props) => {
  const [state, setState] = React.useState(props.checked)

  const toggle = React.useCallback(() => {
    const value = !state

    setState(value)

    if (props.onChange) {
      props.onChange(value)
    }
  }, [state])

  return <BaseCheckbox toggle={toggle} state={state} />
}

export const BaseCheckboxWithLabel = ({ toggle, state, disabled, label, labelStyle }: BasePropsWithLabel) => {
  const onClick = () => {
    if (!disabled) {
      toggle()
    }
  }
  return (
    <CheckboxContainer onClick={onClick}>
      <BaseCheckbox toggle={() => null} state={state} disabled={disabled} />
      <Label style={labelStyle}>{label}</Label>
    </CheckboxContainer>
  )
}

const ButtonWrapper = styled.button`
  border: none;
  background: none;
  width: fit-content;
  height: fit-content;
  padding: 0;
  cursor: pointer;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 19px;

  cursor: pointer;
`
const Label = styled.div`
  ${text11}
  color: ${(props) => props.theme.launchpad.colors.text.hint};
`
