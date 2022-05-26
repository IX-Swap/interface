import { ReactComponent as DeleteOutlined } from 'assets/icons/delete.svg'
import { ReactComponent as DeleteDisabledOutlined } from 'assets/icons/delete-disabled.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'
import { Button, Grid, Typography, useTheme, Box } from '@mui/material'
import { TinUnavailableFields } from 'app/pages/identity/components/TaxDeclarationForm/TinUnavailableFields/TinUnavailableFields'
import { TaxResidency } from 'app/pages/identity/types/forms'
import { CountrySelect } from 'components/form/CountrySelect'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
import { useStyles } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidency.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

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
  const country = residencyList[index].countryOfResidence

  const styles = useStyles()
  const theme = useTheme()
  const { isMobile, isTablet } = useAppBreakpoints()

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
        paddingTop: index !== 0 ? 30 : 0
      }}
    >
      <Grid item>
        <Grid container spacing={2} alignItems='flex-start'>
          <Grid item xs={12} md={5.5}>
            <TypedField
              component={CountrySelect}
              name={['taxResidencies', index, 'countryOfResidence']}
              label='Country of Tax Residency'
              defaultValue={defaultValue?.countryOfResidence ?? ''}
              variant='outlined'
              control={control}
              key={field.id}
              filter={getSelectedCountries()}
            />
          </Grid>

          <Grid item xs={12} md={5.5}>
            <TypedField
              fullWidth
              control={control}
              component={TextInput}
              label={
                country !== 'Singapore'
                  ? 'Tax Identification Number'
                  : 'NRIC/FIN'
              }
              defaultValue={defaultValue?.taxIdentificationNumber ?? ''}
              name={['taxResidencies', index, 'taxIdentificationNumber']}
              variant='outlined'
              disabled={!taxIdAvailable}
              key={field.id}
              placeholder={
                country !== 'Singapore'
                  ? 'Tax Identification Number'
                  : 'NRIC/FIN'
              }
            />
          </Grid>

          <Grid item xs={12} md={1}>
            <Box className={styles.container} onClick={handleRemove}>
              {total === 1 ? <DeleteDisabledOutlined /> : <DeleteOutlined />}
              {(isMobile || isTablet) && (
                <Typography color={theme.palette.text.secondary}>
                  Remove Country
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <VSpacer size={'small'} />
        <TinUnavailableFields index={index} defaultValue={defaultValue} />
        <VSpacer size='small' />
        <Box className={styles.divider} />
      </Grid>

      {isLast && total < max ? (
        <Grid item xs={10} display='flex' justifyContent='right'>
          <Button
            size='large'
            variant='outlined'
            color='primary'
            onClick={handleAdd}
            fullWidth={isMobile || isTablet}
          >
            <PlusIcon height='12' width='12' /> &nbsp; Add Country
          </Button>
        </Grid>
      ) : null}
    </Grid>
  )
}
