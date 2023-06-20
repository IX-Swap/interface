import { Grid, IconButton, InputAdornment, Icon } from '@mui/material'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { integerValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { TextInput } from 'ui/TextInput/TextInput'
import useStyles from '../DSODecimalButton.styles'
import { NumericInput } from 'components/form/NumericInput'
import { numberFormat } from 'config/numberFormat'
import _ from 'lodash'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface BlockchainInformationProps {
  isNew: boolean
  status?: any
}

export interface DSOCounterProps {
  incrementAmt?: number
  decrementAmt?: number
  val?: number
  name: string
  minVal?: number | null
  maxVal?: number | null
  setterFunction: (name: string, val: number) => void
}
export type DSOIncrementProps = Omit<DSOCounterProps, 'decrementAmt' | 'minVal'>
export type DSODecrementProps = Omit<DSOCounterProps, 'increment' | 'maxVal'>

export const decrement = (props: DSODecrementProps) => {
  const {
    decrementAmt = 1,
    val = 0,
    name,
    minVal = null,
    setterFunction
  } = props

  if (minVal !== null) {
    setterFunction(name, val > minVal ? val - decrementAmt : val)
  } else {
    setterFunction(name, val - decrementAmt)
  }
}

export const increment = (props: DSOIncrementProps) => {
  const {
    incrementAmt = 1,
    val = 0,
    name,
    maxVal = null,
    setterFunction
  } = props

  if (maxVal !== null) {
    setterFunction(name, val >= maxVal ? val : val + incrementAmt)
  } else {
    setterFunction(name, val - incrementAmt)
  }
}

export const BlockchainInformation = (props: BlockchainInformationProps) => {
  const { isNew, status } = props
  const { control } = useFormContext<DSOFormValues>()
  const classes = useStyles()

  return (
    <Grid item>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormSectionHeader
            hasBorderBottom={false}
            title='Blockchain Information'
            variant='h5'
          />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Token Name'
                name='tokenName'
                disabled={status === 'Approved'}
                control={control}
                helperText='Name of the Token Offering'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Token Symbol'
                name='tokenSymbol'
                disabled={status === 'Approved'}
                control={control}
                helperText='Token Symbol'
                variant='outlined'
                isOptional
                optionalText='(2-6 alphanumeric characters)'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={NetworkSelect}
                label='Blockchain Network'
                name='network'
                disabled={!isNew}
                control={control}
                placeHolder='Select Blockchain Network'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                control={control}
                component={NumericInput}
                valueExtractor={integerValueExtractor}
                numberFormat={{ ...numberFormat }}
                isAllowed={(values: any) => {
                  const { value } = values
                  return value <= 18
                }}
                label='Decimal Places'
                name='decimalPlaces'
                variant='outlined'
                isOptional
                optionalText='(0-18)'
                defaultValue={18}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position='start'
                      style={{ height: '100%', marginLeft: '-0.5rem' }}
                    >
                      <IconButton
                        onClick={() =>
                          decrement({
                            val: control.getValues('decimalPlaces'),
                            name: 'decimalPlaces',
                            minVal: 0,
                            setterFunction: control.setValue
                          })
                        }
                        className={classes.button}
                        disabled={
                          !_.isEmpty(control) &&
                          typeof control.getValues === 'function'
                            ? control.getValues('decimalPlaces') === 0
                            : false
                        }
                      >
                        <Icon>
                          <RemoveOutlinedIcon color='disabled' />
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end' style={{ height: '100%' }}>
                      <IconButton
                        onClick={() =>
                          increment({
                            val: control.getValues('decimalPlaces'),
                            name: 'decimalPlaces',
                            maxVal: 18,
                            setterFunction: control.setValue
                          })
                        }
                        className={classes.button}
                        disabled={
                          !_.isEmpty(control) &&
                          typeof control.getValues === 'function'
                            ? control.getValues('decimalPlaces') === 18
                            : false
                        }
                      >
                        <Icon>
                          <AddOutlinedIcon color='disabled' />
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: {
                      textAlign: 'center'
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
      </Grid>
    </Grid>
  )
}
