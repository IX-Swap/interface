import React, { MouseEventHandler } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, Box } from '@mui/material'
import { LabelWithTooltip } from 'ui/LabelWithTooltip/LabelWithTooltip'
import { TypedField } from 'components/form/TypedField'
import { TextInput } from 'ui/TextInput/TextInput'
import { NumericInput } from 'components/form/NumericInput'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { Submit } from 'components/form/Submit'
import { TransactionTypeSelect } from './TransactionTypeSelect'
import { VirtualAccountTransactionFormValues } from 'types/virtualAccountTransaction'

interface CreateVirtualAccountTransactionFieldsProps {
  onCancel: MouseEventHandler
}

export const CreateVirtualAccountTransactionFields = ({
  onCancel
}: CreateVirtualAccountTransactionFieldsProps) => {
  const { control } = useFormContext<VirtualAccountTransactionFormValues>()

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <TypedField
        component={TextInput}
        // onChange={() => alert('test')}
        control={control}
        name='accountId'
        variant='outlined'
        label='Account ID'
      />
      <TypedField
        component={TextInput}
        control={control}
        name='email'
        variant='outlined'
        label='Email'
        disabled
      />
      <TypedField
        control={control}
        component={NumericInput}
        label='Amount'
        name='amount'
        numberFormat={moneyNumberFormat}
        valueExtractor={numericValueExtractor}
      />
      <TypedField
        component={TransactionTypeSelect}
        control={control}
        name='type'
        variant='outlined'
        label='Type of Transaction'
        helperText='Select Type of Transaction'
      />
      <TypedField
        component={TextInput}
        control={control}
        name='reference'
        variant='outlined'
        label={
          <LabelWithTooltip
            label={'Reference Number'}
            tooltipTitle={
              <span>
                <strong>Reference Number</strong> represents the bank
                transaction number.
              </span>
            }
          />
        }
      />
      <TypedField
        component={TextInput}
        control={control}
        name='notes'
        variant='outlined'
        label='Notes'
      />
      <Box display={'flex'} gap={2}>
        <Button
          variant='outlined'
          color='primary'
          fullWidth
          onClick={onCancel}
          sx={{ paddingY: 2 }}
          disableElevation
        >
          Cancel
        </Button>
        <Submit
          variant='contained'
          color='primary'
          fullWidth
          sx={{ paddingY: 2 }}
          disableElevation
        >
          Submit
        </Submit>
      </Box>
    </Box>
  )
}
