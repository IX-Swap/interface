import {
  Button,
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
import { useStyles } from 'app/pages/accounts/components/CurrencySelect/CurrencySelect.styles'
import classnames from 'classnames'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export interface NewListingRadioButtonsProps {
  listPlace: null | string
  setListPlace: (value: string) => void
  onImportClick: (value: string) => void
}

export const ListingRadioButtons = ({
  listPlace,
  setListPlace,
  onImportClick
}: NewListingRadioButtonsProps) => {
  const classes = useStyles()

  const { data, isLoading } = useDSOsByUserId('Approved')
  const [selectedDSOValue, setSelectedDSOValue] = useState<string>('')

  const radioButtonsList = [
    {
      label: 'Exchange',
      value: 'exchange'
    },
    {
      label: 'OTC',
      value: 'otc'
    },
    {
      label: 'Both',
      value: 'both'
    }
  ]

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
          <RadioGroup name={'listPlace'} value={listPlace}>
            <Grid
              container
              display={'grid'}
              gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }}
              gap={1.5}
            >
              {radioButtonsList.map(({ label, value }) => {
                return (
                  <Grid
                    item
                    className={classnames(classes.button, {
                      [classes.active]: listPlace === value
                    })}
                    onClick={() => {
                      setListPlace(value)
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
          {/* </TypedField> */}
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
                label='My DSO'
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
