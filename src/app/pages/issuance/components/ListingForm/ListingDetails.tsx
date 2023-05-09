import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography
} from '@mui/material'
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { DSOSelect } from 'app/pages/issuance/components/IssuanceLanding/DSOSelect'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import classnames from 'classnames'
import { UIRadio } from 'components/UIRadio/UIRadio'
import React, { useState, useRef, useEffect } from 'react'
import { LISTING_TYPES } from '../../consts/listing'

export interface ListingDetailsProps {
  listingType: LISTING_TYPES
  setListingType: (value: LISTING_TYPES) => void
  onImportClick: (value: string) => void
}

export const radioButtonsList = [
  {
    label: 'Exchange',
    value: LISTING_TYPES.EXCHANGE
  },
  {
    label: 'OTC',
    value: LISTING_TYPES.OTC
  },
  {
    label: 'Both',
    value: LISTING_TYPES.BOTH
  }
]

export const ListingDetails = ({
  listingType,
  setListingType,
  onImportClick
}: ListingDetailsProps) => {
  const classes = useStyles()

  const { data, isLoading } = useDSOsByUserId('Approved')
  const [selectedDSOValue, setSelectedDSOValue] = useState<string>('')
  const radioButtonRef = useRef<any>()

  useEffect(() => {
    radioButtonRef?.current?.children[0]?.click()
  }, [])

  return (
    <Grid item container direction={'column'} spacing={{ xs: 4, md: 5 }}>
      <Grid item>
        <FormSectionHeader title={'Listing details'} />
      </Grid>

      <Grid item container direction={'column'} spacing={1.5}>
        <Grid item>
          <Typography>Where do you want to list this offering?</Typography>
        </Grid>

        <Grid item>
          <RadioGroup name={'listPlace'} value={listingType}>
            <Grid
              container
              display={'grid'}
              gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }}
              gap={1.5}
              ref={radioButtonRef}
            >
              {radioButtonsList.map(({ label, value }) => {
                return (
                  <Grid
                    item
                    data-testid={'buttonWrapper'}
                    className={classnames(classes.button, {
                      [classes.active]: listingType === value
                    })}
                    onClick={() => {
                      setListingType(value)
                    }}
                  >
                    <FormControlLabel
                      label={label}
                      value={value}
                      control={<UIRadio />}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>

      <Grid item container direction={'column'} spacing={1.5}>
        <Grid item>
          <Typography>Import data from issuance</Typography>
        </Grid>

        <Grid
          item
          container
          alignItems={{ xs: 'normal', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <Grid
            item
            flexGrow={1}
            marginRight={{ xs: 0, md: 1.5 }}
            marginBottom={{ xs: 4, md: 0 }}
          >
            <FormControl fullWidth variant='outlined'>
              <DSOSelect
                style={{ height: 50 }}
                fullWidth
                label='My STO'
                placeholder='Select item'
                displayEmpty={!isLoading}
                value={selectedDSOValue}
                disabled={isLoading}
                options={data.list}
                onChange={value =>
                  setSelectedDSOValue(value.target.value as string)
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              sx={{
                height: 50,
                width: {
                  xs: '100%',
                  md: 123
                }
              }}
              color={'primary'}
              variant={'contained'}
              onClick={() => {
                if (selectedDSOValue.length > 0) {
                  onImportClick(selectedDSOValue)
                }
              }}
            >
              Import
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}