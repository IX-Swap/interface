import {
  Grid,
  FormControlLabel,
  Radio,
  Box,
  TextField
} from '@material-ui/core'
import {
  IndividualTaxDeclarationFormValues,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface ReasonFieldsProps {
  index: number
  disabled: boolean
  defaultValue: TaxResidency
}

export const ReasonFields = ({
  disabled,
  index,
  defaultValue
}: ReasonFieldsProps) => {
  const {
    control,
    watch
  } = useFormContext<IndividualTaxDeclarationFormValues>()
  const reason = watch(`taxResidencies[${index}].reason`)
  const isBReason = reason === 'B'

  return (
    <Box ml={3}>
      <TypedField
        customRenderer
        component={RadioGroup}
        name={['taxResidencies', index, 'reason']}
        label=''
        control={control}
        defaultValue={defaultValue?.reason ?? ''}
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
            <Box
              ml={3}
              mt={1.5}
              maxWidth={535}
              display={isBReason ? 'block' : 'none'}
            >
              <TypedField
                component={TextField}
                variant='outlined'
                control={control}
                name={['taxResidencies', index, 'customReason']}
                label='Explain why the corporate does not have a TIN'
                defaultValue={defaultValue?.customReason ?? ''}
              />
            </Box>
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
