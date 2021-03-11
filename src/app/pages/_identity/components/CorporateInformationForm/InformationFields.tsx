import React, { useEffect } from 'react'
import { TypedField } from 'components/form/TypedField'
import { Dropzone } from 'components/dataroom/Dropzone'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { LegalEntityStatusSelect } from 'components/form/LegalEntityStatusSelect'
import { CountrySelect } from 'components/form/CountrySelect'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'

export const InformationFields = () => {
  const { control, watch, reset, getValues } = useFormContext()
  const { isTablet } = useAppBreakpoints()
  const legalEntityStatus = watch('legalEntityStatus')

  useEffect(() => {
    reset({ ...getValues(), otherLegalEntityStatus: '' })
  }, [legalEntityStatus, reset, getValues])

  return (
    <>
      <FormSectionHeader title='Corporate Information' />
      <Grid container spacing={3}>
        <Grid item xs={12} md='auto' style={{ flexGrow: 0 }}>
          {/* @ts-ignore */}
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
            name='companyLogo'
          />
        </Grid>
        <Grid item xs={12} md='auto' style={{ flexGrow: 1 }}>
          <Grid container spacing={3} style={{ marginTop: isTablet ? 0 : 37 }}>
            <Grid item xs={12} md={4}>
              <Grid container spacing={3} direction='column'>
                <Grid item>
                  <TypedField
                    component={TextField}
                    control={control}
                    variant='outlined'
                    name='companyLegalName'
                    label='Corporate Name'
                  />
                </Grid>
                <Grid item>
                  <TypedField
                    component={LegalEntityStatusSelect}
                    control={control}
                    variant='outlined'
                    name='legalEntityStatus'
                    label='Legal Entity Status'
                  />
                </Grid>
                <Grid item>
                  <TypedField
                    component={CountrySelect}
                    control={control}
                    variant='outlined'
                    name='countryOfFormation'
                    label='Country of Incorporation'
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={3} direction='column'>
                <Grid item>
                  <TypedField
                    component={TextField}
                    control={control}
                    variant='outlined'
                    name='registrationNumber'
                    label='Registration Number/UEN'
                  />
                </Grid>
                <Grid item>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
