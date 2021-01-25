import { useState } from 'react'

export const useToggleValue = (): [boolean, () => void] => {
  const [value, setValue] = useState(false)
  const toggleValue = () => setValue(v => !v)

  return [value, toggleValue]
}
