import { TypedField } from 'components/form/TypedField'
import { RadioGroup } from 'components/form/RadioGroup'
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'

export const ListingRadioButtons = () => {
  const { control, getValues } = useFormContext()
  const isNewListing = getValues('isNewListing')
  const { data, isLoading } = useDSOsByUserId()
  const [selectedDSO, setSelectedDSO] = useState<string>('')
  const selectedDSOData = data.list.find(
    item => item._id === selectedDSO.split(':')[0]
  )

  return (
    // @ts-expect-error
    <TypedField
      customRenderer
      component={RadioGroup}
      name='isNewListing'
      label=''
      control={control}
      defaultValue={'yes'}
    >
      <Grid container alignItems={'center'} spacing={2}>
        <Grid item>
          <FormControlLabel
            label='New Listing'
            value='yes'
            control={<Radio />}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            label='Import Data from Issuance'
            value='no'
            control={<Radio />}
          />
        </Grid>
        <Grid item>
          <FormControl variant='outlined' style={{ width: 294 }}>
            <InputLabel htmlFor='my-dso'>My DSO</InputLabel>
            <DSOSelect
              disabled={isLoading || isNewListing === 'yes'}
              options={data.list}
              inputProps={{
                name: 'dso',
                id: 'dso'
              }}
              onChange={value => setSelectedDSO(value.target.value as string)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Typography
            style={{ cursor: 'pointer' }}
            color={'secondary'}
            variant={'body1'}
            onClick={() => {
              if (isNewListing === 'no' && selectedDSOData !== undefined) {
                // TODO Import data from selected DSO
              }
            }}
          >
            IMPORT
          </Typography>
        </Grid>
      </Grid>
    </TypedField>
  )
}
