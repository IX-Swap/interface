import { t } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveCustomVestingAddress } from 'state/vesting/actions'
import { useVestingStatus } from 'state/vesting/hooks'
import styled from 'styled-components'
import { ReactComponent as Close } from '../../../assets/images/cross.svg'

// todo use button inside search
export const VestingSearch = () => {
  const dispatch = useDispatch()
  const { getVesting } = useVestingStatus()
  const [address, handleAddres] = useState('')
  const [addressChecked, handleAddressChecked] = useState(false)

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (address) {
      dispatch(saveCustomVestingAddress({ customVestingAddress: '' }))
      handleAddres('')
    }
  }, [account])

  const onChange = (e: { target: { value: string } }) => {
    handleAddres(e.target.value)
  }

  const checkAddress = async () => {
    await getVesting(address)
    dispatch(saveCustomVestingAddress({ customVestingAddress: address }))
    handleAddressChecked(true)
  }

  const clear = async () => {
    await getVesting('')
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
        {addressChecked ? (
          <ClearButton onClick={clear}>
            <Close />
          </ClearButton>
        ) : (
          <CheckButton disabled={!/^0x[a-fA-F0-9]{40}$/.test(address)} onClick={checkAddress}>{t`Check`}</CheckButton>
        )}
      </ButtonWrapper>
    </InputWrapper>
  )
}

const CheckButton = styled(ButtonIXSGradient)`
  padding: 16px;
  min-width: 127px;
`
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
