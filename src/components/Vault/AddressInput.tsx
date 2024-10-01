import React, { useCallback } from 'react'
import { Box } from 'rebass'
import styled from 'styled-components'

interface Props {
  id?: string
  // the typed string value
  value: string
  error: boolean
  onChange?: ((arg: string) => void) | null
  placeholder?: string
  disabled?: boolean
  rightItem?: JSX.Element
}

export const AddressInput = ({ id, value, error, placeholder, disabled, rightItem, onChange = null }: Props) => {
  const handleInput = useCallback(
    (event: { target: { value: string } }) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange && onChange(withoutSpaces)
    },
    [onChange]
  )
  return (
    <InputPanel id={id}>
      <ContainerRow>
        <InputContainer>
          <Input
            style={{ textOverflow: 'unset', fontSize: 16 }}
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
          {rightItem && <RightContent>{rightItem}</RightContent>}
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}

export const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '36px')};
  background-color: ${({ hideInput }) => (hideInput ? 'transparent' : 'transparent')};
  z-index: 1;
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`

export const ContainerRow = styled.div`
  background-color: ${({ theme }) => theme.bg0};
  width: 'initial';
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      boder-radius: 1rem;
  `};
`

export const InputContainer = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 0;
  `};
`

export const Input = styled.input<{ error?: boolean }>`
  font-size: 1.25rem;
  outline: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg0};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  text-align: left;
  font-size: 17px;
  line-height: 40px;
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text2};
    opacity: 0.5;
    font-weight: 500;
  }
  &:disabled {
    color: ${({ theme }) => theme.text2};
    background-color: ${({ theme }) => theme.bg7};
    cursor: not-allowed;
  }
`

const RightContent = styled.div`
  position: absolute;
  right: 0;
  margin-right: 16px;
`
