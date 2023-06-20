import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
// import { CorporateSelect } from 'components/form/CorporateSelect'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { DataroomFileType } from 'config/dataroom'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { STOClassificationSelect } from 'components/form/STOClassificationSelect'
import { ProductTypeSelect } from 'components/form/ProductTypeSelect'

export interface STOInformationProps {
  status?: string
}

export const STOInformation = (props: STOInformationProps) => {
  const { status } = props
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid item>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormSectionHeader
            hasBorderBottom={false}
            title='STO Information'
            variant='h5'
          />
        </Grid>
        <Grid item>
          <TypedField
            customRenderer
            component={FileUpload}
            name='logo'
            label='Upload Photo'
            placeHolder='Upload File'
            control={control}
            valueExtractor={documentValueExtractor}
            accept={DataroomFileType.image}
            documentInfo={{
              type: 'STO Logo'
            }}
            isOptional
            optionalText=' '
            helperText='Upload Photo'
          />

          <VSpacer size='small' />
          <FormError name='logo' render={TextError} />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={STOClassificationSelect}
                label='Classification'
                name='classification'
                control={control}
                placeHolder='Select classification'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                control={control}
                component={CapitalStructureSelect}
                label='Capital Structure'
                displayEmpty
                name='capitalStructure'
                helperText='Select capital structure'
                variant='outlined'
                inputProps={{ 'data-testid': 'capital-structure' }}
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>

        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={ProductTypeSelect}
                label='Product Type'
                name='productType'
                control={control}
                placeHolder='Select product type'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Unique Identifier Code - ISIN or CUSIP Number'
                name='uniqueIdentifierCode'
                disabled={status === 'Approved'}
                control={control}
                helperText='ISIN or CUSIP Number'
                variant='outlined'
                isOptional
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Issuer Name'
                name='issuerName'
                control={control}
                helperText='Issuer'
                variant='outlined'
              />
            </Grid> */}
            {/* <Grid item xs={12} md={6}>
              <TypedField
                component={CorporateSelect}
                label='Corporate'
                name='corporate'
                control={control}
                placeHolder='Select corporate'
                variant='outlined'
              />
            </Grid> */}
          </Grid>
          <VSpacer size='small' />
        </Grid>
      </Grid>
    </Grid>
  )
}
