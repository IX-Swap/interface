import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, IconButton, TextField } from '@material-ui/core'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { CountrySelect } from 'components/form/CountrySelect'
import { TypedField } from 'components/form/TypedField'
import { TaxResidency } from 'types/identity'
import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'

export interface TaxResidencyFieldProps {
  field: Partial<TaxResidency & { id: string }>
  append: (
    value: Partial<any> | Array<Partial<any>>,
    shouldFocus?: boolean | undefined
  ) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  index: number
  max: number
  total: number
}

export const TaxResidencyField = ({
  index,
  field,
  append,
  remove,
  isLast,
  max,
  total
}: TaxResidencyFieldProps) => {
  const { control, watch } = useFormContext()
  const residencyList = watch('taxResidencies')
  const { taxIdAvailable } = residencyList[index]

  const getSelectedCountries = () => {
    if (residencyList === undefined || residencyList.length < 1) {
      return []
    }

    const filteredList = residencyList.filter(
      (_: any, i: number) => i !== index
    )

    return filteredList.map(
      (residencyItem: TaxResidency) => residencyItem.countryOfResidence
    )
  }

  const handleRemove = () => {
    if (total !== 1) {
      remove(index)
    }
  }

  const handleAdd = () => {
    if (total < max) {
      append({
        countryOfResidence: '',
        taxIdentificationNumber: '',
        taxIdAvailable: false
      })
    }
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} md={4}>
            <TypedField
              component={CountrySelect}
              name={['taxResidencies', index, 'countryOfResidence']}
              label='Country of Tax Residency'
              defaultValue={field.countryOfResidence}
              variant='outlined'
              control={control}
              key={field.id}
              filter={getSelectedCountries()}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TypedField
              fullWidth
              control={control}
              component={TextField}
              label='Tax Identification Number'
              defaultValue={field.taxIdentificationNumber}
              name={['taxResidencies', index, 'taxIdentificationNumber']}
              variant='outlined'
              disabled={!taxIdAvailable}
              key={field.id}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <IconButton
                  onClick={handleRemove}
                  disabled={total === 1}
                  data-testid='remove-button'
                >
                  <DeleteOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                {isLast && total < max ? (
                  <ButtonTransparent onClick={handleAdd}>
                    Add more
                  </ButtonTransparent>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TinUnavailableFields index={index} />
      </Grid>
    </Grid>
  )
}
