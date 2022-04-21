import { Grid } from '@mui/material'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { CountrySelect } from 'components/form/CountrySelect'
import { FundSourceSelect } from 'components/form/FundSourceSelect'
import { LegalEntityStatusSelect } from 'components/form/LegalEntityStatusSelect'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'

export interface InformationFieldsProps {
  type?: CorporateType
}

export const InformationFields = ({
  type = 'investor'
}: InformationFieldsProps) => {
  const { control, watch, clearErrors } = useFormContext()
  const legalEntityStatus = watch('legalEntityStatus')

  useEffect(() => {
    if (legalEntityStatus !== 'others') {
      control.setValue('otherLegalEntityStatus', '')
      clearErrors('otherLegalEntityStatus')
    }
  }, [legalEntityStatus]) // eslint-disable-line

  const corporateInformationLabelMap = {
    investor: 'Corporate Information',
    'Fund Manager': 'Fund Manager Company Information',
    'Fund Administrator': 'Fund Admin Company Information',
    'Portfolio Manager': 'Portfolio Manager Company Information',
    issuer: 'Corporate Information'
  }

  return (
    <>
      <FormSectionHeader title={corporateInformationLabelMap[type]} />
      <Grid container direction='row' spacing={3}>
        <Grid item xs={12}>
          <TypedField
            customRenderer
            control={control}
            component={FileUpload}
            label='Upload logo (Optional)'
            placeHolder='Upload File'
            valueExtractor={plainValueExtractor}
            documentInfo={{
              title: 'Logo',
              type: 'logo'
            }}
            name='logo'
          />
        </Grid>
        <Grid item xs={12}>
          <TypedField
            fullWidth
            component={TextInput}
            control={control}
            variant='outlined'
            name='companyLegalName'
            label={type === 'investor' ? 'Corporate Name' : 'Company Name'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            component={CountrySelect}
            control={control}
            variant='outlined'
            name='countryOfFormation'
            label='Country of Incorporation'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            fullWidth
            component={TextInput}
            control={control}
            variant='outlined'
            name='registrationNumber'
            label='Registration Number/UEN'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            component={FundSourceSelect}
            control={control}
            variant='outlined'
            name='sourceOfFund'
            label='Source of funds'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            component={LegalEntityStatusSelect}
            control={control}
            variant='outlined'
            name='legalEntityStatus'
            label='Legal Entity'
          />
        </Grid>
      </Grid>
    </>
  )
}
