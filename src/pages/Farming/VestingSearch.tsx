import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { ReactComponent as CrossSvg } from '../../assets/images/cross.svg'

// todo use button inside search
export const VestingSearch = () => {
  const [search, setSearch] = useState('')
  const [isShowedChecked, setIsShowedChecked] = useState(true)
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const onCheck = () => {
    // todo search by search field
    setIsShowedChecked(false)
  }
  const onCross = () => {
    // todo setup default address back
    setSearch('')
    setIsShowedChecked(true)
  }

  return (
    <VestingSearchWrapper>
      <SearchInput
        id="vesting-search"
        name="vesting-search"
        type="text"
        placeholder={t`Check any address`}
        maxLength={42}
        value={search}
        onChange={onSearchChange}
        disabled={!isShowedChecked}
      />
      {isShowedChecked && (
        <CheckBtn onClick={onCheck} disabled={!search}>
          <Trans>Check</Trans>
        </CheckBtn>
      )}
      {!isShowedChecked && (
        <CrossBtn onClick={onCross}>
          <CrossSvg />
        </CrossBtn>
      )}
    </VestingSearchWrapper>
  )
}

// todo reuse colors from theme where possible
const VestingSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
`
const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  background: rgba(39, 31, 74, 0.3);
  border: 1px solid #272046;
  box-sizing: border-box;
  border-radius: 100px;
  padding: 10px 22px;
  font-size: 20px;
  color: #9184c3;
  ::placeholder {
    color: #9184c3;
  }
  outline: none;
`

const CheckBtn = styled.button`
  width: 127px;
  height: 40px;
  background: linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);
  border-radius: 40px;
  color: #edceff;
  font-size: 18px;
  border: none;
  line-height: 20px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
  &:disabled {
    background: linear-gradient(116.36deg, #37205b 33.43%, #590d4c 95.41%);
    cursor: auto;
    pointer-events: none;
  }
`

const CrossBtn = styled.button`
  background: linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);
  border-radius: 40px;
  width: 40px;
  height: 40px;
  border: none;
  :hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`
