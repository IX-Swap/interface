import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { FieldsArray } from 'components/form/FieldsArray'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { DSOFAQItem } from 'app/components/DSO/components/DSOFAQItem'
import { VSpacer } from 'components/VSpacer'

interface DSOFAQsProps {
  isNew?: boolean
}

export const DSOFAQs = ({ isNew = false }: DSOFAQsProps) => {
  const fieldSectionName = 'faqs'
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid container direction='column'>
      <Grid item>
        <FormSectionHeader title='FAQs' />
      </Grid>
      <FieldsArray name={fieldSectionName} control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column'>
            <Grid item container direction='column'>
              {fields.map((item, index) => {
                return (
                  <DSOFAQItem
                    isNew={isNew}
                    key={item.id}
                    defaultValue={fields[index] as any}
                    fieldId={item.id}
                    index={index}
                    remove={remove}
                  />
                )
              })}
            </Grid>
            <VSpacer size={'small'} />
            <Grid item container justifyContent='flex-end' alignItems='center'>
              <FormError name={fieldSectionName} render={TextError} />
              <DSOChapterAddButton append={append} text={'ADD NEW FAQ'} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </Grid>
  )
}
