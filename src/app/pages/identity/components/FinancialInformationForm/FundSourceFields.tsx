import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { FieldsArray } from 'components/form/FieldsArray'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { YesOrNo } from 'components/form/YesOrNo'
import { FundSourceItem } from 'app/pages/identity/components/FinancialInformationForm/FundSourceItem'
import { FundSource } from 'app/pages/identity/types/forms'

export const FundSourceFields = () => {
  const { control, getValues } = useFormContext()

  const fundSources: FundSource[] = getValues().sourceOfFund
  const fundSourceSum =
    fundSources !== null && fundSources !== undefined
      ? fundSources.reduce((acc, curr) => acc + curr.value, 0)
      : 0

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Grid container direction='column' spacing={2}>
          <FieldsArray name='sourceOfFund' control={control}>
            {({ fields }) => (
              <>
                {fields.map((field, index) => (
                  <Grid item xs={12} key={field.name}>
                    <FundSourceItem
                      field={field}
                      index={index}
                      fundSourceSum={fundSourceSum}
                    />
                  </Grid>
                ))}
              </>
            )}
          </FieldsArray>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant='subtitle1'>
          Will these source(s) be used to fund majority of your account?
        </Typography>
        <Box display='inline-block' mt={2}>
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            component={YesOrNo}
            control={control}
            label='Will these source(s) be used to fund majority of your account?'
            name='fundMajority'
          />
        </Box>
      </Grid>
    </Grid>
  )
}
