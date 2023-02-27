import React from 'react'
import styled from 'styled-components'
import { OptionalLabel } from '../IssuanceForm/shared/styled'
import { Column } from 'components/LaunchpadMisc/styled'
import { text19, text37 } from 'components/LaunchpadMisc/typography'

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
  span?: number
  value?: string
  error?: string
  field: string
  setter: (field: string, value: string) => void
  touch?: (field: string, touched: boolean) => void
  onChange?: (value: string) => void
  inputFilter?: (value: string) => string
}

export const TextAreaInner: React.FC<Props> = (props) => {
  const onChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setter(props.field, event.target.value)

    if (props.touch) {
      props.touch(props.field, true)
    }
  }, [])

  return (
    <FieldContainer disabled={props.disabled}>
      <FieldInputContainer
        className={props.className}
        height={props.height}
        padding={props.padding}
        borderless={props.borderless}
      >
        <InnerContainer>
          {props.label && (
            <Label>
              {props.label} {props.optional && <OptionalLabel>Optional</OptionalLabel>}
            </Label>
          )}
          {props.placeholder && <FieldPlaceholder>{props.placeholder}</FieldPlaceholder>}

          <Textarea value={props.value} onChange={onChange} disabled={props.disabled} />
        </InnerContainer>

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

  ${(props) =>
    props.disabled &&
    `
    background: ${props.theme.launchpad.colors.foreground};
  `}
`

const InnerContainer = styled(Column)`
  flex-grow: 1;
`

const FieldInputContainer = styled.div<Pick<StylingProps, 'padding' | 'height' | 'borderless'>>`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 0.25rem;

  ${(props) => !props.borderless && `border: 1px solid ${props.theme.launchpad.colors.border.default};`}
  border-radius: 8px;

  max-width: 100%;
  padding: ${(props) => props.padding ?? '1rem 1.25rem'};

  :focus-within > label {
    opacity: 0;
  }
`

export const Label = styled.div`
  ${text19}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const ErrorText = styled.div`
  color: ${(props) => props.theme.launchpad.colors.error};

  font-style: normal;
  font-weight: 500;
  font-size: 10px;
`

const FieldPlaceholder = styled.div`
  ${text37}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const Textarea = styled.textarea<{ fontSize?: string; lineHeight?: string }>`
  min-height: 160px;
  max-width: 100%;
  padding: 0;
  outline: none;
  resize: none;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  grid-area: input;
  border: none;
  outline: none;
  background: none;

  color: ${(props) => props.theme.launchpad.colors.text.title};

  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.fontSize ?? '14px'};

  line-height: ${(props) => props.lineHeight ?? '17px'};
  letter-spacing: -0.02em;
`
