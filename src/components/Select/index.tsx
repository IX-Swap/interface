import React, { useMemo, useState } from 'react'
import ReactSelect, { StylesConfig, components } from 'react-select'
import styled, { css } from 'styled-components'

import { CheckMark, Checkbox } from 'components/Checkbox'
import { isValidAddress, shortAddress } from 'utils'
import { useAddUserToken } from 'state/user/hooks'
import { useToken } from 'hooks/Tokens'
import { Line } from 'components/Line'
import { ReactComponent as DefaultTokenItem } from 'assets/images/NoToken.svg'
import CurrencyLogo from 'components/CurrencyLogo'
import { NETWORK_LOGOS } from 'constants/chains'
import { NetworkLogo } from 'components/Launchpad/InvestmentCard'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'

type Option = { label?: string; value?: any; disabled?: boolean; network?: string }

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
  isNetworkVisiable?: boolean
  isTokenLogoVisible?: boolean
}

const colourStyles = {
  menuPortal: (styles: Record<string, any>) => {
    return {
      ...styles,
      zIndex: 9999,
    }
  },
  placeholder: (styles: Record<string, any>) => {
    return {
      ...styles,
      color: '#B8B8CC',
    }
  },
  option: (
    styles: Record<string, any>,
    { isSelected, isFocused, isMulti }: { isSelected: boolean; isMulti: boolean; isFocused: boolean }
  ) => {
    return {
      ...styles,
      backgroundColor: isSelected && !isMulti ? 'bg11' : isFocused ? 'transparent' : 'transparent',
      color: isSelected && !isMulti ? '#292933' : '#8F8FB2',
      fontWeight: 500,
      borderBottom: '1px solid #E6E6FF',
      padding: '18px',
      ':active': {
        backgroundColor: 'transparent', // Ensures background stays the same when clicked
      },
      ':last-child': {
        borderBottom: 'none',
      },
      ':hover': {
        color: '#292933',
      },
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
      {props.data?.token ? renderIcon(props?.data) : null}
      {`${props?.data?.label}${isLast ? '' : `,`}`}
      {!isLast && <>&nbsp;</>}
    </StyledValue>
  )
}

const SingleValue = (props: any) => {
  const networkLogo = props?.data?.network ? NETWORK_LOGOS[props?.data?.network] : ''
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '96%' }}>
      <StyledValue disabled={props.isDisabled}>
        {props?.isTokenLogoVisible && props?.data && renderIcon(props.data)}
        {props?.data?.label}
      </StyledValue>
      {props?.isNetworkVisiable ? (
        <StyledValue disabled={props.isDisabled}>
          {capitalizeFirstLetter(props?.data?.network)}
          <NetworkLogo style={{ width: '20px' }} src={networkLogo} alt="network logo" />
        </StyledValue>
      ) : null}
    </div>
  )
}

const renderIcon = (data: any) => {
  const { icon } = data

  if (typeof icon === 'string') {
    return <img src={icon} alt="currency icon" />
  } else if (icon && icon.$$typeof === Symbol.for('react.element')) {
    return icon
  } else {
    return <CurrencyLogo />
  }
}

const Option = (props: any) => {
  const addToken = useAddUserToken()
  const networkLogo = props?.data?.network ? NETWORK_LOGOS[props?.data?.network] : ''

  return (
    <components.Option {...props}>
      <FlexContainer>
        <MainStyledValue
          disabled={props.isDisabled}
          onClick={() => {
            if (props.data?.token) {
              addToken(props.data?.token)
            }
          }}
        >
          {props?.isTokenLogoVisible && props?.data && renderIcon(props.data)}
          {props?.data?.label}
          {props.isMulti && <Checkbox checked={props.isSelected} label="" />}
        </MainStyledValue>
        {props?.isNetworkVisiable ? (
          <MainStyledValue disabled={props.isDisabled}>
            {capitalizeFirstLetter(props?.data?.network)}
            <NetworkLogo style={{ width: '20px' }} src={networkLogo} alt="network logo" />
          </MainStyledValue>
        ) : null}
      </FlexContainer>
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
  isNetworkVisiable,
  isTokenLogoVisible,
}: Props) => {
  const [search, handleSearch] = useState('')

  const token = useToken(search)

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
      menuPortalTarget={document.body}
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
      components={{
        MultiValue,
        SingleValue: (props) => (
          <SingleValue {...props} isNetworkVisiable={isNetworkVisiable} isTokenLogoVisible={isTokenLogoVisible} />
        ),
        Option: (props) => (
          <Option {...props} isNetworkVisiable={isNetworkVisiable} isTokenLogoVisible={isTokenLogoVisible} />
        ),
      }}
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
      `}import { stake } from '../../state/stake/actions'
import { style } from 'styled-system'

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
  column-gap: 6px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`

const FlexContainer = styled(StyledValue)`
  justify-content: space-between;
`

const MainStyledValue = styled(StyledValue)`
  display: flex;
  align-items: center;
`
