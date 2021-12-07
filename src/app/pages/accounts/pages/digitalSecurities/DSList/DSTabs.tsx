import {
  TableTabsView,
  TabsContent
} from 'app/components/TableTabsView/TableTabsView'
import { CustodyList } from 'app/pages/accounts/pages/digitalSecurities/DSList/CustodyList'
import { DSTooltip } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTooltip'
import { SelfCustodyList } from 'app/pages/accounts/pages/digitalSecurities/DSList/SelfCustodyList'
import React from 'react'

export const DSTabs = () => {
  const tabs: TabsContent[] = [
    {
      panel: <CustodyList />,
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

  return <TableTabsView tabs={tabs} variant='secondary' />
}
