import React from 'react'
import styled from 'styled-components'

import { useFormatOfferValue } from 'state/launchpad/hooks'
import { OptionalLabel } from '../IssuanceForm/shared/styled'

interface StylingProps {
  padding?: string
  height?: string

  fontSize?: string
  lineHeight?: string
  
  borderless?: boolean
}

interface Props extends StylingProps {
  type?: React.HTMLInputTypeAttribute

  label?: React.ReactNode
  placeholder?: React.ReactNode
  trailing?: React.ReactNode

  disabled?: boolean
  optional?: boolean

  className?: string

  value?: string
  error?: string

  onChange?: (value: string) => void
  inputFilter?: (value: string) => string
}

export const IssuanceTextField: React.FC<Props> = (props) => {
  const formatedValue = useFormatOfferValue()

  const [inputValue, setInputValue] = React.useState<string | undefined>(props.value)
  const [focused, setFocused] = React.useState(!!inputValue)

  React.useEffect(() => {
    setInputValue(props.value)
  }, [props.value])

  const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value

    if (props.type === 'number') {
      value = formatedValue(value)
    } else if (props.inputFilter) {
      value = props.inputFilter(value)
    }

    setInputValue(value)
    setFocused(value !== '')

    if (props.onChange) {
      props.onChange(value);
    }
  }, [])

  return (
    <FieldContainer disabled={props.disabled}>
      <FieldInputContainer className={props.className} height={props.height} padding={props.padding} borderless={props.borderless}>
        {props.label && <Label>{props.label} {props.optional && <OptionalLabel>Optional</OptionalLabel>}</Label>}
        {props.placeholder && <Placeholder active={focused} hasLabel={!!props.label}>{props.placeholder}</Placeholder>}

        <Input
          type="text"
          fontSize={props.fontSize}
          lineHeight={props.lineHeight}
          disabled={props.disabled} 
          value={inputValue}
          onInput={onChange}
          maxLength={props.type === 'text' ? 19 : 60}
        />

        {props.trailing}
      </FieldInputContainer>
      
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FieldContainer>
  )
}

const FieldContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-flow: column nowrap;

  gap: 0.5rem;
  
  ${props => props.disabled && `
    background: ${props.theme.launchpad.colors.foreground};
  `}
`

const FieldInputContainer = styled.div<Pick<StylingProps, 'padding' | 'height' | 'borderless'>>`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  
  gap: 0.25rem;

  ${props => !props.borderless && `border: 1px solid ${props.theme.launchpad.colors.border.default};`}
  border-radius: 8px;

  max-width: 100%;

  padding: ${props => props.padding ?? '1rem 1.25rem'};
  
  :focus-within > label {
    opacity: 0;
  }
`

const Label = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const Placeholder = styled.label<{ active: boolean, hasLabel?: boolean }>`
  position: absolute;

  ${props => props.active && 'opacity: 0;'}

  top: 50%;
  left: 1.25rem; 
  transform: translate(0, -50% ${props => props.hasLabel && '+ 1rem'});

  pointer-events: none;
  
  transform-origin: top left;
  transition: all 0.2s ease-out;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;
  
  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const Input = styled.input<Pick<StylingProps, 'fontSize' | 'lineHeight'>>`
  grid-area: input;

  border: none;
  outline: none;
  background: none;

  
  color: ${props => props.theme.launchpad.colors.text.title};

  font-style: normal;
  font-weight: 500;
  font-size: ${props => props.fontSize ?? '14px'};

  line-height: ${props => props.lineHeight ?? '17px'};
  letter-spacing: -0.02em;

  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: ${props => props.theme.launchpad.colors.text.title};
    color: ${props => props.theme.launchpad.colors.text.title};
    transition: background-color 100000s ease-in-out 0s;
  }

  ::-webkit-autofill::first-line {
    font-family: 'Poppins', sans-serif;
  }


  &[type=number] {
    -moz-appearance: textfield;
  }
`

const ErrorText = styled.div`
  color: ${props => props.theme.launchpad.colors.error};

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
`