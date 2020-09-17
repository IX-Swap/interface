import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
import { toPercentage } from 'v2/helpers/numbers'
interface DSOTermsProps {
  editMode?: boolean
  dso: DigitalSecurityOffering
}

const OfferingTermComponent = ({
  name,
  required = false
}: {
  name: string
  required: boolean
}) => {
  const { errors, control, register } = useFormContext()

  switch (name) {
    case 'distributionFrequency':
      return (
        <Controller
          as={
            <Select
              fullWidth
              error={errors[name] !== undefined}
              inputRef={register}
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
      return (
        <TextField
          name={name ?? ''}
          required={required}
          inputRef={register}
          error={errors[name]}
        />
      )
  }
}

const OfferingTermItem = ({
  name,
  label,
  value,
  editMode = false,
  required = false
}: {
  name?: string
  editMode?: boolean
  label: string
  value: string
  required?: boolean
}) => {
  return (
    <Grid container item xs={4} spacing={2}>
      <Grid item xs={6}>
        <Typography>{label}:</Typography>
      </Grid>
      <Grid item xs={6}>
        {!editMode && <Typography>{value}</Typography>}
        {editMode && (
          <OfferingTermComponent name={name ?? ''} required={required} />
        )}
      </Grid>
    </Grid>
  )
}

const isNa = (val: any) => (val ?? '').toString().trim() === ''

export const DSOTerms = ({ editMode = false, dso }: DSOTermsProps) => {
  return (
    <Grid container spacing={2}>
      <OfferingTermItem
        name='investmentPeriod'
        label='Investment Period'
        editMode={editMode}
        // TODO:  Check if what the number denotes (eg months, yrs?)
        value={
          Number.isNaN(dso.investmentPeriod)
            ? 'n/a'
            : `${dso.investmentPeriod ?? ''}`
        }
      />
      <OfferingTermItem
        name='dividendYeild'
        label='Divident Yield'
        editMode={editMode}
        value={
          isNa(dso.dividendYield) ? 'n/a' : toPercentage(dso.dividendYield ?? 0)
        }
      />
      <OfferingTermItem
        name='grossIRR'
        label='Gross IRR'
        editMode={editMode}
        value={isNa(dso.grossIRR) ? 'n/a' : toPercentage(dso.grossIRR ?? 0)}
      />

      <OfferingTermItem
        name='investmentStructure'
        label='Investment Structure'
        editMode={editMode}
        value={isNa(dso.investmentStructure) ? 'n/a' : dso.investmentStructure}
      />
      <OfferingTermItem
        name='equityMultiple'
        label='Equity Multiple'
        editMode={editMode}
        value={isNa(dso.equityMultiple) ? 'n/a' : dso.equityMultiple}
      />
      <OfferingTermItem
        name='distributionFrequency'
        required
        label='Distribution Frequency'
        editMode={editMode}
        value={
          isNa(dso.distributionFrequency) ? 'n/a' : dso.distributionFrequency
        }
      />
      <OfferingTermItem
        name='interestRate'
        label='Interest Rate'
        editMode={editMode}
        value={
          isNa(dso.interestRate) ? 'n/a' : toPercentage(dso.interestRate ?? 0)
        }
      />
      <OfferingTermItem
        name='leverage'
        label='Leverage'
        editMode={editMode}
        value={
          isNa(dso.leverage)
            ? 'n/a'
            : toPercentage(parseFloat(dso.leverage ?? '0'))
        }
      />
    </Grid>
  )
}
