import React from 'react'
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core'
import type { Dso } from 'context/dso/types'
import { Controller, useFormContext } from 'react-hook-form'
import { toPercentage } from 'helpers/formatNumbers'
import SectionContainer from './SectionContianer'

const getOfferingTermComponent = (name, ref, control, error) => {
  switch (name) {
    case 'distributionFrequency':
      return (
        <Controller
          as={
            <Select
              error={error}
              inputRef={ref}
              name={name}
              inputProps={{
                name
              }}
            >
              <MenuItem value='Not Applicable'>Not Applicable</MenuItem>
              <MenuItem value='Monthly'>Monthly</MenuItem>
              <MenuItem value='Quarterly'>Quarterly</MenuItem>
              <MenuItem value='Semi-Annually'>Semi-Annually</MenuItem>
              <MenuItem value='Annually'>Annually</MenuItem>
            </Select>
          }
          name={name}
          rules={{ required: 'this field is required' }}
          control={control}
        />
      )
    default:
      return <TextField name={name || ''} inputRef={ref} error={error} />
  }
}

const OfferingTermItem = React.forwardRef(
  (
    {
      name,
      label,
      value,
      edit = false,
      unit = '',
      control
    }: {
      unit?: string,
      control?: any,
      name?: string,
      edit?: boolean,
      label: string,
      value: string,
    },
    ref: any
  ) => {
    const { errors } = useFormContext()
    return (
      <Grid container item xs={4} spacing={2}>
        <Grid item xs={6}>
          <Typography>{label}:</Typography>
        </Grid>
        <Grid item xs={6}>
          {!edit && (
            <Typography>
              {value}
              {unit ? ` ${unit}` : ''}
            </Typography>
          )}
          {edit && getOfferingTermComponent(name, ref, control, errors[name])}
        </Grid>
      </Grid>
    )
  }
)

OfferingTermItem.displayName = 'OfferingTermItem'

const isNa = (val: any) => (val || '').toString().trim() === ''

const OfferingTerms = (
  { edit, dso, control }: { edit: boolean, dso: Dso, control: any },
  ref: any
) => (
  <SectionContainer title='Offering Terms'>
    <Grid container spacing={2}>
      <OfferingTermItem
        name='investmentPeriod'
        ref={ref}
        unit='Months'
        label='Investment Period'
        edit={edit}
        // TODO:  Check if what the number denotes (eg months, yrs?)
        value={isNa(dso.investmentPeriod) ? 'n/a' : dso.investmentPeriod}
      />
      <OfferingTermItem
        name='dividendYeild'
        ref={ref}
        label='Dividend Yield'
        edit={edit}
        value={
          isNa(dso.dividendYeild) ? 'n/a' : toPercentage(dso.dividendYeild)
        }
      />
      <OfferingTermItem
        name='grossIRR'
        ref={ref}
        label='Gross IRR'
        edit={edit}
        value={isNa(dso.grossIRR) ? 'n/a' : toPercentage(dso.grossIRR)}
      />

      <OfferingTermItem
        name='investmentStructure'
        ref={ref}
        label='Investment Structure'
        edit={edit}
        value={isNa(dso.investmentStructure) ? 'n/a' : dso.investmentStructure}
      />
      <OfferingTermItem
        name='equityMultiple'
        ref={ref}
        label='Equity Multiple'
        edit={edit}
        value={isNa(dso.equityMultiple) ? 'n/a' : dso.equityMultiple}
      />
      <OfferingTermItem
        name='distributionFrequency'
        ref={ref({ required: true })}
        label='Distribution Frequency'
        edit={edit}
        control={control}
        value={
          isNa(dso.distributionFrequency) ? 'n/a' : dso.distributionFrequency
        }
      />
      <OfferingTermItem
        name='interestRate'
        ref={ref}
        label='Interest Rate'
        edit={edit}
        value={isNa(dso.interestRate) ? 'n/a' : toPercentage(dso.interestRate)}
      />
      <OfferingTermItem
        name='leverage'
        ref={ref}
        label='Leverage'
        edit={edit}
        value={isNa(dso.leverage) ? 'n/a' : toPercentage(dso.leverage)}
      />
    </Grid>
  </SectionContainer>
)
export default React.forwardRef(OfferingTerms)
