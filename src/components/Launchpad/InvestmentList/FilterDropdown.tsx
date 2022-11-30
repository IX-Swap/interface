import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'

import { ChevronDown } from 'react-feather'
import { Checkbox } from 'components/Checkbox'

import { ReactComponent as Checked } from 'assets/images/checked_solid.svg'
import { ReactComponent as NotChecked } from 'assets/images/not_checked_solid.svg'

export interface FilterOption<T> {
  label: React.ReactNode
  value: T
}

interface Props<T> {
  label: React.ReactNode
  options: FilterOption<T>[]
  single?: boolean
  onSelect: (options: FilterOption<T>[]) => void
}

interface DropdownPosition {
  x: number
  y: number
}

export function FilterDropdown<T>(props: Props<T>) {
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [position, setPosition] = React.useState<DropdownPosition | null>(null)
  const [selectedOptions, setSelectedOptions] = React.useState<FilterOption<T>[]>([])

  const container = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const rect = container.current?.getBoundingClientRect();
    
    function handleClickOutside(event: Event) {
      if (!container.current?.contains(event.target as Node | null)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      setPosition({ x: rect!.x + window.scrollX, y: rect!.y + window.scrollY + rect!.height + 10 })
      
      document?.addEventListener('click', handleClickOutside)

      return () => {
        document?.removeEventListener('click', handleClickOutside)
      }
    }
  }, [showDropdown, container])

  const selectOption = useCallback((option: FilterOption<T>) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(x => x !== option)
      : props.single ? [option] : selectedOptions.concat(option)

    setSelectedOptions(updatedSelectedOptions)
    props.onSelect(updatedSelectedOptions)
  }, [selectedOptions])

  return (
    <DropdownContainer ref={container}>
      <DropdownButton onClick={() => setShowDropdown(state => !state)}>
        {props.label}

        <DropdownControl open={showDropdown}>
          <ChevronDown />
        </DropdownControl>
      </DropdownButton>

      {showDropdown && position && (
        <DropdownMenu x={position.x} y={position.y} open={showDropdown}>
          {props.options.map((option, idx) => (
            <DropdownOption key={`${props.label}-${idx}`} onClick={() => selectOption(option)}>
              {selectedOptions.includes(option) ? <StyledChecked /> : <StyledNotChecked />}
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  )
}

const DropdownContainer = styled.div`
`

const DropdownButton = styled.button`
  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  padding: 0.5rem 0.75rem;
  height: 40px;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const DropdownMenu = styled.div<{ x?: number, y?: number, open?: boolean }>`
  position: absolute;

  top: ${props => props.y ?? 0}px;
  left: ${props => props.x ?? 0}px;

  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  z-index: 30;

  opacity: ${props => props.open ? '1' : '0'};

  transition: opacity 4s 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

const DropdownOption = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;

  padding: 0.75rem 0.75rem;
  width: 100%;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.text.title};

  &:hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`

const DropdownControl = styled.div<{ open?: boolean }>`
  width: 20px;
  height: 20px;

  > svg {
    margin-left: 8px;
    height: 20px;
    min-width: 20px;

    ${props => props.open && 'transform: rotate(180deg);' };

    transition: 0.4s;
  }
`
const StyledChecked = styled(Checked)`
  height: 14px;
  width: 14px;

  rect {
    fill: ${props => props.theme.launchpad.colors.primary};
  }

  path {
    fill: white;
  }
`

const StyledNotChecked = styled(NotChecked)`
  height: 14px;
  width: 14px;

  rect {
    fill: ${props => props.theme.launchpad.colors.background};
  }

  path {
    fill: white;
  }
`
