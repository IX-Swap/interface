import React from 'react'
import styled from "styled-components"
import { Trans } from '@lingui/macro'
import { useStatusButtonInfo } from "../utils"
import { PAYOUT_STATUS } from 'constants/enums'

type Props = {
    status: PAYOUT_STATUS
}

const PayoutStatusBadge = ({ status }: Props) => {
  const { title, backgroundColor, color } = useStatusButtonInfo(status)

  return (
    <StyledBadge
      bgColor={backgroundColor}
      color={color}
    >
      <Trans>{title}</Trans>
    </StyledBadge>
  )
}

export const StyledBadge = styled.div<{bgColor: string; color: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  background-color: ${({ bgColor }) => bgColor || '#000'};
  color: ${({color}) => color || '#fff'};
`

export default PayoutStatusBadge
