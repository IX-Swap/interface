import React, { useCallback, ReactNode } from 'react'
import { Box } from 'rebass'
import { ContainerRow, Input, InputContainer, InputPanel } from './styleds'

interface Props {
  id?: string
  // the typed string value
  value: string
  error: boolean
  onChange: (arg: string) => void
  placeholder?: string
  disabled?: boolean
  rightItem?: ReactNode
}

export const AddressInput = ({ id, value, error, onChange, placeholder, disabled, rightItem }: Props) => {
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
          {rightItem && <Box marginLeft="auto">{rightItem}</Box>}
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
