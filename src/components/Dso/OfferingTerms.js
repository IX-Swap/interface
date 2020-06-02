import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import type { Dso } from 'context/dso/types';
import { Controller } from 'react-hook-form';
import { toPercentage } from 'helpers/formatNumbers';
import SectionContainer from './SectionContianer';

const getOfferingTermComponent = (name, ref, control) => {
  switch (name) {
    case 'distributionFrequency':
      return (
        <Controller
          as={
            <Select
              inputRef={ref}
              name={name}
              inputProps={{
                name,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
              <MenuItem value="Semi-Annually">Semi-Annually</MenuItem>
              <MenuItem value="Annually">Annually</MenuItem>
            </Select>
          }
          name={name}
          control={control}
        />
      );
    default:
      return <TextField name={name || ''} inputRef={ref} />;
  }
};

const OfferingTermItem = React.forwardRef(
  (
    {
      name,
      label,
      value,
      edit = false,
      control,
    }: {
      control?: any,
      name?: string,
      edit?: boolean,
      label: string,
      value: string,
    },
    ref: any
  ) => (
    <Grid container item xs={4} spacing={2}>
      <Grid item xs={6}>
        <Typography>{label}:</Typography>
      </Grid>
      <Grid item xs={6}>
        {!edit && <Typography>{value}</Typography>}
        {edit && getOfferingTermComponent(name, ref, control)}
      </Grid>
    </Grid>
  )
);

OfferingTermItem.displayName = 'OfferingTermItem';

const OfferingTerms = (
  { edit, dso, control }: { edit: boolean, dso: Dso, control: any },
  ref: any
) => (
  <SectionContainer title="Offering Terms">
    <Grid container spacing={2}>
      <OfferingTermItem
        name="investmentPeriod"
        ref={ref}
        label="Investment Period"
        edit={edit}
        // TODO:  Check if what the number denotes (eg months, yrs?)
        value={(dso.investmentPeriod || '').toString()}
      />
      <OfferingTermItem
        name="dividendYeild"
        ref={ref}
        label="Divident Yield"
        edit={edit}
        value={toPercentage(dso.dividendYeild)}
      />
      <OfferingTermItem
        name="grossIRR"
        ref={ref}
        label="Gross IRR"
        edit={edit}
        value={toPercentage(dso.grossIRR)}
      />

      <OfferingTermItem
        name="investmentStructure"
        ref={ref}
        label="Investment Structure"
        edit={edit}
        value={dso.investmentStructure}
      />
      <OfferingTermItem
        name="equityMultiple"
        ref={ref}
        label="Equity Multiple"
        edit={edit}
        value={dso.equityMultiple}
      />
      <OfferingTermItem
        name="distributionFrequency"
        ref={ref}
        label="Distribution Frequency"
        edit={edit}
        control={control}
        value={dso.distributionFrequency}
      />
      <OfferingTermItem
        name="interestRate"
        ref={ref}
        label="Interest Rate"
        edit={edit}
        value={toPercentage(dso.interestRate)}
      />
      <OfferingTermItem
        name="leverage"
        ref={ref}
        label="Leverage"
        value={dso.leverage || '-'}
      />
    </Grid>
  </SectionContainer>
);
export default React.forwardRef(OfferingTerms);
