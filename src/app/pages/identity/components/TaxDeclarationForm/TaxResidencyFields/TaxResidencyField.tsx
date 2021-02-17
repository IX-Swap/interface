import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, IconButton, TextField } from '@material-ui/core'
import { ButtonTransparent } from 'app/components/ButtonTransparent'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { CountrySelect } from 'components/form/CountrySelect'
import { TypedField } from 'components/form/TypedField'
import { TaxResidency } from 'types/identity'

export interface TaxResidencyFieldProps {
  field: Partial<TaxResidency & { id: string }>
  append: (
    value: Partial<any> | Array<Partial<any>>,
    shouldFocus?: boolean | undefined
  ) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  index: number
  disabled: boolean
  max: number
  total: number
}

export const TaxResidencyField = ({
  index,
  field,
  append,
  remove,
  isLast,
  disabled,
  max,
  total
}: TaxResidencyFieldProps) => {
  const { control, watch } = useFormContext()
  const residencyList = watch('taxResidencies')

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
        taxIdAvailable: false,
        taxIdentificationNumber: ''
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
              disabled={disabled}
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
              disabled={disabled}
              key={field.id}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item>
                <IconButton
                  onClick={handleRemove}
                  disabled={disabled || total === 1}
                  data-testid='remove-button'
                >
                  <DeleteOutlined />
                </IconButton>
              </Grid>
              <Grid item>
                {isLast && total < max ? (
                  <ButtonTransparent disabled={disabled} onClick={handleAdd}>
                    Add more
                  </ButtonTransparent>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
