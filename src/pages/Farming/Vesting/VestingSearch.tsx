import { t } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveCustomVestingAddress } from 'state/vesting/actions'
import styled from 'styled-components'
import { isValidAddress } from 'utils'
import { ReactComponent as Close } from '../../../assets/images/cross.svg'

// todo use button inside search
export const VestingSearch = () => {
  const dispatch = useDispatch()
  const [address, handleAddres] = useState('')
  const [addressChecked, handleAddressChecked] = useState(false)

  const { account } = useActiveWeb3React()

  useEffect(() => {
    dispatch(saveCustomVestingAddress({ customVestingAddress: '' }))
    handleAddres('')
  }, [account])

  const onChange = (e: { target: { value: string } }) => {
    const input = e.target.value.trim()
    handleAddres(input)
    if (isValidAddress(input)) {
      checkAddress(input)
    }
    if (input.length === 0) {
      clear()
    }
  }

  const checkAddress = async (input?: string) => {
    dispatch(saveCustomVestingAddress({ customVestingAddress: input || address }))
    handleAddressChecked(true)
  }

  const clear = async () => {
    dispatch(saveCustomVestingAddress({ customVestingAddress: '' }))
    handleAddres('')
    handleAddressChecked(false)
  }

  return (
    <InputWrapper>
      <Input
        value={address}
        placeholder={account || t`Check any address`}
        onChange={onChange}
        addressChecked={addressChecked}
      />
      <ButtonWrapper addressChecked={addressChecked}>
        {address && (
          <ClearButton onClick={clear}>
            <Close />
          </ClearButton>
        )}
      </ButtonWrapper>
    </InputWrapper>
  )
}

const ClearButton = styled(ButtonIXSGradient)`
  width: 40px;
  padding: 7px;
`

const ButtonWrapper = styled.div<{ addressChecked: boolean }>`
  position: absolute;
  right: 35px;
  top: 10px;
  > button {
    height: 40px;
  }
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 30px;
  padding: 0 15px;
  margin-bottom: 33px;
`

const Input = styled.input<{ addressChecked: boolean }>`
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
  padding-right: ${({ addressChecked }) => (addressChecked ? '100px' : '175px')};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`
