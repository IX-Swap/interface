import React, { useCallback } from 'react'
import { ContainerRow, Input, InputContainer, InputPanel } from './styleds'

interface Props {
  id?: string
  // the typed string value
  value: string
  error: boolean
  onChange: (arg: string) => void
  placeholder?: string
  disabled?: boolean
}

export const AddressInput = ({ id, value, error, onChange, placeholder, disabled }: Props) => {
  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange]
  )
  return (
    <InputPanel id={id}>
      <ContainerRow>
        <InputContainer>
          <Input
            className="recipient-address-input"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder || 'Wallet Address'}
            error={error}
            pattern="^(0x[a-fA-F0-9]{40})$"
            onChange={handleInput}
            value={value}
            disabled={disabled}
          />
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
