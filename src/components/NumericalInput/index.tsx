import React, { useEffect, useState } from 'react'
import { StyledNumberInput } from 'theme'
import { escapeRegExp } from '../../utils'
import { useLocation } from 'react-router-dom'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export const formatNumberValue = (value: string | number) => {
  const stringValue = value ? `${value}` : ''
  const [numberPart] = stringValue.split('.')
  const thousands = /\B(?=(\d{3})+(?!\d))/g
  const formatedNumberPart = numberPart.replaceAll(thousands, ',')

  return stringValue.replace(/^(.*?)(?=\.|$)/g, formatedNumberPart)
}

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  prependSymbol,
  maxLength = 79,

  ...rest
}: {
  value: string | number
  onUserInput: (input: string) => void
  error?: boolean
  fontSize?: string
  align?: 'right' | 'left'
  maxLength?: number

  prependSymbol?: string | undefined
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  const [isActiveRoute, setIsActiveRoute] = useState(false)

  useEffect(() => {
    setIsActiveRoute(window.location.href.includes('add') || window.location.href.includes('find'))
  }, [])

  return (
    <StyledNumberInput
      route={isActiveRoute}
      {...rest}
      value={prependSymbol && value ? prependSymbol + value : formatNumberValue(value)}
      onChange={(event) => {
        const inputValue = event.target.value;

        if (prependSymbol) {
          // Cut off prepended symbol
          const formattedValue = inputValue.includes(prependSymbol)
            ? inputValue.slice(prependSymbol.length)
            : inputValue;

          // Replace commas with periods, because ixswap exclusively uses period as the decimal separator
          enforcer(formattedValue.replace(/,/g, '.'));
        } else {
          enforcer(inputValue.replace(/,/g, '.'));
        }
      }}
      // Universal input options
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      // Text-specific options
      type="text"
      pattern="[0-9]*[.]?[0-9]*"
      placeholder={placeholder || '0.00'}
      minLength={1}
      maxLength={maxLength}
      spellCheck="false"
    />
  )
})

export default Input

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
