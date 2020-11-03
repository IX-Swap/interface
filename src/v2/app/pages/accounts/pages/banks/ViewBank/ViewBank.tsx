import React from 'react'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { RejectionMessage } from 'v2/app/pages/authorizer/components/RejectionMessage'

const ViewBank: React.FC = () => {
  const { params } = useBanksRouter()
  const { data, status } = useBanksData()
  const bank = data.map[params.bankId]

  if (status === 'loading') {
    return null
  }

  return (
    <>
      <RejectionMessage data={bank.authorizations} />
      <BankPreview data={bank} />
    </>
  )
}

export default ViewBank
