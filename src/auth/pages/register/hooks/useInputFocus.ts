import { useEffect, useRef, useState } from 'react'

export const useInputFocus = () => {
  const inputRef = useRef<HTMLInputElement>()
  const [inputDisabled, setInputDisabled] = useState(true)
  const handelInputFocus = () => {
    setInputDisabled(false)
    focusInputField()
  }

  const focusInputField = () => {
    if (!inputDisabled) {
      inputRef?.current?.focus()
    }
  }

  useEffect(() => {
    focusInputField()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputDisabled])

  return {
    inputRef,
    handelInputFocus,
    inputDisabled
  }
}
