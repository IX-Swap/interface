import React from 'react'
import { AuthorizerView } from './AuthorizerView'
import { DataroomFeature } from '../../../../types/authorizer'
import { useAuthorizerRouter } from '../router'
import { BankPreview } from '../../../components/BankPreview/BankPreview'
import { DepositView } from 'v2/app/components/DepositView/DepositView'
import { WithdrawalPreview } from '../../../components/WithdrawalPreview'
import { CorporateIdentityForm } from '../../identity/components/CorporateIdentityForm'
import { IndividualIdentityForm } from '../../identity/components/IndividualIdentityForm'
import { DSWithdrawalPreview } from '../../../components/DSWithdrawalPreview/DSWithdrawalPreview'
import { DSOForm } from '../../../components/DSO/DSOForm'
import { useCachedPaginatedTableData } from '../../../../hooks/useCachedPaginatedTableData'

export const viewsMap = {
  banks: BankPreview,
  offerings: DSOForm,
  dsWithdrawals: DSWithdrawalPreview,
  corporateIdentities: CorporateIdentityForm,
  individualIdentities: IndividualIdentityForm,
  withdrawals: WithdrawalPreview,
  deposits: DepositView,
  commitments: BankPreview
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
