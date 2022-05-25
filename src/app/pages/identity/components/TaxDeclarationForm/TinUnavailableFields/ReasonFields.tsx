import {
  Grid,
  FormControlLabel,
  Box,
  Typography,
  useTheme
} from '@mui/material'
import {
  IndividualTaxDeclarationFormValues,
  TaxResidency
} from 'app/pages/identity/types/forms'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { UIRadio } from 'components/UIRadio/UIRadio'
import { TextInput } from 'ui/TextInput/TextInput'

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
  const theme = useTheme()

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
                <Typography
                  fontWeight={reason === 'A' ? 500 : 400}
                  color={reason !== 'A' ? theme.palette.text.secondary : ''}
                  lineHeight='150%'
                  letterSpacing='-0.01em'
                >
                  <Box fontWeight='bold' component='span'>
                    Reason A
                  </Box>{' '}
                  - The country/jurisdiction where the Account Holder is
                  resident does not issue TINs to its residents
                </Typography>
              }
              value='A'
              control={<UIRadio />}
              disabled={disabled}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label={
                <Typography
                  fontWeight={reason === 'B' ? 500 : 400}
                  color={reason !== 'B' ? theme.palette.text.secondary : ''}
                  lineHeight='150%'
                  letterSpacing='-0.01em'
                >
                  <Box fontWeight='bold' component='span'>
                    Reason B
                  </Box>{' '}
                  - The Account Holder is otherwise unable to obtain a TIN or
                  equivalent number (Please explain why your are unable to
                  obtain a TIN in the below table if you have selected this
                  reason)
                </Typography>
              }
              value='B'
              control={<UIRadio />}
              disabled={disabled}
            />
            <Box
              ml={3}
              mt={1.5}
              maxWidth={535}
              display={isBReason ? 'block' : 'none'}
            >
              <TypedField
                component={TextInput}
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
                <Typography
                  fontWeight={reason === 'C' ? 500 : 400}
                  color={reason !== 'C' ? theme.palette.text.secondary : ''}
                  lineHeight='150%'
                  letterSpacing='-0.01em'
                >
                  <Box fontWeight='bold' component='span'>
                    Reason C
                  </Box>{' '}
                  - No TIN is required. (Note. Only select this reason if the
                  domestic law of the relevant jurisdiction does not require the
                  collection of the TIN issued by such jurisdiction)
                </Typography>
              }
              value='C'
              control={<UIRadio />}
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </TypedField>
    </Box>
  )
}
