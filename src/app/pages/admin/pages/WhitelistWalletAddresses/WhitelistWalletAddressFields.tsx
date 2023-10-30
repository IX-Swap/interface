import React, { useState, MouseEventHandler } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, Box } from '@mui/material'
import { Add } from '@mui/icons-material'
import { TypedField } from 'components/form/TypedField'
import { TextInput } from 'ui/TextInput/TextInput'
import { Submit } from 'components/form/Submit'
import { SecurityTokenSelect } from './SecurityTokenSelect'
import { WalletAddressSelect } from './WalletAddressSelect'
import { WhitelistWalletAddressFormValues } from 'types/whitelistWalletAddress'

interface WhitelistWalletAddressFieldsProps {
  onCancel: MouseEventHandler
}

export const WhitelistWalletAddressFields = ({
  onCancel
}: WhitelistWalletAddressFieldsProps) => {
  const { control } = useFormContext<WhitelistWalletAddressFormValues>()
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <TypedField
        component={SecurityTokenSelect}
        control={control}
        name='assetId'
        variant='outlined'
      />

      {!isAddingAddress ? (
        <Box display={'flex'} alignItems={'end'} gap={2}>
          <TypedField
            component={WalletAddressSelect}
            control={control}
            name='address'
            variant='outlined'
          />
          <Button
            variant='contained'
            color='primary'
            sx={{ width: '250px', paddingX: 1, paddingY: 1.5 }}
            disableElevation
            onClick={() => setIsAddingAddress(true)}
          >
            <Add sx={{ marginRight: 1 }} />
            Wallet Address
          </Button>
        </Box>
      ) : (
        <>
          <TypedField
            component={TextInput}
            control={control}
            name='label'
            variant='outlined'
            label='Address Label'
          />
          <TypedField
            component={TextInput}
            control={control}
            name='address'
            variant='outlined'
            label='Wallet Address'
          />
        </>
      )}
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
          Add to Whitelist
        </Submit>
      </Box>
    </Box>
  )
}
