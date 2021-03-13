import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, IconButton, TextField, Button } from '@material-ui/core'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { CountrySelect } from 'components/form/CountrySelect'
import { TypedField } from 'components/form/TypedField'
import { TaxResidency } from 'types/identity'
import { TinUnavailableFields } from 'app/pages/_identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import { VSpacer } from 'components/VSpacer'

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
  defaultValue: TaxResidency
}

export const TaxResidencyField = ({
  index,
  field,
  append,
  remove,
  isLast,
  max,
  total,
  defaultValue
}: TaxResidencyFieldProps) => {
  const { control, watch } = useFormContext()
  const residencyList = watch('taxResidencies')
  const { taxIdAvailable } = residencyList[index] as TaxResidency

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
        taxIdAvailable: true
      })
    }
  }

  return (
    <Grid
      container
      direction='column'
      spacing={3}
      style={{
        borderTop: index !== 0 ? '1px solid lightgray' : 'none',
        paddingTop: index !== 0 ? 30 : 0
      }}
    >
      <Grid item>
        <Grid container spacing={3} alignItems='flex-start'>
          <Grid item xs={12} md={4}>
            <TypedField
              component={CountrySelect}
              name={['taxResidencies', index, 'countryOfResidence']}
              label='Country of Tax Residency'
              defaultValue={defaultValue?.countryOfResidence ?? null}
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
              defaultValue={defaultValue?.taxIdentificationNumber ?? null}
              name={['taxResidencies', index, 'taxIdentificationNumber']}
              variant='outlined'
              disabled={!taxIdAvailable}
              key={field.id}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={2}>
                <IconButton
                  onClick={handleRemove}
                  disabled={total === 1}
                  data-testid='remove-button'
                >
                  <DeleteOutlined />
                </IconButton>
              </Grid>
              {isLast && total < max ? (
                <Grid item xs={10}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={handleAdd}
                  >
                    Add more
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VSpacer size={'small'} />
        <TinUnavailableFields index={index} defaultValue={defaultValue} />
      </Grid>
    </Grid>
  )
}
