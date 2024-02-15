import React, { useMemo, useState } from 'react'
import ReactSelect, { StylesConfig, components } from 'react-select'
import styled, { css } from 'styled-components'

import { CheckMark, Checkbox } from 'components/Checkbox'
import { isValidAddress, shortAddress } from 'utils'
import { useAddUserToken } from 'state/user/hooks'
import { useToken } from 'hooks/Tokens'
import { Line } from 'components/Line'

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
  addCustom?: boolean
  id?: any
}

const colourStyles = {
  placeholder: (styles: Record<string, any>) => {
    return {
      ...styles,
      color: '#B8B8CC',
    }
  },
  option: (styles: Record<string, any>, { isSelected, isMulti }: { isSelected: boolean; isMulti: boolean }) => {
    return {
      ...styles,
      backgroundColor: isSelected && !isMulti ? 'bg11' : 'transparend',
      color: isSelected && !isMulti ? '#292933' : '#8F8FB2',
      fontWeight: 500,
      margin: '20px 0px',
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
  multiValue: (styles: Record<string, any>) => {
    return {
      ...styles,
      fontWeight: 600,
    }
  },
  valueContainer: (styles: Record<string, any>, { isMulti }: { isMulti: boolean }) => {
    return {
      ...styles,
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      // flexWrap: 'nowrap',
      display: 'flex',


      flexDirection: isMulti ? 'row' : '',
      flexWrap: 'wrap',
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
  const addToken = useAddUserToken()

  return (
    <components.Option {...props}>
      <StyledValue
        style={{ justifyContent: 'space-between' }}
        disabled={props.isDisabled}
        onClick={() => {
          if (props.data?.token) {
            addToken(props.data?.token)
          }
        }}
      >
        {props?.data?.icon}
        {props?.data?.label}
        {props.isMulti && <Checkbox checked={props.isSelected} label="" />}

        {!props.isMulti && <CheckMark checked={props.isSelected} label="" />}
      </StyledValue>

      <Line style={{ marginTop: '10px' }} />
    </components.Option>
  )
}

export const Select = ({
  onSelect,
  value,
  options,
  placeholder = '',
  name,
  id,
  isDisabled = false,
  isSearchable = true,
  isMulti = false,
  isClearable = true,
  error = '',
  borderRadius = '36px',
  addCustom = false,
}: Props) => {
  const [search, handleSearch] = useState('')

  const token = useToken(search)

  const selectedValue = useMemo(() => {
    if (isMulti) {
      console.log(isMulti, 'jjjjjjj')
      return value.map((el: any) =>
        options.find((option) => option.label === (el?.label || el) || option.value === (el?.value || el))
      )
    }
    return (
      options.find((option) => option.label === (value?.label || value) || option.value === (value?.value || value)) ||
      null
    )
  }, [value, options, isMulti])

  const existingToken = useMemo(() => {
    return Boolean(options.find((option) => option.value === search))
  }, [search, options])

  const customOptions = useMemo(() => {
    if (addCustom && isValidAddress(search) && token && !existingToken) {
      return [{ label: `Import ${token.symbol} ${shortAddress(search)}`, value: search, token }, ...options]
    }
    return options
  }, [options, addCustom, search, token])

  return (
    <StyledReactSelect
      onInputChange={handleSearch}
      error={error}
      options={customOptions}
      isSearchable={isSearchable}
      blurInputOnSelect={!isMulti}
      isClearable={isClearable}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      inputId={id}
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
      isOptionDisabled={(option: any) => option.isDisabled}
    />
  )
}

const StyledReactSelect = styled(ReactSelect)<{ error: string; borderRadius: string }>`
  *[class*='control'] {
    box-shadow: none;
    color: #8f8fb2;
    cursor: pointer;
    font-size: 13px;
    height: 60px;
    border-radius: 8px;
    border: 1px solid #e6e6ff !important;
    // border-radius: ${({ borderRadius }) => borderRadius};
    padding: 0px 16px;
    background: ${({ theme }) => theme.bg0};
    border: none;
    ${({ error }) =>
      error &&
      css`
        border: 1px solid;
        border-color: #ff6161 !important;
      `}
  }
  *[class*='indicatorSeparator'] {
    display: none;
  }
  *[class*='menu'] {
    border-radius: 6px;
    padding: 10px 8px 10px 16px;
    background-color: ${({ theme }) => theme.bg0};
    margin-top: 4px;
    max-height: 236px;
    width: auto;
    z-index: 2;
  }
  *[class*='MenuList'] {
    padding: 0px 8px 0 0;
    > div {
      margin-bottom: 4px;
      padding: 2px 8px;
      font-size: 16px;
      cursor: pointer;
      // border-radius: 6px;
      :hover {
        background: ${({ theme }) => theme.bg1};
      }
      :active {
        background-color: ${({ theme }) => theme.bg0};
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
