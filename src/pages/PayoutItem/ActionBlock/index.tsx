import React, { FC } from 'react'
import { Box } from 'rebass'

import { PAYOUT_STATUS } from '..'
import { ManagerView } from './ManagerView'
import { UserView } from './UserView'

interface Props {
  isManager: boolean
  status: PAYOUT_STATUS
}

export const PayoutActionBlock: FC<Props> = ({ isManager, status }) => {
  return <Box marginTop="16px">{isManager ? <ManagerView status={status} /> : <UserView status={status} />}</Box>
}
