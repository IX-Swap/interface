import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FieldsArray } from 'components/form/FieldsArray'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DSOChapterAddButton } from 'app/components/DSO/components/DSOChapterAddButton'
import { DSOVideoItem } from 'app/components/DSO/components/DSOVideoItem'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Divider } from 'ui/Divider'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const DSOVideoLinks = () => {
  const fieldName = 'videos'
  const { isTablet } = useAppBreakpoints()
  const { control } = useFormContext<DSOFormValues>()
  const theme = useTheme()
  const greyText = theme.palette.mode === 'dark' ? 500 : 600

  return (
    <Grid container direction='column' spacing={{ xs: 4, md: 5 }}>
      <Grid item>
        <Grid container>
          <FormSectionHeader title='Video Links' />
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
      <FieldsArray name={fieldName} control={control}>
        {({ fields, append, remove }) => (
          <Grid item container direction='column' spacing={{ xs: 4, md: 5 }}>
            <Grid item container direction='column' spacing={5}>
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

            {!isTablet && (
              <Grid item>
                <Divider />
              </Grid>
            )}

            <Grid item container justifyContent='flex-end' alignItems='center'>
              <FormError name={fieldName} render={TextError} />
              <DSOChapterAddButton append={append} text={'Add video'} />
            </Grid>
          </Grid>
        )}
      </FieldsArray>
    </Grid>
  )
}
