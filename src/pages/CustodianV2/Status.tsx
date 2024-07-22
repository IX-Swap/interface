import { FC } from 'react'
import { Trans } from '@lingui/macro'
import { ethers } from 'ethers'

import { TYPE } from 'theme'
import { StyledButtonMuted } from './styleds'
import PendingIcon from 'assets/images/newPending.svg'
import RejectIcon from 'assets/images/newReject.svg'
import { formatNumberWithDecimals } from 'state/lbp/hooks'

interface Props {
  status: string
  amount: string
  decimals: number
}

export const Status: FC<Props> = ({ status, amount: propAmount, decimals }: Props) => {
  const amount = formatNumberWithDecimals(ethers.utils.formatUnits(propAmount || '0', decimals), 4)

  const getStatus = () => {
    switch (status) {
      case 'approved':
        return (
          <TYPE.description7 color="text1" overflow="hidden" style={{ textOverflow: 'ellipsis' }}>
            {amount}
          </TYPE.description7>
        )
      case 'pending':
      case 'new':
        return (
          <StyledButtonMuted display="flex" color={'text1'}>
            <Trans>Pending</Trans>
            <img style={{ marginLeft: '7px' }} width="20px" src={PendingIcon} alt="PendingIcon" />
          </StyledButtonMuted>
        )
      case 'failed':
        return (
          <StyledButtonMuted display="flex" color={'text1'}>
            <Trans>Failed</Trans>
            <img style={{ marginLeft: '7px' }} width="20px" src={RejectIcon} alt="RejectIcon" />
          </StyledButtonMuted>
        )
      case 'declined':
        return (
          <StyledButtonMuted display="flex" color={'text1'}>
            <Trans>Rejected</Trans>
            <img style={{ marginLeft: '7px' }} width="20px" src={RejectIcon} alt="RejectIcon" />
          </StyledButtonMuted>
        )
      default:
        return null
    }
  }

  return getStatus()
}
