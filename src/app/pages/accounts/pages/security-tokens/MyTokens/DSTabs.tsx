import {
  TableTabsView,
  TabsContent
} from 'app/components/TableTabsView/TableTabsView'
import { SecurityTokensTable } from 'app/pages/accounts/pages/security-tokens/MyTokens/SecurityTokensTable'
import { DSTooltip } from 'app/pages/accounts/pages/security-tokens/MyTokens/DSTooltip'
import { SelfCustodyList } from 'app/pages/accounts/pages/security-tokens/MyTokens/SelfCustodyList'
import React from 'react'

export const DSTabs = () => {
  const tabs: TabsContent[] = [
    {
      panel: <SecurityTokensTable />,
      label: 'Custody'
    },
    {
      panel: <SelfCustodyList />,
      label: 'Self Custody'
    },
    {
      panel: <></>,
      label: '',
      component: <DSTooltip />
    }
  ]

  return <TableTabsView tabs={tabs} variant={'tabsOnly'} />
}
