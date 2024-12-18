import React, { useCallback } from 'react'
import { Box } from 'rebass'
import { ContainerRow, Input, InputContainer, InputPanel } from './styleds'

interface Props {
  id?: string
  name?: string
  value: string
  error: boolean
  onChange?: ((arg: string) => void) | null
  placeholder?: string
  disabled?: boolean
  rightItem?: JSX.Element
  fontSize?: number
}

export const AddressInput = ({
  id,
  name,
  value,
  error,
  placeholder,
  disabled,
  rightItem,
  onChange = null,
  fontSize = 16,
}: Props) => {
  const handleInput = useCallback(
    (event: { target: { value: string } }) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange && onChange(withoutSpaces)
    },
    [onChange]
  )
  return (
    <InputPanel>
      <ContainerRow>
        <InputContainer>
          <Input
            name={name}
            id={id}
            style={{ textOverflow: 'unset', fontSize }}
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
