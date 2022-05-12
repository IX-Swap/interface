import React from 'react'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'
import { useUpdateBank } from 'app/pages/accounts/pages/banks/hooks/useUpdateBank'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankFormValues } from 'app/pages/accounts/types'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const EditBank: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>()
  const { data, status } = useBanksData()
  const [updateBank] = useUpdateBank()

  const handleSubmit = async (values: BankFormValues): Promise<void> => {
    if (bankId === undefined) return
    await updateBank({ ...values, bankId })
  }

  if (status === 'loading' || bankId === undefined) {
    return null
  }

  const bank = data.map[bankId]

  return (
    <Grid container direction='column' spacing={2} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={bank.bankName} />
      </Grid>
      <RootContainer>
        <Grid item>
          <BankForm
            submitButtonLabel='Save'
            bank={bank}
            onSubmit={handleSubmit}
          />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
