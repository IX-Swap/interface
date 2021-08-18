import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { FieldsArray } from 'components/form/FieldsArray'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { VSpacer } from 'components/VSpacer'
import { DSOVideoItem } from 'app/components/DSO/components/DSOVideoItem'

export const DSOVideoLinks = () => {
  const fieldName = 'videoLinks'
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid container direction='column'>
      <Grid item>
        <FormSectionHeader title='Video Links' />
      </Grid>
      <FieldsArray name={fieldName} control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column'>
            <Grid item container direction='column'>
              {fields.map((value, index) => {
                return (
                  <DSOVideoItem
                    key={value.id}
                    defaultValue={fields[index] as any}
                    fieldId={value.id}
                    index={index}
                    remove={remove}
                  />
                )
              })}
            </Grid>
            <VSpacer size={'small'} />
            <Grid item container justify='flex-end' alignItems='center'>
              <FormError name={fieldName} render={TextError} />
              <DSOChapterAddButton append={append} text={'ADD NEW VIDEO'} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </Grid>
  )
}
