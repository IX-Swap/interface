import React from 'react'
import { BankPreview } from 'app/components/BankPreview/BankPreview'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBanksRouter } from 'app/pages/accounts/pages/banks/router'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'

const ViewBank: React.FC = () => {
  const { params } = useBanksRouter()
  const { data, status } = useBanksData()
  const bank = data.map[params.bankId]

  if (status === 'loading') {
    return null
  }

  return (
    <>
      <RejectionMessage data={bank} />
      <BankPreview data={bank} />
    </>
  )
}

export default ViewBank
