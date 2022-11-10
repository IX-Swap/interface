import { Grid, IconButton, InputAdornment } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { Checkbox } from 'components/form/Checkbox'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { VSpacer } from 'components/VSpacer'
import { DataroomFileType } from 'config/dataroom'
import {
  booleanValueExtractor,
  dateTimeValueExtractor,
  integerValueExtractor
} from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import { Icon } from 'ui/Icons/Icon'
import useStyles from './DSODecimalButton.styles'
import { NumericInput } from 'components/form/NumericInput'
import { numberFormat } from 'config/numberFormat'
import _ from 'lodash'

export interface DSOBaseFieldsProps {
  isNew: boolean
  isLive: boolean
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

export const DSOBaseFields = (props: DSOBaseFieldsProps) => {
  const { isNew, isLive } = props
  const { control, trigger } = useFormContext<DSOFormValues>()
  const classes = useStyles()

  return (
    <Grid item>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormSectionHeader
            hasBorderBottom={false}
            title='DSO Information'
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
              type: 'DSO Logo'
            }}
            isOptional
            helperText='Upload Photo'
          />
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12}>
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
                component={TextInput}
                label='Token Name'
                name='tokenName'
                disabled={isLive}
                control={control}
                helperText='Name of the token offering'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Symbol'
                name='tokenSymbol'
                disabled={isLive}
                control={control}
                helperText='Token symbol'
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
                label='Network'
                name='network'
                disabled={!isNew}
                control={control}
                placeHolder='Select blockchain network'
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
                        <Icon name='minus' />
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
                        <Icon name='plus' />
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
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Unique Identifier Code'
                name='uniqueIdentifierCode'
                disabled={isLive}
                control={control}
                helperText='ISIN or CUSIP number'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={CorporateSelect}
                label='Corporate'
                name='corporate'
                control={control}
                placeHolder='Select corporate'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Issuer Name'
                name='issuerName'
                control={control}
                helperText='Issuer'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                assetType='Currency'
                component={AssetSelect}
                label='Currency'
                name='currency'
                control={control}
                placeHolder='Preferred currency'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Launch Date'
                name='launchDate'
                control={control}
                disabled={isLive}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='mm/dd/yyyy'
                placeholder='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
                disablePast
                onAccept={async () => await trigger('completionDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Completion Date'
                name='completionDate'
                control={control}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
                disablePast
                onAccept={async () => await trigger('launchDate')}
              />
            </Grid>
            <VSpacer size='small' />
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12}>
              <TypedField
                customRenderer
                defaultValue={false}
                valueExtractor={booleanValueExtractor}
                component={Checkbox}
                control={control}
                label={'Is this a campaign?'}
                name='isCampaign'
                data-testid='is-campaign'
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
