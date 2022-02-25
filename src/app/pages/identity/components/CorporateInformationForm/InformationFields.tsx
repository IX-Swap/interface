import React, { useEffect } from 'react'
import { TypedField } from 'components/form/TypedField'
import { Dropzone } from 'components/dataroom/Dropzone'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { LegalEntityStatusSelect } from 'components/form/LegalEntityStatusSelect'
import { CountrySelect } from 'components/form/CountrySelect'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { privateClassNames } from 'helpers/classnames'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { IdentityTypeSelect } from 'components/form/IdentityTypeSelect'
import { booleanValueExtractor } from 'helpers/forms'
import { Checkbox } from 'components/form/Checkbox'

export const InformationFields = () => {
  const { control, watch, clearErrors } = useFormContext()
  const legalEntityStatus = watch('legalEntityStatus')
  const { isMobile, isTablet } = useAppBreakpoints()
  const isIncorporated: boolean = watch('isIncorporated', true)

  useEffect(() => {
    if (legalEntityStatus !== 'others') {
      control.setValue('otherLegalEntityStatus', '')
      clearErrors('otherLegalEntityStatus')
    }
  }, [legalEntityStatus]) // eslint-disable-line

  return (
    <>
      <FormSectionHeader title='Corporate Information' />
      <Grid container direction={'row'} alignItems={'flex-start'}>
        <Grid item style={{ paddingRight: 24 }}>
          <TypedField
            customRenderer
            control={control}
            component={Dropzone}
            label='Upload your logo (Optional)'
            valueExtractor={documentValueExtractor}
            documentInfo={{
              title: 'Logo',
              type: 'logo'
            }}
            name='logo'
          />
        </Grid>
        <Grid
          container
          spacing={3}
          className={privateClassNames()}
          md={8}
          sm={12}
          xs={12}
          style={{ paddingTop: !isMobile && !isTablet ? 48 : 24 }}
        >
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              fullWidth
              component={TextField}
              control={control}
              variant='outlined'
              name='companyLegalName'
              label='Corporate Name'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} />
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              component={CountrySelect}
              control={control}
              variant='outlined'
              name='countryOfFormation'
              label='Country of Incorporation'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              fullWidth
              component={TextField}
              control={control}
              variant='outlined'
              name='registrationNumber'
              label='Registration Number/UEN'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              component={LegalEntityStatusSelect}
              control={control}
              variant='outlined'
              name='legalEntityStatus'
              label='Legal Entity Status'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              customRenderer
              fullWidth
              component={TextField}
              control={control}
              variant='outlined'
              name='otherLegalEntityStatus'
              label='Others (Please specify)'
              disabled={legalEntityStatus !== 'others'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              component={IdentityTypeSelect}
              control={control}
              variant='outlined'
              name='identityStatus'
              label='Identity Status'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} />
          <Grid item xs={12} sm={6} md={6}>
            <TypedField
              customRenderer
              component={Checkbox}
              defaultValue={isIncorporated ?? true}
              control={control}
              valueExtractor={booleanValueExtractor}
              name='isIncorporated'
              label='Is incorporated?'
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
