import React from 'react'
import styled, { useTheme } from 'styled-components'

interface Props {
  checked: boolean
  onChange?: (value: boolean) => void
}

interface BaseProps {
  state: boolean
  toggle: () => void
}

export const BaseCheckbox = ({ toggle, state }: BaseProps) => {
  const theme = useTheme()
  return (
    <ButtonWrapper onClick={toggle}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="16"
          height="16"
          rx="2"
          fill={state ? theme.launchpad.colors.primary : theme.launchpad.colors.border.default}
        />

        {state && <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
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

  return (
    <BaseCheckbox toggle={toggle} state={state} />
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
