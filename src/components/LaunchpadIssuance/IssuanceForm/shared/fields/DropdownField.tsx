import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ErrorText } from 'components/LaunchpadMisc/styled'
import { ChevronDown } from 'react-feather'
import { FormFieldWrapper, OptionalLabel } from '../styled'

interface Option<T> {
  value: T
  label: string
}

interface Props<T> {
  label: string
  placeholder?: string

  options: Option<T>[]

  searchable?: boolean
  optional?: boolean
  span?: number
  error?: string

  field: string
  setter?: (field: string, value: T) => void
  onChange?: (value: T) => void
}

export function DropdownField<T>(props: Props<T>) {
  const theme = useTheme()

  const container = React.useRef<HTMLDivElement>(null)

  const [selectedValue, setSelectedValue] = React.useState<Option<T> | undefined>()
  const [showDropdown, setShowDropdown] = React.useState(false)

  const [optionSearch, setOptionSearch] = React.useState<string>()

  const options = React.useMemo(() => {
    if (!props.searchable) {
      return props.options
    }

    if (!optionSearch) {
      return props.options
    }

    const query = optionSearch.toLowerCase()

    return props.options.filter(x => x.label.toLowerCase().startsWith(query))
  }, [optionSearch])

  const toggle = React.useCallback(() => setShowDropdown(state => !state), [])
  const select = React.useCallback((option: Option<T>) => {
    setSelectedValue(option)
    setOptionSearch(option.label)

    if (props.field && props.setter) {
      props.setter(props.field, option.value)
    }

    if (props.onChange) {
      props.onChange(option.value)
    }
  }, [])
  
  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document?.addEventListener('click', handleClickOutside)

      return () => {
        document?.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showDropdown, container])

  return (
    <FormFieldWrapper gap="0.5rem" span={props.span}>
      <FieldContainer ref={container} onClick={toggle}>
        <FieldLabel>
          {props.label}
          {props.optional && <OptionalLabel>Optional</OptionalLabel>}
        </FieldLabel>

        {!props.searchable && props.placeholder && !selectedValue && (
          <FieldPlaceholder>{props.placeholder}</FieldPlaceholder>
        )}

        {!props.searchable && (!props.placeholder || selectedValue) && (
          <FieldSelectedValue>{selectedValue?.label ?? 'Select'}</FieldSelectedValue>
        )}

        {props.searchable && (
          <OptionSearch placeholder={props.placeholder ?? 'Select'} value={optionSearch} onChange={e => setOptionSearch(e.target.value)} />
        )}

        {showDropdown && (
          <FieldOptionList>
            {options.map((option, idx) => (
              <FieldOption key={idx} onClick={() => select(option)}>{option.label}</FieldOption>
            ))}
          </FieldOptionList>
        )}
        
        <FieldIcon isOpen={showDropdown}>
          <ChevronDown fill={theme.launchpad.colors.text.bodyAlt} size="18" />
        </FieldIcon>
      </FieldContainer>

      {props.error && <ErrorText>{props.error}</ErrorText>}
    </FormFieldWrapper>
  )
}

const FieldContainer = styled.div`
  position: relative;

  display: grid;

  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr 10px;
  grid-template-areas:
    "label icon"
    "value icon";

  place-content: start center;

  gap: 0.25rem;
  padding: 1rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const FieldIcon = styled.div<{ isOpen: boolean }>`
  grid-area: icon;

  display: grid;
  place-content: center;

  > svg {
    transition: transofrm 0.4s;
    ${props => props.isOpen && 'transform: rotate(180deg);' };
  }
`

const OptionSearch = styled.input`
  border: none;
  background: none;
  outline: none;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldLabel = styled.div`
  grid-area: label;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldPlaceholder = styled.div`
  grid-area: value;
  
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldSelectedValue = styled.div`
  grid-area: value;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldOptionList = styled.div`
  position: absolute;

  bottom: -0.5rem;
  left: 0;
  right: 0;

  transform: translate(0, 100%);

  z-index: 30;

  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  max-height: 300px;
  overflow-y: auto;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const FieldOption = styled.div`
  padding: 0.5rem 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  cursor: pointer;

  background: ${props => props.theme.launchpad.colors.background};
  color: ${props => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`
