import React from 'react'
import { Box } from '@mui/material'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useUpdateDecimal } from 'app/pages/admin/hooks/useUpdateDecimal'
import { Form } from 'components/form/Form'
import { BlockchainSettingsDecimal } from './BlockchainSettingsDecimal'
import { FormOTPDialog } from 'app/components/FormOTPDialog'

export interface BlockchainSettingsFormProps {
  decimal: number
}

export interface BlockchainSettingsFormValues
  extends BlockchainSettingsFormProps {
  otp: string
}

export const BlockchainSettingsForm = ({
  decimal
}: BlockchainSettingsFormProps) => {
  const { getFilterValue } = useQueryFilter()
  const network = getFilterValue('blockchainNetwork')
  const [updateDecimal, { isLoading }] = useUpdateDecimal()

  const handleUpdate = async (values: BlockchainSettingsFormValues) => {
    // network can never be undefined here because this component renders only
    // when you select a blockchain network using BlockchainSelector
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateDecimal({ ...values, network: network! })
  }

  // TODO fix decimals value issue
  return (
    <Form<BlockchainSettingsFormValues>
      onSubmit={handleUpdate}
      defaultValues={{ decimal }}
    >
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <BlockchainSettingsDecimal network={network} decimal={decimal} />
        <FormOTPDialog
          triggerButtonProps={{
            size: 'large',
            variant: 'outlined',
            color: 'primary',
            children: 'Update',
            disabled: isLoading
          }}
        />
      </Box>
    </Form>
  )
}
