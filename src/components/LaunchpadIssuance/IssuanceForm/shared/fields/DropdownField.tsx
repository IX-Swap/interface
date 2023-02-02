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
  disabled?: boolean
  optional?: boolean
  emptyOption?: { label: string; value: any }
  span?: number

  value?: T
  error?: string

  field: string
  setter?: (field: string, value?: T) => void
  onChange?: (value?: T) => void
}

export function DropdownField<T>(props: Props<T>) {
  const theme = useTheme()

  const container = React.useRef<HTMLDivElement>(null)

  const [selectedValue, setSelectedValue] = React.useState<Option<T> | undefined>(
    props.options.find((x) => x.value === props.value)
  )
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [searchActive, setSearchActive] = React.useState(false)

  const [optionSearch, setOptionSearch] = React.useState<string>()

  const options = React.useMemo(() => {
    if (!props.searchable) {
      return props.options
    }

    if (!optionSearch || !searchActive) {
      return props.options
    }

    const query = optionSearch.toLowerCase()

    return props.options.filter((x) => x.label.toLowerCase().startsWith(query))
  }, [optionSearch, searchActive])

  const toggle = React.useCallback(() => {
    if (props.disabled) {
      return
    }

    setShowDropdown((state) => !state)
  }, [props.disabled])

  const select = React.useCallback(
    (option: Option<T>) => {
      if (props.disabled) {
        return
      }

      setSelectedValue(option)
      setOptionSearch(option.label)
      setSearchActive(false)

      if (props.field && props.setter) {
        props.setter(props.field, option.value)
      }

      if (props.onChange) {
        props.onChange(option.value)
      }
    },
    [props.disabled, props.onChange, props.setter]
  )

  const updateSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOptionSearch(event.target.value)
      setSearchActive(true)
      setShowDropdown(true)

      setSelectedValue(undefined)

      if (props.field && props.setter) {
        props.setter(props.field, undefined)
      }

      if (props.onChange) {
        props.onChange(undefined)
      }
    },
    [props.setter, props.onChange]
  )

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
      <FieldContainer ref={container} onClick={toggle} disabled={props.disabled}>
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
          <OptionSearch placeholder={props.placeholder ?? 'Select'} value={optionSearch} onChange={updateSearch} />
        )}
        {showDropdown && (
          <FieldOptionList>
            {props.emptyOption && (
              <FieldOption key={props.emptyOption.value} onClick={() => select(props.emptyOption!)}>
                {props.emptyOption.label}
              </FieldOption>
            )}
            {options.map((option, idx) => (
              <FieldOption key={idx} onClick={() => select(option)}>
                {option.label}
              </FieldOption>
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

const FieldContainer = styled.div<{ disabled?: boolean }>`
  position: relative;

  display: grid;

  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr 10px;
  grid-template-areas:
    'label icon'
    'value icon';

  place-content: start center;

  gap: 0.25rem;
  padding: 1rem;

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  ${(props) =>
    props.disabled &&
    `
    background: ${props.theme.launchpad.colors.foreground};
  `}
`

const FieldIcon = styled.div<{ isOpen: boolean }>`
  grid-area: icon;

  display: grid;
  place-content: center;

  > svg {
    transition: transofrm 0.4s;
    ${(props) => props.isOpen && 'transform: rotate(180deg);'};
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

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldLabel = styled.div`
  grid-area: label;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldPlaceholder = styled.div`
  grid-area: value;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const FieldSelectedValue = styled.div`
  grid-area: value;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.01em;

  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
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

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
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

  background: ${(props) => props.theme.launchpad.colors.background};
  color: ${(props) => props.theme.launchpad.colors.text.title};

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`
