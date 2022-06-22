import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, Box } from '@mui/material'
import {
  IndividualTaxDeclarationFormValues,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { TextInput } from 'ui/TextInput/TextInput'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import { ReasonItem } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields/ReasonItem/ReasonItem'
import useStyles from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/ReasonFields/ReasonFields/ReasonFields.style'

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
  const { control, watch } =
    useFormContext<IndividualTaxDeclarationFormValues>()
  const reason = watch(`taxResidencies[${index}].reason`)
  const isBReason = reason === 'B'
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <TypedField
        customRenderer
        component={RadioGroup}
        name={['taxResidencies', index, 'reason']}
        label=''
        control={control}
        defaultValue={defaultValue?.reason ?? ''}
      >
        <Grid container direction='column'>
          <Grid item>
            <ReasonItem
              isActive={reason === 'A'}
              disabled={disabled}
              value='A'
              label='Reason A - The country/jurisdiction where the Account Holder is resident does not issue TINs to its residents'
            />
          </Grid>
          <Grid item>
            <ReasonItem
              isActive={reason === 'B'}
              disabled={disabled}
              value='B'
              label='Reason B - The Account Holder is otherwise unable to obtain a TIN or equivalent number (Please explain why your are unable to obtain a TIN in the below table if you have selected this reason)'
            />
            <Box
              className={classes.reasonDescription}
              display={isBReason ? 'block' : 'none'}
            >
              <TypedField
                component={TextInput}
                variant='outlined'
                control={control}
                placeholder={'Describe the reason'}
                name={['taxResidencies', index, 'customReason']}
                label='Why the corporate does not have a TIN'
                defaultValue={defaultValue?.customReason ?? ''}
              />
            </Box>
          </Grid>
          <Grid item>
            <ReasonItem
              isActive={reason === 'C'}
              disabled={disabled}
              value='C'
              label='Reason c - No TIN is required. (Note. Only select this reason if the domestic law of the relevant jurisdiction does not require the collection of the TIN issued by such jurisdiction)'
            />
          </Grid>
        </Grid>
      </TypedField>
    </Box>
  )
}
