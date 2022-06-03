import { Button, Grid, IconButton, useMediaQuery } from '@mui/material'
import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import { TaxResidency } from 'app/pages/identity/types/forms'
import { CountrySelect } from 'components/form/CountrySelect'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
import useStyles from './TaxResidencyField.style'
import { Icon } from 'ui/Icons/Icon'
import { useTheme } from '@mui/styles'
import { Divider } from 'ui/Divider'
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const classes = useStyles()

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

  const renderRemoveButton = () => {
    return (
      <Grid item>
        <IconButton
          className={classes.deleteButton}
          onClick={handleRemove}
          disabled={total === 1}
          data-testid='remove-button'
          size='large'
        >
          <Icon name={'trash'} />
        </IconButton>
      </Grid>
    )
  }

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item>
        <Grid container alignItems='flex-end'>
          <Grid item className={classes.block}>
            <TypedField
              component={CountrySelect}
              name={['taxResidencies', index, 'countryOfResidence']}
              label='Country of Tax Declaration'
              defaultValue={defaultValue?.countryOfResidence ?? ''}
              variant='outlined'
              control={control}
              key={field.id}
              filter={getSelectedCountries()}
            />
          </Grid>

          <Grid item className={classes.block}>
            <TypedField
              fullWidth
              hideIcon
              control={control}
              component={TextInput}
              label='Tax Identification Number'
              placeholder={'Tax Identification Number'}
              defaultValue={defaultValue?.taxIdentificationNumber ?? ''}
              name={['taxResidencies', index, 'taxIdentificationNumber']}
              variant='outlined'
              disabled={!taxIdAvailable}
              key={field.id}
            />
          </Grid>
          {!matches && renderRemoveButton()}
        </Grid>
      </Grid>
      <Grid item>
        <TinUnavailableFields index={index} defaultValue={defaultValue} />
      </Grid>
      {matches && renderRemoveButton()}
      <Grid item>
        <Divider />
      </Grid>
      <Grid
        item
        container
        justifyContent={'flex-end'}
        className={classes.buttonBlock}
      >
        {isLast && total < max ? (
          <Grid item>
            <Button variant='outlined' color='primary' onClick={handleAdd}>
              <Icon name={'plus'} size={20} className={classes.icon} />
              Add Country
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  )
}
