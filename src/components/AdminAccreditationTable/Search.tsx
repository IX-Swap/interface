import React, { ChangeEvent, CSSProperties } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

let timer = null as any

interface Props {
  placeholder?: string
  setSearchValue: (newValue: string) => void
  style?: CSSProperties
}

export const Search = ({ setSearchValue, placeholder, style }: Props) => {
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    clearTimeout(timer)
    timer = setTimeout(() => setSearchValue(value), 250)
  }

  return <Input style={style} placeholder={t`${placeholder || 'Search for Wallet or Token'}`} onChange={onSearchChange} />
}

export const Input = styled.input`
  background-color: ${({ theme, value }) => (value ? theme.bg7 : theme.bg12)};
  font-size: 20px;
  border-radius: 100px;
  width: 100%;
  height: 60px;
  outline: none;
  border: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.text9};
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  padding: 10px 22px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`
