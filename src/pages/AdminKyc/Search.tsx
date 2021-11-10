import React, { ChangeEvent } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import { useGetKycList } from 'state/admin/hooks'

let timer = null as any

export const Search = () => {
  const getKysList = useGetKycList()

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    clearTimeout(timer)
    timer = setTimeout(() => getKysList({ page: 1, offset: 10, search: value }), 250)
  }

  return <Input placeholder={t`Search for Wallet or Token`} onChange={onSearchChange} />
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
