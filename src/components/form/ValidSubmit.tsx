import { Submit } from 'components/form/Submit'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const ValidSubmit: React.FC = ({ children }) => {
  const {
    formState: { isValid }
  } = useFormContext()
  return <Submit disabled={!isValid}>{children}</Submit>
}
