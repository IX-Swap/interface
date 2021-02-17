import { Grid, FormControlLabel, Radio, Box } from '@material-ui/core'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface ReasonFieldsProps {
  disabled: boolean
}

export const ReasonFields = ({ disabled }: ReasonFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Box ml={3}>
      {/* @ts-ignore */}
      <TypedField
        customRenderer
        component={RadioGroup}
        name='reasonUnavailable'
        label=''
        control={control}
      >
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <FormControlLabel
              label={
                <>
                  <Box fontWeight='bold' component='span'>
                    Reason A
                  </Box>{' '}
                  - The country/jurisdiction where the Account Holder is
                  resident does not issue TINs to its residents
                </>
              }
              value='A'
              control={<Radio />}
              disabled={disabled}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label={
                <>
                  <Box fontWeight='bold' component='span'>
                    Reason B
                  </Box>{' '}
                  - The Account Holder is otherwise unable to obtain a TIN or
                  equivalent number (Please explain why your are unable to
                  obtain a TIN in the below table if you have selected this
                  reason)
                </>
              }
              value='B'
              control={<Radio />}
              disabled={disabled}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label={
                <>
                  <Box fontWeight='bold' component='span'>
                    Reason C
                  </Box>{' '}
                  - No TIN is required. (Note. Only select this reason if the
                  domestic law of the relevant jurisdication does not require
                  the collection of the TIN issued by such jurisdication)
                </>
              }
              value='C'
              control={<Radio />}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </TypedField>
    </Box>
  )
}
