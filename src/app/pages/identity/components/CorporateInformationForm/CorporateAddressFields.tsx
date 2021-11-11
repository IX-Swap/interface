import React, { useEffect } from 'react'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { useFormContext } from 'react-hook-form'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { Grid } from '@material-ui/core'
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
    <>
      <FormSectionHeader
        title='Address'
        subtitle='Please provide the address'
      />
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <FormSectionHeader variant='subsection' title='Registered Address' />
          <AddressFields rootName='companyAddress' />
        </Grid>
        <Grid item>
          <TypedField
            customRenderer
            component={Checkbox}
            defaultValue={isMailingAddressSame ?? true}
            control={control}
            valueExtractor={booleanValueExtractor}
            name='isMailingAddressSame'
            label='Is your mailing address same as registered address?'
          />
        </Grid>
        {!isMailingAddressSame ? (
          <Grid item>
            <FormSectionHeader variant='subsection' title='Mailing Address' />
            <AddressFields rootName='mailingAddress' />
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}
