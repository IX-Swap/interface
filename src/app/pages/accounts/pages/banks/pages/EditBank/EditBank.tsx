import React from 'react'
import { BankForm } from 'app/pages/accounts/pages/banks/components/BankForm'
import { useUpdateBank } from 'app/pages/accounts/pages/banks/hooks/useUpdateBank'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { BankFormValues } from 'app/pages/accounts/types'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const EditBank: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>()
  const { data, status } = useBanksData()
  const [updateBank] = useUpdateBank()

  const handleSubmit = async (values: BankFormValues): Promise<void> => {
    await updateBank({ ...values, bankId })
  }

  if (status === 'loading') {
    return null
  }

  const bank = data.map[bankId]

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title={bank.bankName} />
      </Grid>
      <Grid item>
        <BankForm
          submitButtonLabel='Save'
          bank={bank}
          onSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  )
}
