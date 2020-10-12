import React from 'react'
import { AuthorizerView } from './AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { useAuthorizerRouter } from '../router'
import { BankPreview } from 'v2/app/components/BankPreview/BankPreview'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { WithdrawalPreview } from 'v2/app/components/WithdrawalPreview'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { DSWithdrawalPreview } from 'v2/app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { useCachedPaginatedTableData } from 'v2/hooks/useCachedPaginatedTableData'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'

export const viewsMap = {
  banks: BankPreview,
  offerings: DSOForm,
  dsWithdrawals: DSWithdrawalPreview,
  corporateIdentities: CorporateIdentityForm,
  individualIdentities: IndividualIdentityForm,
  withdrawals: WithdrawalPreview,
  deposits: DepositView,
  commitments: CommitmentPreview
}

export const ViewAuthorizableItem = () => {
  const { params } = useAuthorizerRouter()
  const { category, itemId, cacheQueryKey } = params
  const component = viewsMap[
    category as keyof typeof viewsMap
  ] as React.ComponentType<any>
  const { data } = useCachedPaginatedTableData<any>(cacheQueryKey, '_id')
  const item = data.map[itemId]

  return (
    <AuthorizerView
      title='View Item'
      data={item}
      feature={DataroomFeature[category as keyof typeof DataroomFeature]}
    >
      {React.createElement(component, { data: item })}
    </AuthorizerView>
  )
}
