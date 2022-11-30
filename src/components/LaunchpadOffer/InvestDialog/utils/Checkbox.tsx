import React from 'react'

import { ReactComponent as Checked } from 'assets/images/checked_solid.svg'
import { ReactComponent as NotChecked } from 'assets/images/not_checked_solid.svg'
import styled, { useTheme } from 'styled-components'

interface Props {
  checked: boolean
  onChange?: (value: boolean) => void
}

export const Checkbox: React.FC<Props> = (props) => {
  const theme = useTheme()

  const [state, setState] = React.useState(props.checked)

  const toggle = React.useCallback(() => {
    const value = !state

    setState(value)

    if (props.onChange) {
      props.onChange(value)
    }
  }, [state])

  return (
    <ButtonWrapper onClick={toggle}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" rx="2" fill={state ? theme.launchpad.colors.primary : theme.launchpad.colors.text.caption} />
        {state && <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
      </svg>
    </ButtonWrapper>
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
