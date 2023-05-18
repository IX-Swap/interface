import { Grid, IconButton, InputAdornment, Icon } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { documentValueExtractor } from 'app/components/DSO/utils'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
// import { Checkbox } from 'components/form/Checkbox'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { VSpacer } from 'components/VSpacer'
import { DataroomFileType } from 'config/dataroom'
import {
  //   booleanValueExtractor,
  dateTimeValueExtractor,
  integerValueExtractor
} from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { TextInput } from 'ui/TextInput/TextInput'
import useStyles from './DSODecimalButton.styles'
import { NumericInput } from 'components/form/NumericInput'
import { numberFormat } from 'config/numberFormat'
import _ from 'lodash'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import { STOClassificationSelect } from 'components/form/STOClassificationSelect'
import { ProductTypeSelect } from 'components/form/ProductTypeSelect'
export interface DSOBaseFieldsProps {
  isNew: boolean
  // isLive: boolean
  status: any
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
  const { isNew, status } = props
  const { control, trigger } = useFormContext<DSOFormValues>()
  const classes = useStyles()
  console.log(props)

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
                component={TextInput}
                label='Token Name'
                name='tokenName'
                disabled={status === 'Approved'}
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
                disabled={status === 'Approved'}
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
                disabled={status === 'Approved'}
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
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Release Date'
                name='releaseDate'
                control={control}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
                disablePast
                isOptional
                optionalText='(Securities will be locked for n days)'
                // onAccept={async () => await trigger('launchDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={TextInput}
                label='Unique Identifier Code'
                name='uniqueIdentifierCode'
                disabled={status === 'Approved'}
                control={control}
                helperText='ISIN or CUSIP number'
                variant='outlined'
                isOptional
              />
            </Grid>
            <VSpacer size='small' />
          </Grid>
          {/* Hiding this field for now as per https://investax.atlassian.net/browse/IPD1-549 */}
          {/* <Grid container spacing={3} mt={1}>
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

          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  )
}