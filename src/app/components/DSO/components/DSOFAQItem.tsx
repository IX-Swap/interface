import React from 'react'
import { Box, Grid, TextField } from '@material-ui/core'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { DsoFAQItem, DSOFormValues } from 'types/dso'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'

export interface DSOFAQItemProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoFAQItem
}

export const DSOFAQItem = (props: DSOFAQItemProps) => {
  const { defaultValue, fieldId, index, remove } = props
  const { control } = useFormContext<{ faq: DSOFormValues['faq'] }>()
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      direction='column'
    >
      <Grid item container xs={12} direction={'column'}>
        <Grid item xs={6}>
          <TypedField
            fullWidth
            key={fieldId}
            component={TextField}
            control={control}
            defaultValue={defaultValue?.question ?? ''}
            label={`FAQ #${index + 1}`}
            name={['faq', index, 'question']}
            variant='outlined'
            helperText={'Input FAQ Question'}
          />
        </Grid>
        <Grid item>
          <Box pt={3} />
        </Grid>
        <Grid item xs={12}>
          <TypedField
            fullWidth
            key={fieldId}
            control={control}
            component={TextField}
            defaultValue={defaultValue?.answer ?? ''}
            label='Input answer here'
            name={['faq', index, 'answer']}
            variant='outlined'
            multiline
            rows={3}
          />
        </Grid>
        <VSpacer size='small' />
      </Grid>
      <Grid item container xs={12} direction='column'>
        <Grid
          item
          container
          justify='flex-end'
          alignItems='flex-end'
          direction='column'
        >
          <Grid item>
            <VSpacer size='small' />
            {index >= 3 && (
              <DSOTeamRemoveButton remove={remove} index={index} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
