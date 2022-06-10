import React, { useEffect } from 'react'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { useFormContext } from 'react-hook-form'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { Grid } from '@mui/material'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'

export const CorporateAddressFields = () => {
  const { control, watch, reset, getValues } = useFormContext()
  const isMailingAddressSame: boolean = watch('isMailingAddressSame', true)

  useEffect(() => {
    if (isMailingAddressSame) {
      reset({ ...getValues(), mailingAddress: {} })
    }
  }, [isMailingAddressSame, reset, getValues])

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormSectionHeader title='Registered Address' />
      </Grid>
      <Grid item xs={12}>
        <AddressFields rootName='companyAddress' />
      </Grid>
      <Grid item xs={12}>
        <TypedField
          customRenderer
          component={Checkbox}
          defaultValue={isMailingAddressSame ?? true}
          control={control}
          valueExtractor={booleanValueExtractor}
          name='isMailingAddressSame'
          label='Mailing Address Is Same As Registered Address'
        />
      </Grid>
      {!isMailingAddressSame ? (
        <>
          <Grid item xs={12}>
            <FormSectionHeader title='Mailing Address' />
          </Grid>
          <Grid item xs={12}>
            <AddressFields rootName='mailingAddress' />
          </Grid>
        </>
      ) : null}
    </Grid>
  )
}
