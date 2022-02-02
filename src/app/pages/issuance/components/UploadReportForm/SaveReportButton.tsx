import { Submit } from 'components/form/Submit'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const SaveReportButton = () => {
  const { formState } = useFormContext()
  return <Submit disabled={!formState.isValid}>Save Report</Submit>
}
