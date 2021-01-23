import { useState } from 'react'

export const useIndividualAccountSettings = (init: number) => {
  const [value, setValue] = useState(init)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(newValue)
  }

  return {
    value,
    setValue,
    handleChange
  }
}
