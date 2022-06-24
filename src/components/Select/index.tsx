import React, { useMemo } from 'react'
import ReactSelect, { StylesConfig, components } from 'react-select'
import styled, { css } from 'styled-components'

import { Checkbox } from 'components/Checkbox'

type Option = { label?: string; value?: any; disabled?: boolean }

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
  isClearable?: boolean
}

const colourStyles = {
  placeholder: (styles: Record<string, any>) => {
    return {
      ...styles,
      color: '#EDCEFF80',
    }
  },
  option: (styles: Record<string, any>, { isSelected, isMulti }: { isSelected: boolean; isMulti: boolean }) => {
    return {
      ...styles,
      backgroundColor: isSelected && !isMulti ? '#272046' : 'transparent',
      color: isSelected && !isMulti ? 'white' : 'rgba(237, 206, 255, 0.5)',
      fontWeight: isSelected && !isMulti ? '700' : '400',
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
  multiValue: (styles: Record<string, any>) => {
    return {
      ...styles,
      fontWeight: 600,
    }
  },
  valueContainer: (styles: Record<string, any>) => {
    return {
      ...styles,
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexWrap: 'nowrap',
      display: 'flex',
    }
  },
  control: (styles: Record<string, any>) => {
    return {
      ...styles,
      flexWrap: 'nowrap',
    }
  },
}

const MultiValue = (props: any) => {
  const valuesArray = useMemo(
    (): { label: string; value: any }[] => props?.selectProps?.value || [],
    [props?.selectProps?.value]
  )

  const itemIndex = valuesArray.findIndex(({ value }) => value === props?.data?.value)

  const isLast = itemIndex === valuesArray.length - 1

  return (
    <StyledValue>
      {props?.data?.icon}
      {`${props?.data?.label}${isLast ? '' : `,`}`}
      {!isLast && <>&nbsp;</>}
    </StyledValue>
  )
}

const SingleValue = (props: any) => {
  return (
    <StyledValue disabled={props.isDisabled}>
      {props?.data?.icon}
      {props?.data?.label}
    </StyledValue>
  )
}

const Option = (props: any) => {
  return (
    <components.Option {...props}>
      <StyledValue disabled={props.isDisabled}>
        {props.isMulti && <Checkbox checked={props.isSelected} label="" />}
        {props?.data?.icon}
        {props?.data?.label}
      </StyledValue>
    </components.Option>
  )
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
  isClearable = true,
  error = '',
  borderRadius = '36px',
}: Props) => {
  const selectedValue = useMemo(() => {
    if (isMulti) {
      return value.map((el: any) =>
        options.find((option) => option.label === (el?.label || el) || option.value === (el?.value || el))
      )
    }
    return (
      options.find((option) => option.label === (value?.label || value) || option.value === (value?.value || value)) ||
      null
    )
  }, [value, options, isMulti])

  return (
    <StyledReactSelect
      error={error}
      options={options}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      onChange={(option: unknown) => {
        onSelect(option as Option)
      }}
      components={{ MultiValue, SingleValue, Option }}
      value={selectedValue}
      placeholder={placeholder}
      name={name}
      styles={colourStyles as StylesConfig}
      borderRadius={borderRadius}
      isDisabled={isDisabled}
      hideSelectedOptions={false}
      closeMenuOnSelect={!isMulti}
      isOptionDisabled={(option: any) => option.isDisabled}
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
    /* ${({ error }) =>
      error &&
      css`
        border: 1px solid;
        border-color: #ed0376 !important;
      `} */
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
      :active {
        background-color: inherit;
      }
    }
  }
`

const StyledValue = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 4px;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`
