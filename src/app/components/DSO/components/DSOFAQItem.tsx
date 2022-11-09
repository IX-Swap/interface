import { Box, Grid, Typography } from '@mui/material'
import { DSOTeamRemoveButton } from 'app/components/DSO/components/DSOTeamRemoveButton'
import { TypedField } from 'components/form/TypedField'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DsoFAQItem, DSOFormValues } from 'types/dso'
import { TextInput } from 'ui/TextInput/TextInput'
import { Divider } from 'ui/Divider'
export interface DSOFAQItemProps {
  fieldId: string
  index: number
  remove: (field: any) => void
  defaultValue: DsoFAQItem
}

export const getMarginTopValue = (index: number, isTablet: boolean) => {
  if (isTablet) return 4
  return index === 0 ? 5 : 8
}

export const DSOFAQItem = (props: DSOFAQItemProps) => {
  const { defaultValue, fieldId, index, remove } = props
  const { control } = useFormContext<{ faqs: DSOFormValues['faqs'] }>()
  const { isTablet } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      alignItems='flex-start'
      wrap={isTablet ? 'wrap' : 'nowrap'}
      direction='column'
    >
      <Grid
        item
        sx={{
          marginBottom: 1.5,
          marginTop: getMarginTopValue(index, isTablet)
        }}
      >
        <Typography>FAQ {index + 1}</Typography>
      </Grid>
      <Grid item container xs={12} direction={'column'} spacing={5}>
        <Grid item xs={12} container>
          <Box display={'flex'} width={'100%'}>
            <TypedField
              fullWidth
              key={fieldId}
              component={TextInput}
              placeholder={'Title'}
              helperText={'Title'}
              control={control}
              defaultValue={defaultValue?.question ?? ''}
              name={['faqs', index, 'question']}
              variant='outlined'
            />
            {!isTablet && (
              <DSOTeamRemoveButton
                sx={{ width: 50, height: 50, marginLeft: 2 }}
                remove={remove}
                index={index}
                disabled={false}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TypedField
            fullWidth
            key={fieldId}
            control={control}
            placeholder={'Answer'}
            helperText={'Answer'}
            component={TextInput}
            defaultValue={defaultValue?.answer ?? ''}
            name={['faqs', index, 'answer']}
            variant='outlined'
            multiline
            rows={3}
          />
        </Grid>
        {isTablet && (
          <Grid item xs={12}>
            <DSOTeamRemoveButton
              disabled={index === 0}
              sx={{ width: '100%', height: 50 }}
              remove={remove}
              index={index}
            />
          </Grid>
        )}

        {isTablet && (
          <Grid item xs={12}>
            <Divider />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
