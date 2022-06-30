import React, { useMemo } from 'react'
import ReactSelect, { StylesConfig } from 'react-select'
import styled, { css } from 'styled-components'

type Option = { label?: string; value?: any }

interface Props {
  onSelect: (item: any) => void
  value: any
  options: Array<Option>
  placeholder?: string
  name?: string
  isMulti?: boolean
  isSearchable?: boolean
  error?: string
  borderRadius?: string
  isDisabled?: boolean
}

const colourStyles = {
  option: (styles: Record<string, any>, { isSelected }: { isSelected: boolean }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? 'bg11' : 'transparend',
      color: isSelected ? 'text1' : 'text9',
      fontWeight: isSelected ? '700' : '400',
    }
  },
  singleValue: (styles: Record<string, any>) => {
    return {
      ...styles,
      color: 'text1',
      fontSize: '16px',
    }
  },
  dropdownIndicator: (
    styles: Record<string, any>,
    { selectProps: { menuIsOpen } }: { selectProps: { menuIsOpen: boolean } }
  ) => {
    return {
      ...styles,
      color: 'text8',
      svg: {
        ...(menuIsOpen && {
          transform: 'rotate(180deg)',
        }),
      },
    }
  },
  menuList: (styles: Record<string, any>) => {
    return {
      ...styles,
      color: 'text1',
      maxHeight: '188px',
    }
  },
}

export const Select = ({
  onSelect,
  value,
  options,
  placeholder = '',
  name,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  error = '',
  borderRadius = '36px',
}: Props) => {
  const selectedValue = useMemo(
    () =>
      options.find((option) => option.label === (value?.label || value) || option.value === (value?.value || value)),
    [value, options]
  )
  return (
    <StyledReactSelect
      error={error}
      options={options}
      isMulti={isMulti}
      isSearchable={isSearchable}
      onChange={(option: unknown) => {
        onSelect(option as Option)
      }}
      value={selectedValue}
      placeholder={placeholder}
      name={name}
      styles={colourStyles as StylesConfig}
      borderRadius={borderRadius}
      isDisabled={isDisabled}
    />
  )
}

const StyledReactSelect = styled(ReactSelect)<{ error: string; borderRadius: string }>`
  *[class*='control'] {
    box-shadow: none;
    cursor: pointer;
    height: 60px;
    border-radius: ${({ borderRadius }) => borderRadius};
    padding: 0px 16px;
    background: ${({ theme }) => theme.bg19};
    border: none;
    ${({ error }) =>
      error &&
      css`
        border: 1px solid;
        border-color: #ed0376 !important;
      `}
  }
  *[class*='indicatorSeparator'] {
    display: none;
  }
  *[class*='menu'] {
    border-radius: 32px;
    padding: 24px 8px 24px 16px;
    background-color: ${({ theme }) => theme.bg7};
    margin-top: 4px;
    max-height: 236px;
    z-index: 2;
  }
  *[class*='MenuList'] {
    padding: 0px 8px 0 0;
    > div {
      margin-bottom: 4px;
      padding: 2px 8px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 12px;
      :hover {
        background: ${({ theme }) => theme.bg19};
      }
    }
  }
`
