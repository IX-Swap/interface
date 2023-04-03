import React from 'react'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { TypedField } from 'components/form/TypedField'
import { FileUpload } from 'ui/FileUpload/FileUpload'
// import { TextInput } from 'ui/TextInput/TextInput'
import { useFormContext } from 'react-hook-form'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { DataroomFileType } from 'config/dataroom'
import { TenantFormValues } from 'types/tenants'

export const TenantFormFields = () => {
  const { control } = useFormContext<TenantFormValues>()

  return (
    <FieldContainer>
      <TypedField
        customRenderer
        component={FileUpload}
        name='logoLight'
        label='Upload Logo (Light)'
        placeHolder='Upload Photo'
        control={control}
        valueExtractor={documentValueExtractor}
        accept={DataroomFileType.image}
        documentInfo={{
          type: 'Logo Light'
        }}
        isOptional
        optionalText=' '
        helperText='Upload Photo'
      />
      <TypedField
        customRenderer
        component={FileUpload}
        name='logoDark'
        label='Upload Logo (Dark)'
        placeHolder='Upload Photo'
        control={control}
        valueExtractor={documentValueExtractor}
        accept={DataroomFileType.image}
        documentInfo={{
          type: 'Logo Dark'
        }}
        isOptional
        optionalText=' '
        helperText='Upload Photo'
      />
    </FieldContainer>
  )
}
