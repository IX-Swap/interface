import React, { FC } from 'react'

import { PAYOUT_STATUS } from '..'

interface Props {
  status: PAYOUT_STATUS
}

export const UserView: FC<Props> = ({ status }) => {
  return <>User View</>
}
