import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FieldsArray } from 'components/form/FieldsArray'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { DSOFAQItem } from 'app/components/DSO/components/DSOFAQItem'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { Divider } from 'ui/Divider'

export const DSOFAQs = () => {
  const fieldSectionName = 'faqs'
  const { isTablet } = useAppBreakpoints()
  const { control } = useFormContext<DSOFormValues>()
  const theme = useTheme()
  const greyText = theme.palette.mode === 'dark' ? 500 : 600

  return (
    <Grid container direction='column'>
      <Grid item>
        <Grid container>
          <FormSectionHeader title='FAQs' />
          <Typography
            style={{
              color: theme.palette.grey[greyText],
              marginLeft: '0.5rem',
              marginTop: '0.25rem'
            }}
            variant='body1'
          >
            (Optional)
          </Typography>
        </Grid>
      </Grid>
      <FieldsArray name={fieldSectionName} control={control}>
        {({ fields, append, remove }) => (
          <Grid container direction='column' spacing={{ xs: 4, md: 5 }}>
            <Grid item container direction='column'>
              {fields.map((item, index) => {
                console.log(fields, 'field')
                return (
                  <DSOFAQItem
                    key={item.id}
                    defaultValue={fields[index] as any}
                    fieldId={item.id}
                    index={index}
                    remove={remove}
                    item={fields}
                  />
                )
              })}
            </Grid>

            {!isTablet && (
              <Grid item sx={{ marginTop: 3 }}>
                <Divider />
              </Grid>
            )}

            <Grid item container justifyContent='flex-end' alignItems='center'>
              <FormError name={fieldSectionName} render={TextError} />
              <DSOChapterAddButton append={append} text={'Add FAQ'} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </Grid>
  )
}
