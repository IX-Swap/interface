import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'

import { ChevronDown } from 'react-feather'

import { ReactComponent as Checked } from 'assets/images/checked_solid.svg'
import { ReactComponent as NotChecked } from 'assets/images/not_checked_solid.svg'
import { text8 } from 'components/LaunchpadMisc/typography'
import {ReactComponent as DropdownIcon} from 'assets/images/dropdownIcon.svg'

export interface FilterOption<T> {
  label: React.ReactNode
  value: T
}

interface Props<T> {
  label: React.ReactNode
  options: FilterOption<T>[]
  single?: boolean
  disabled?: boolean
  onSelect: (options: FilterOption<T>[]) => void
  selected: FilterOption<T> | FilterOption<T>[]
}

interface DropdownPosition {
  x: number
  y: number
}

export function FilterDropdown<T>({ label, options, single, disabled = false, onSelect, selected }: Props<T>) {
  const [touched, setTouched] = React.useState(false)
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [position, setPosition] = React.useState<DropdownPosition | null>(null)
  const [selectedOptions, setSelectedOptions] = React.useState<FilterOption<T>[]>([])

  const container = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const rect = container.current?.getBoundingClientRect()
    if (!rect) return
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      setPosition({ x: rect.x + window.scrollX, y: rect.y + window.scrollY + rect.height + 10 })

      document?.addEventListener('click', handleClickOutside)

      return () => {
        document?.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showDropdown, container])

  const getIsChecked = useCallback(
    (option: any) => Boolean(selectedOptions.find((sel) => sel.value === option.value)),
    [selectedOptions]
  )

  const selectOption = useCallback(
    (option: FilterOption<T>) => {
      const updatedSelectedOptions = getIsChecked(option)
        ? selectedOptions.filter((x) => x.value !== option.value)
        : single
        ? [option]
        : selectedOptions.concat(option)

      setSelectedOptions(updatedSelectedOptions)
      onSelect(updatedSelectedOptions)
    },
    [selectedOptions]
  )

  useEffect(() => {
    if (touched || selectedOptions.length > 0) {
      return
    }
    if (Array.isArray(selected) && selected.length) {
      setTouched(true)
      setSelectedOptions(selected)
    } else if (!Array.isArray(selected) && selected) {
      setTouched(true)
      setSelectedOptions([selected])
    }
  }, [selected, selectedOptions, touched, setTouched])

  return (
    <DropdownContainer ref={container} disabled={disabled}>
      <DropdownButton onClick={() => setShowDropdown((state) => !state)} disabled={disabled}>
        {label}

        <DropdownControl open={showDropdown}>
          <DropdownIcon  style={{height: '6px', width: '6px', marginTop: '7px' }}/>
        </DropdownControl>
      </DropdownButton>

      {showDropdown && position && (
        <DropdownMenu x={position.x} y={position.y} open={showDropdown}>
          {options.map((option, idx) => (
            <DropdownOption key={`${label}-${idx}`} onClick={() => selectOption(option)}>
              {getIsChecked(option) ? <StyledChecked /> : <StyledNotChecked />}
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  )
}

const DropdownContainer = styled.div<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
const DropdownButton = styled.button`
  background: ${(props) =>
    props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  font-family: ${(props) => props.theme.launchpad.font};
  border-radius: 6px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.5rem 0.75rem;
  height: 40px;

  ${text8}

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const DropdownMenu = styled.div<{ x?: number; y?: number; open?: boolean }>`
  position: absolute;
  top: ${(props) => props.y ?? 0}px;
  left: ${(props) => props.x ?? 0}px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  z-index: 30;
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: opacity 4s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

const DropdownOption = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;

  ${text8}

  padding: 0.75rem 0.75rem;
  width: 100%;
  cursor: pointer;
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.title};
  &:hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }
`

const DropdownControl = styled.div<{ open?: boolean }>`
  width: 20px;
  height: 20px;

  > svg {
    margin-left: 8px;
    height: 20px;
    min-width: 20px;
    ${(props) => props.open && 'transform: rotate(180deg);'};
    transition: 0.4s;
  }
`
const StyledChecked = styled(Checked)`
  height: 14px;
  width: 14px;

  rect {
    fill: ${(props) => props.theme.launchpad.colors.primary};
  }

  path {
    fill: white;
  }
`

const StyledNotChecked = styled(NotChecked)`
  height: 14px;
  width: 14px;

  rect {
    fill: ${(props) => props.theme.launchpad.colors.background};
  }

  path {
    fill: white;
  }
`
