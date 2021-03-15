import React from 'react'
import { useFormContext } from 'react-hook-form'
import { booleanValueExtractor } from 'helpers/forms'
import { AgreementsAndDisclosures } from 'types/identity'
import { Grid, Link, Typography } from '@material-ui/core'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export const AgreementsAndDisclosuresFields = (): JSX.Element => {
  const { control } = useFormContext<AgreementsAndDisclosures>()

  return (
    <Grid container direction={'column'}>
      <FormSectionHeader title='Agreements and Disclosures' />
      <Typography variant='body1' style={{ marginBottom: 44 }}>
        Review accept the following
      </Typography>
      <Grid item xs={12} sm={6} md={4}>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={(<Link href={'#'}>Investor Agreement</Link>) as any}
          name={['declarations', 'agreements', 'investor']}
          data-testid='investor-agreement'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={(<Link href={'#'}>Custody Agreement</Link>) as any}
          name={['declarations', 'agreements', 'custody']}
          data-testid='custody-agreement'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {/* @ts-ignore */}
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={(<Link href={'#'}>Disclosures</Link>) as any}
          name={['declarations', 'agreements', 'disclosures']}
          data-testid='disclosures'
        />
      </Grid>
    </Grid>
  )
}
