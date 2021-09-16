import IXSToken from 'assets/images/IXS-token.svg'
import { IconWrapper } from 'components/AccountDetails/styleds'
import JSBI from 'jsbi'
import { Dots } from 'pages/Pool/styleds'
import React from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { useIXSBalance, useIXSGovBalance } from 'state/user/hooks'
import styled from 'styled-components/macro'

const BalanceWrapper = styled.div`
  border-radius: 30px;
  width: fit-content;
  max-width: 90px;
  cursor: pointer;
  margin-left: 4px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     max-width: 60px;
     margin-left: 10px;
  `};
`

export const IXSBalance = () => {
  const IXSBalance = useIXSBalance()
  const IXSGovBalance = useIXSGovBalance()
  const toggle = useToggleModal(ApplicationModal.IXS_BALANCE)
  const showElement =
    JSBI.greaterThan(IXSBalance?.amount?.quotient ?? JSBI.BigInt(0), JSBI.BigInt(0)) ||
    JSBI.greaterThan(IXSGovBalance?.amount?.quotient ?? JSBI.BigInt(0), JSBI.BigInt(0))
  if (!showElement) {
    return null
  }
  return (
    <BalanceWrapper onClick={() => toggle()}>
      {!IXSBalance.loading && !IXSGovBalance.loading && (
        <IconWrapper size={33} style={{ marginRight: '4px' }}>
          <img src={IXSToken} />
        </IconWrapper>
      )}
      {(IXSBalance.loading || IXSGovBalance.loading) && <Dots></Dots>}
    </BalanceWrapper>
  )
}
