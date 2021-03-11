import React, { useEffect } from 'react'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { useFormContext } from 'react-hook-form'
import { AddressFields } from 'app/pages/_identity/components/AddressFields/AddressFields'
import { Grid } from '@material-ui/core'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'

export const CorporateAddressFields = () => {
  const { control, watch, reset, getValues } = useFormContext()
  const mailingSameAsRegistered: boolean = watch(
    'mailingSameAsRegistered',
    true
  )

  useEffect(() => {
    if (mailingSameAsRegistered) {
      reset({ ...getValues(), mailingAddress: {} })
    }
  }, [mailingSameAsRegistered, reset, getValues])

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
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            component={Checkbox}
            defaultValue={true}
            control={control}
            valueExtractor={booleanValueExtractor}
            name='mailingSameAsRegistered'
            label='Is your mailing address same as registered address?'
          />
        </Grid>
        {!mailingSameAsRegistered ? (
          <Grid item>
            <FormSectionHeader variant='subsection' title='Mailing Address' />
            <AddressFields rootName='mailingAddress' />
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}
