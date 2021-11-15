import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Typography
} from '@material-ui/core'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { RadioGroup } from 'components/form/RadioGroup'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export interface AutoAssignVirtualAccountFormFieldsProps {
  handleOpen: () => void
}

export const AutoAssignVirtualAccountFormFields = ({
  handleOpen
}: AutoAssignVirtualAccountFormFieldsProps) => {
  const { control } = useFormContext()
  const { data, list, isLoading } = useVirtualAccount()

  if (isLoading || list?.length > 1) {
    return null
  }

  const noData = data === undefined
  const currencyAvailable = data?.currency === 'SGD' ? 'USD' : 'SGD'

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <TypedField
          customRenderer
          component={RadioGroup}
          name='currency'
          label=''
          control={control}
          defaultValue={currencyAvailable}
        >
          <Grid container spacing={2} alignContent='center'>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                {noData
                  ? 'To begin investing, please select the currency to pre-fund your account.'
                  : 'Request for adding another account by selecting from the list:'}
              </Typography>
            </Grid>
            {noData ? (
              <>
                <Grid item>
                  <FormControlLabel
                    label='SGD'
                    value='SGD'
                    control={<Radio />}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    label='USD'
                    value='USD'
                    control={<Radio />}
                  />
                </Grid>
              </>
            ) : (
              <Grid item>
                <FormControlLabel
                  label={currencyAvailable}
                  value={currencyAvailable}
                  control={<Radio />}
                />
              </Grid>
            )}
          </Grid>
        </TypedField>
      </Grid>
      <Grid item>
        <Button
          onClick={handleOpen}
          type='button'
          variant={noData ? 'contained' : 'outlined'}
          color='primary'
          disableElevation
        >
          {noData ? 'Confirm' : 'Add account'}
        </Button>
      </Grid>
    </Grid>
  )
}
