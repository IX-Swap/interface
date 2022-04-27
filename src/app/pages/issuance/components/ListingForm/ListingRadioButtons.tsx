import {
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { UIRadio } from 'components/UIRadio/UIRadio'

export interface NewListingRadioButtonsProps {
  onImportClick: (value: string) => void
}

export const ListingRadioButtons = ({
  onImportClick
}: NewListingRadioButtonsProps) => {
  const { data, isLoading } = useDSOsByUserId('Approved')
  const [isNewListing, setIsNewListing] = useState(true)
  const [selectedDSOValue, setSelectedDSOValue] = useState<string>('')

  return (
    <RadioGroup
      name={'isNewListing'}
      value={isNewListing ? 'yes' : 'no'}
      onChange={value => setIsNewListing(value.target.value === 'yes')}
    >
      <Grid container alignItems={'center'} spacing={2}>
        <Grid item>
          <FormControlLabel
            label='New Listing'
            value='yes'
            control={<UIRadio />}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            label='Import Data from Issuance'
            value='no'
            control={<UIRadio />}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth variant='outlined' style={{ width: 294 }}>
            <DSOSelect
              label='My DSO'
              value={selectedDSOValue}
              disabled={isLoading || isNewListing}
              options={data.list}
              onChange={value =>
                setSelectedDSOValue(value.target.value as string)
              }
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Typography
            style={{ cursor: 'pointer' }}
            color={'secondary'}
            variant={'body1'}
            onClick={() => {
              if (!isNewListing && selectedDSOValue.length > 0) {
                onImportClick(selectedDSOValue)
              }
            }}
          >
            IMPORT
          </Typography>
        </Grid>
      </Grid>
    </RadioGroup>
  )
}
