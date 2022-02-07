import React from 'react'
import { useFormContext } from 'react-hook-form'
import { booleanValueExtractor } from 'helpers/forms'
import { Grid, Link, Typography } from '@mui/material'
import { Checkbox } from 'components/form/Checkbox'
import { TypedField } from 'components/form/TypedField'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { IndividualAgreementsFormValues } from 'app/pages/identity/types/forms'

export interface AgreementsAndDisclosuresFieldsProps {
  isCorporateIssuerForm?: boolean
}

export const AgreementsAndDisclosuresFields = ({
  isCorporateIssuerForm = false
}: AgreementsAndDisclosuresFieldsProps): JSX.Element => {
  const { control } = useFormContext<IndividualAgreementsFormValues>()

  const renderAgreementAndDisclosureLink = (label: string, href: string) => {
    return (
      <Link href={href} style={{ fontSize: 16 }}>
        {label}
      </Link>
    ) as any
  }

  return (
    <Grid container direction={'column'}>
      <FormSectionHeader title='Agreements and Disclosures' />
      <Typography variant='body1' style={{ marginBottom: 44 }}>
        Review accept the following
      </Typography>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={renderAgreementAndDisclosureLink(
            isCorporateIssuerForm ? 'Issuer Agreement' : 'Investor Agreement',
            '#'
          )}
          name={'investor'}
          data-testid='investor-agreement'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={renderAgreementAndDisclosureLink('Custody Agreement', '#')}
          name={'custody'}
          data-testid='custody-agreement'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={Checkbox}
          control={control}
          label={renderAgreementAndDisclosureLink('Disclosures', '#')}
          name={'disclosure'}
          data-testid='disclosures'
        />
      </Grid>
    </Grid>
  )
}
