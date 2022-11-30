import React from 'react'
import styled from 'styled-components'

interface StylingProps {
  padding?: string
  height?: string

  fontSize?: string
  lineHeight?: string
}

interface Props extends StylingProps {
  type?: React.HTMLInputTypeAttribute

  label?: React.ReactNode
  placeholder?: React.ReactNode
  trailing?: React.ReactNode
  caption?: React.ReactNode

  disabled?: boolean

  error?: string

  value?: string
  onChange?: (value: string) => void
}

export const InvestTextField: React.FC<Props> = (props) => {
  const [inputValue, setInputValue] = React.useState<string | undefined>(props.value)
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    setInputValue(props.value)
  }, [props.value])

  const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value

    if (props.type === 'number' && value.length > 3) {
      const before = value
      const digits = value
        .split('').reverse()
        .filter(x => /[0-9]/.test(x))

      console.log({ digits })

      value = digits
        .flatMap((x, idx) => idx > 0 && idx % 3 === 0 ? [',', x] : x)
        .flat().reverse()
        .join('')

      console.log({ before, after: value })
    }

    setInputValue(value)
    setFocused(value !== '')

    if (props.onChange) {
      props.onChange(value);
    }
  }, [])

  return (
    <FieldContainer>
      {props.label && <Label>{props.label}</Label>}

      <FieldInputContainer height={props.height} padding={props.padding}>
        {props.placeholder && <Placeholder active={focused}>{props.placeholder}</Placeholder>}

        <Input
          type="text" 
          fontSize={props.fontSize}
          lineHeight={props.lineHeight}
          disabled={props.disabled} 
          value={inputValue}
          onChange={onChange} 
        />

        {props.caption && <Caption>{props.caption}</Caption>}
        {props.trailing && <Trailing>{props.trailing}</Trailing>}
      </FieldInputContainer>
      
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FieldContainer>
  )
}

const FieldContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 0.5rem;
`

const FieldInputContainer = styled.div<Pick<StylingProps, 'padding' | 'height'>>`
  position: relative;
  
  // display: flex;

  // flex-flow: row nowrap;

  // jusity-content: flex-start;
  // align-items: center;

  gap: 0.25rem;

  display: grid;

  grid-template-columns: minmax(60%, 1fr) auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "input trailing"
    "caption trailing";

  place-content: center;

  background: ${props => props.theme.launchpad.colors.foreground};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 8px;

  max-width: 100%;

  height: ${props => props.height ?? '60px'};

  padding: ${props => props.padding ?? '0.75rem 1.25rem'};
  
  :focus-within > label {
    opacity: 0;
  }
`

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
  
`

const Placeholder = styled.label<{ active: boolean }>`
  position: absolute;

  ${props => props.active && 'opacity: 0;'}

  pointer-events: none;
  
  transform-origin: top left;
  transition: all 0.2s ease-out;
`

const Trailing = styled.div`
  grid-area: trailing;
  place-self: center end;

  height: fit-content;
`

const InputCaptionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  flex: 1 1 auto;
`

const Caption = styled.div`
  grid-area: caption;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const Input = styled.input<Pick<StylingProps, 'fontSize' | 'lineHeight'>>`
  grid-area: input;

  border: none;
  outline: none;

  height: 100%;
  
  background: ${props => props.theme.launchpad.colors.foreground};
  color: ${props => props.theme.launchpad.colors.text.title};

  font-style: normal;
  font-weight: 700;
  font-size: ${props => props.fontSize ?? '14px'};

  line-height: ${props => props.lineHeight ?? '17px'};
  letter-spacing: -0.02em;

  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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