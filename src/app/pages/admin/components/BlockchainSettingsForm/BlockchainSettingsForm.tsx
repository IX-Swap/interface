import React, { useMemo } from 'react'
import { Box } from '@material-ui/core'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useUpdateDecimal } from 'app/pages/admin/hooks/useUpdateDecimal'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { BlockchainSettingsDecimal } from './BlockchainSettingsDecimal'

export interface BlockchainSettingsFormProps {
  decimal: number
}

export interface BlockchainSettingsFormValues
  extends BlockchainSettingsFormProps {}

export const BlockchainSettingsForm = ({
  decimal
}: BlockchainSettingsFormProps) => {
  const { getFilterValue } = useQueryFilter()
  const network = getFilterValue('blockchainNetwork')
  const [updateDecimal] = useUpdateDecimal()

  const handleUpdate = async (values: BlockchainSettingsFormValues) => {
    // network can never be undefined here because this component renders only
    // when you select a blockchain network using BlockchainSelector
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await updateDecimal({ decimal: values.decimal, network: network! })
  }

  const defaultValues = useMemo(() => ({ decimal }), [decimal, network]) // eslint-disable-line

  // TODO fix decimals value issue
  return (
    <Form onSubmit={handleUpdate} defaultValues={defaultValues}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <BlockchainSettingsDecimal />
        <Submit size='large' variant='outlined' color='primary'>
          Update
        </Submit>
      </Box>
    </Form>
  )
}
