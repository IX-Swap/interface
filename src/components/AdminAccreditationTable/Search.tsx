import React, { ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'

import { useGetAccreditationList } from 'state/admin/hooks'

let timer = null as any

interface Props {
  page?: number
  placeholder?: string
  setSearchValue?: (newValue: string) => void
}

export const Search = ({ setSearchValue, placeholder }: Props) => {
  const getKysList = useGetAccreditationList()

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    clearTimeout(timer)
    timer = setTimeout(() => getKysList({ page: 1, offset: 10, search: value }), 250)
    setSearchValue && setSearchValue(value)
  }

  return <Input placeholder={t`${placeholder || 'Search for Wallet or Token'}`} onChange={onSearchChange} />
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
    color: #edceff50;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  padding: 10px 22px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`
