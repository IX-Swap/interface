import { Box, Grid, Typography } from '@mui/material'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
// import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { CountrySelect } from 'components/form/CountrySelect'
import { FundSourceSelect } from 'components/form/FundSourceSelect'
import { LegalEntityStatusSelect } from 'components/form/LegalEntityStatusSelect'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor, booleanValueExtractor } from 'helpers/forms'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { Checkbox } from 'components/form/Checkbox'
import { useTheme } from '@mui/material/styles'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface InformationFieldsProps {
  type?: CorporateType
}

export const InformationFields = ({
  type = 'corporate'
}: InformationFieldsProps) => {
  const { control, watch, clearErrors } = useFormContext()
  const legalEntityStatus = watch('legalEntityStatus')

  const isIssuer: boolean = watch('isIssuer', false)
  const isTenantOwner: boolean = watch('isTenantOwner', false)
  const theme = useTheme()

  useEffect(() => {
    if (legalEntityStatus !== 'others') {
      control.setValue('otherLegalEntityStatus', '')
      clearErrors('otherLegalEntityStatus')
    }
  }, [legalEntityStatus]) // eslint-disable-line

  const corporateInformationLabelMap = {
    corporate: 'Corporate Information',
    'Fund Manager': 'Fund Manager Company Information',
    'Fund Administrator': 'Fund Admin Company Information',
    'Portfolio Manager': 'Portfolio Manager Company Information',
    issuer: 'Corporate Information'
  } as any

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FormSectionHeader title={corporateInformationLabelMap[type]} />
        </Grid>
        {type === 'corporate' && (
          <>
            <Grid item xs={12} md={6}>
              <TypedField
                customRenderer
                component={Checkbox}
                defaultValue={isIssuer ?? false}
                control={control}
                valueExtractor={booleanValueExtractor}
                name='isIssuer'
                label={
                  <span>
                    I declare that I am an{' '}
                    <span style={{ color: theme.palette.primary.main }}>
                      Issuer
                    </span>
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                customRenderer
                component={Checkbox}
                defaultValue={isTenantOwner ?? false}
                control={control}
                valueExtractor={booleanValueExtractor}
                name='isTenantOwner'
                label={
                  <span>
                    I declare that I am a{' '}
                    <span style={{ color: theme.palette.primary.main }}>
                      Client
                    </span>
                  </span>
                }
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TypedField
            customRenderer
            control={control}
            component={FileUpload}
            label={
              <Typography>
                Upload logo{' '}
                <Box component={'span'} style={{ color: '#778194' }}>
                  (Optional)
                </Box>
              </Typography>
            }
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
            placeholder={
              type === 'corporate' ? 'Corporate Name' : 'Company Name'
            }
            defaultValue=''
            label={type === 'corporate' ? 'Corporate Name' : 'Company Name'}
            hideIcon
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
            defaultValue=''
            label='Registration Number/UEN'
            placeholder='Registration Number'
            hideIcon
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            component={LegalEntityStatusSelect}
            control={control}
            variant='outlined'
            name='legalEntityStatus'
            label='Legal Entity'
            placeholder='Legal Entity'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            fullWidth
            component={TextInput}
            control={control}
            variant='outlined'
            name='otherLegalEntityStatus'
            label='Others (Legal Entity)'
            disabled={legalEntityStatus !== 'others'}
            placeholder='Please specify'
            hideIcon
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            component={FundSourceSelect}
            control={control}
            variant='outlined'
            name='sourceOfFund'
            label='Source of Funds'
          />
        </Grid>
        <ValidateOnMount />
      </Grid>
    </>
  )
}
