import React from 'react'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { TypedField } from 'components/form/TypedField'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { useFormContext } from 'react-hook-form'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { TenantFormValues } from 'types/tenants'
import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { TenantStatusSelect } from 'components/form/TenantStatusSelect'
import { TenantThemeSelect } from 'components/form/TenantThemeSelect'
import { RichTextEditor } from 'components/form/RichTextEditor'
import { wysiwygValueExtractor } from 'helpers/forms'
import { DSOContainer as RteContainer } from 'app/components/DSO/components/DSOContainer'

export const TenantFormFields = ({
  tenant
}: {
  tenant: TenantFormValues | undefined
}) => {
  const { control, setValue } = useFormContext<TenantFormValues>()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FieldContainer>
          <Grid item>
            <Grid container direction='column' spacing={5}>
              <Grid item>
                <FormSectionHeader title='Client Space Information' />
              </Grid>
              <Grid item container spacing={{ xs: 5, md: 3 }}>
                <Grid item xs={12} md={6}>
                  <TypedField
                    component={TextInput}
                    label='Company Name'
                    helperText='Company Name'
                    name='companyName'
                    control={control}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TypedField
                    component={TextInput}
                    label='Client Space Code'
                    helperText='Client Space Code'
                    name='tenantCode'
                    control={control}
                    variant='outlined'
                    disabled={tenant !== undefined}
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={{ xs: 5, md: 3 }}>
                <Grid item xs={12} md={6}>
                  <TypedField
                    component={TextInput}
                    label='Company Email'
                    helperText='Company Email'
                    name='email'
                    control={control}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TypedField
                    component={TextInput}
                    label='Platform URL'
                    helperText='Platform URL'
                    name='url'
                    control={control}
                    variant='outlined'
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={{ xs: 5, md: 3 }}>
                <Grid item xs={12}>
                  <RteContainer
                    title='Company Description'
                    subtitle='A short description of the company helps investors know more about your company'
                    item
                    xs={12}
                    md={12}
                  >
                    <TypedField
                      component={RichTextEditor}
                      label='Description'
                      helperText='Description'
                      name='description'
                      control={control}
                      customRenderer
                      valueExtractor={wysiwygValueExtractor}
                    />
                  </RteContainer>
                </Grid>
              </Grid>
              {tenant !== undefined && (
                <Grid item container spacing={{ xs: 5, md: 3 }}>
                  <Grid item xs={12} md={6}>
                    <TypedField
                      component={TenantStatusSelect}
                      label='Status'
                      name='status'
                      control={control}
                      helperText='Select Client Status'
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>
      <Grid item>
        <FieldContainer>
          <Grid item>
            <Grid container direction='column' spacing={5}>
              <Grid item>
                <FormSectionHeader title='Platform Theme' />
              </Grid>

              <Grid item container spacing={{ xs: 5, md: 3 }}>
                <Grid item xs={12}>
                  <TypedField
                    component={TenantThemeSelect}
                    label='Theme'
                    name='theme'
                    control={control}
                    onButtonClick={(data: string) => setValue('theme', data)}
                    helperText='Select Client Theme'
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={{ xs: 5, md: 3 }}>
                <Grid item xs={12} md={4}>
                  <TypedField
                    customRenderer
                    component={FileUpload}
                    name='logoLight'
                    label='Logo (Light)'
                    helperText='Logo (Light)'
                    placeHolder='Upload Photo'
                    control={control}
                    valueExtractor={documentValueExtractor}
                    accept={DataroomFileType.image}
                    documentInfo={{
                      type: 'Logo Light',
                      feature: 'public-files'
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TypedField
                    customRenderer
                    component={FileUpload}
                    name='logoDark'
                    label='Logo (Dark)'
                    helperText='Logo (Dark)'
                    placeHolder='Upload Photo'
                    control={control}
                    valueExtractor={documentValueExtractor}
                    accept={DataroomFileType.image}
                    documentInfo={{
                      type: 'Logo Dark',
                      feature: 'public-files'
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TypedField
                    customRenderer
                    component={FileUpload}
                    name='backgroundImage'
                    label='Background Image'
                    helperText='Background Image'
                    placeHolder='Upload Photo'
                    control={control}
                    valueExtractor={documentValueExtractor}
                    accept={DataroomFileType.image}
                    documentInfo={{
                      type: 'Background Image',
                      feature: 'public-files'
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
