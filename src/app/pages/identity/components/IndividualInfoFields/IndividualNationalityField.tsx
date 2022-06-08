import { MenuItem, TextField } from '@mui/material'
import { useIsSingPass } from 'app/pages/identity/hooks/useIsSingPass'
import { NationalitySelect } from 'components/form/NationalitySelect'
import { TypedField } from 'components/form/TypedField'
import { hasValue } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface IndividualNationalityFieldProps {
  rootName?: string
}

export const IndividualNationalityField = ({
  rootName
}: IndividualNationalityFieldProps) => {
  const {
    isSingPass: _isSingPass,
    singPassData,
    individualIdentity
  } = useIsSingPass()
  const { control } = useFormContext()
  const isSingPass = _isSingPass && hasValue(singPassData?.nationality)

  return (
    <TypedField
      rootName={rootName}
      component={isSingPass ? TextField : NationalitySelect}
      control={control}
      name='nationality'
      label='Nationality'
      variant='outlined'
      disabled={isSingPass}
      select={isSingPass}
    >
      {isSingPass ? (
        <MenuItem value={individualIdentity?.nationality}>
          {individualIdentity?.nationality}
        </MenuItem>
      ) : null}
    </TypedField>
  )
}
