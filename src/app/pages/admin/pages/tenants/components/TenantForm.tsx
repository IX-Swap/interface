import React from 'react'
import { Grid } from '@mui/material'
import { Form } from 'components/form/Form'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
// import { TypedField } from 'components/form/TypedField'
// import { FileUpload } from 'ui/FileUpload/FileUpload'
// // import { TextInput } from 'ui/TextInput/TextInput'
// import { useFormContext } from 'react-hook-form'
// import { documentValueExtractor } from 'app/components/DSO/utils'
// import { DataroomFileType } from 'config/dataroom'
// import { TenantFormValues, createDSOInformationSchema } from 'types/tenants'

import { ListingForm } from 'app/pages/issuance/components/ListingForm/ListingForm'

export const TenantForm = () => {
  const { isTablet } = useAppBreakpoints()
  //   const { control } = useFormContext<TenantFormValues>()
  //   console.log(control)

  return (
    <Form
      data-testid='listing-form'
      defaultValues={{
        logoLight: 'undefined',
        logoDark: 'undefined',
        backgroundImage: 'undefined',
        companyName: 'undefined',
        tenantCode: 'undefined',
        url: 'undefined',
        email: 'undefined',
        description: 'undefined'
      }}
      //   validationSchema={createDSOInformationSchema}
      // onSubmit={submitHandler}
      //   allowInvalid
      //   id={`tenantForm`}
      //   errors={stepValues[index]?.errors}
    >
      <Grid container direction={isTablet ? 'column-reverse' : 'row'}>
        <Grid item xs={9}>
          <FieldContainer>
            <ListingForm />
            {/* <TypedField
              customRenderer
              component={FileUpload}
              name='logoLight'
              label='Upload Photo'
              placeHolder='Upload File'
              control={control}
              valueExtractor={documentValueExtractor}
              accept={DataroomFileType.image}
              documentInfo={{
                type: 'Logo Light'
              }}
              isOptional
              optionalText=' '
              helperText='Upload Photo'
            /> */}
          </FieldContainer>
        </Grid>
      </Grid>
    </Form>
  )
}
