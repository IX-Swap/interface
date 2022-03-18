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
  error?: string
}

const colourStyles = {
  option: (styles: Record<string, any>, { isSelected }: { isSelected: boolean }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#272046' : 'transparend',
      color: isSelected ? 'white' : 'rgba(237, 206, 255, 0.5)',
      fontWeight: isSelected ? '700' : '400',
    }
  },
  singleValue: (styles: Record<string, any>) => {
    return {
      ...styles,
      color: 'white',
      fontSize: '16px',
    }
  },
  dropdownIndicator: (
    styles: Record<string, any>,
    { selectProps: { menuIsOpen } }: { selectProps: { menuIsOpen: boolean } }
  ) => {
    return {
      ...styles,
      color: '#9184C3',
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
      color: 'white',
      maxHeight: '188px',
    }
  },
}

export const Select = ({ onSelect, value, options, placeholder = '', name, isMulti = false, error = '' }: Props) => {
  const selectedValue = useMemo(() => options.find((option) => option.value === value), [value])

  return (
    <StyledReactSelect
      error={error}
      options={options}
      isMulti={isMulti}
      onChange={(option: unknown) => {
        onSelect((option as Option).value)
      }}
      value={selectedValue}
      placeholder={placeholder}
      name={name}
      styles={colourStyles as StylesConfig}
    />
  )
}

const StyledReactSelect = styled(ReactSelect)<{ error: string }>`
  *[class*='control'] {
    box-shadow: none;
    cursor: pointer;
    height: 60px;
    border-radius: 36px;
    padding: 0px 16px;
    background: rgba(39, 31, 74, 0.4);
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
        background: rgba(39, 31, 74, 0.4);
      }
    }
  }
`
