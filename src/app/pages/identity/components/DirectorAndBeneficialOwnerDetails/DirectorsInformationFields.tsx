import { Grid } from '@mui/material'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { CountrySelect } from 'components/form/CountrySelect'
import { LegalEntityStatusSelect } from 'components/form/LegalEntityStatusSelect'
import { PhoneInput } from 'components/form/PhoneInput'
import { TypedField } from 'components/form/TypedField'
import { pathToString, plainValueExtractor } from 'helpers/forms'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
export interface DirectorsInformationFieldsProps {
  rootName: string
  index: number
  fieldId: string
}

export const DirectorsInformationFields = ({
  rootName,
  index,
  fieldId
}: DirectorsInformationFieldsProps) => {
  const { control, watch, clearErrors } = useFormContext()

  const legalEntityStatus = pathToString([rootName, index, 'legalEntityStatus'])
  const legalEntityStatusValue = watch(legalEntityStatus)

  useEffect(() => {
    if (legalEntityStatusValue !== 'others') {
      control.setValue(
        pathToString([rootName, index, 'otherLegalEntityStatus']),
        ''
      )
      clearErrors('otherLegalEntityStatus')
    }
  }, [legalEntityStatusValue]) // eslint-disable-line

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <TypedField
          key={fieldId}
          component={TextInput}
          control={control}
          variant='outlined'
          name={[rootName, index, 'fullName']}
          label='Full Name'
          placeholder='Full Name'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          key={fieldId}
          component={TextInput}
          control={control}
          variant='outlined'
          name={[rootName, index, 'designation']}
          label='Designation'
          fullWidth
          placeholder='Add Designation'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          key={fieldId}
          component={TextInput}
          control={control}
          variant='outlined'
          name={[rootName, index, 'email']}
          label='Email Address'
          fullWidth
          placeholder='Email Address'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          key={fieldId}
          component={PhoneInput}
          control={control}
          valueExtractor={plainValueExtractor}
          name={[rootName, index, 'contactNumber']}
          label='Contact Number'
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          component={LegalEntityStatusSelect}
          control={control}
          variant='outlined'
          name={[rootName, index, 'legalEntityStatus']}
          label='Legal Entity'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          fullWidth
          component={TextInput}
          control={control}
          variant='outlined'
          name={[rootName, index, 'otherLegalEntityStatus']}
          label='Others (Legal Entity)'
          disabled={legalEntityStatusValue !== 'others'}
          placeholder='Please specify'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          component={CountrySelect}
          control={control}
          variant='outlined'
          name={[rootName, index, 'countryOfFormation']}
          label='Country of Incorporation'
        />
      </Grid>
      <Grid item xs={12}>
        <FormSectionHeader title='Residential Address' />
      </Grid>
      <Grid item xs={12}>
        <AddressFields rootName={pathToString([index, 'address'], rootName)} />
      </Grid>
    </Grid>
  )
}
