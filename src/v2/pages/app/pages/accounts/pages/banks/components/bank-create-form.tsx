import React from 'react'
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Typography,
  MenuItem,
  Select,
  Paper
} from '@material-ui/core'
import { FormContext, useForm, Controller } from 'react-hook-form'
import { renderMenu } from '../../../../../../../helpers/rendering'
import { COUNTRIES_OPTS } from '../../../../../components/identity-forms/const'
import { Bank } from '../../../../../../../types/bank'
import AssetsSelect from './assets-select'

const BankCreateForm = ({ bank }: { bank? : Bank }) => {
  const defaultBank = bank ?? { asset: { _id: '' } }
  const bankValues = { ...defaultBank, asset: defaultBank.asset._id }
  const methods = useForm({
    defaultValues: { ...(bankValues ?? {}) }
  })

  return (
    <FormContext {...methods}>
      <form>
        <Paper elevation={0}>
          <Grid container>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor='bank-name'>Bank Name</InputLabel>
                  <Input
                    id='bank-name'
                    name='bankName'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box mr={3} m={1}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor='account-holder-name-input'>
                    Account Holder Name
                  </InputLabel>
                  <Input
                    id='account-holder-name-input'
                    name='accountHolderName'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item sm={12} md={12} lg={3}>
              <Box ml={3} m={1}>
                <AssetsSelect />
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor='bank-account-number-input'>
                    Bank Account Number
                  </InputLabel>

                  <Input
                    required
                    id='bank-account-number-input'
                    name='bankAccountNumber'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={3}>
              <Box mr={3} m={1}>
                <FormControl required fullWidth>
                  <InputLabel htmlFor='swift-code-input'>Swift Code</InputLabel>
                  <Input
                    required
                    name='swiftCode'
                    inputRef={methods.register({ required: true })}
                    id='swift-code-input'
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={12} lg={12}>
              <Box ml={3} mt={3}>
                <Typography variant='h5'>Bank Address</Typography>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-line1-input'>
                    Line 1
                  </InputLabel>
                  <Input
                    id='bank-address-line1-input'
                    name='address.line1'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box mr={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-line2-input'>
                    Line 2
                  </InputLabel>
                  <Input
                    id='bank-address-line2-input'
                    name='address.line2'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-city-input'>
                    City
                  </InputLabel>
                  <Input
                    id='bank-address-city-input'
                    name='address.city'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={6}>
              <Box mr={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='bank-address-state-input'>
                    State
                  </InputLabel>
                  <Input
                    id='bank-address-state-input'
                    name='address.state'
                    inputRef={methods.register({ required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid container>
              <Grid item sm={12} md={12} lg={6}>
                <Box ml={3} m={1}>
                  <FormControl fullWidth>
                    <InputLabel id='select-country'>Country</InputLabel>
                    <Controller
                      as={Select}
                      id='select-country'
                      name='address.country'
                      control={methods.control}
                      onChange={([e]) => e.target.value}
                      defaultValue=''
                    >
                      <MenuItem disabled value={undefined}>
                        Country
                      </MenuItem>
                      {renderMenu(COUNTRIES_OPTS)}
                    </Controller>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item sm={12} md={12} lg={6}>
                <Box mr={3} m={1}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='bank-address-postal-code-input'>
                      Postal Code
                    </InputLabel>
                    <Input
                      id='bank-address-postalcode-input'
                      name='address.postalCode'
                      inputRef={methods.register({ required: true })}
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </FormContext>
  )
}

export default BankCreateForm
