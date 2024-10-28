import { text2 } from 'components/LaunchpadMisc/typography'
import Logo from 'components/Logo'
import React from 'react'
import styled from 'styled-components'
import { getTokenIcon } from 'utils'

interface Props {
  totalInvestment: number
  symbol: string
}

export const RaisedFund: React.FC<Props> = ({ totalInvestment, symbol }) => {
  const NUM_MIN = 1000

  return (
    <Container>
      <LeftLabel>Raised</LeftLabel>

      {totalInvestment < NUM_MIN ? (
        <LabelCalculating>Calculating</LabelCalculating>
      ) : (
        <LogoTokenWrapper>
          <Label>
            {totalInvestment.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </Label>
          <Logo srcs={[getTokenIcon(symbol)]} alt="logo" style={{ width: '24px', height: '24px' }} />
        </LogoTokenWrapper>
      )}
    </Container>
  )
}

const BaseContainer = styled.div<{ margin?: string }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 1rem;
  margin-top: 1rem;
  height: 40px;
  border-radius: 6px;
`

const Container = styled(BaseContainer)`
  background: rgba(184, 184, 204, 0.05);
  border: 1px solid rgba(184, 184, 204, 0.2);

  justify-content: space-between;
`

const LeftLabel = styled.div`
  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.caption};
`

const Label = styled.div`
  color: #292933;
  text-align: right;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px; /* 285.714% */
  letter-spacing: -0.28px;
`

const LabelCalculating = styled.div`
  color: #b8b8cc;
  text-align: right;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 40px; /* 285.714% */
  letter-spacing: -0.28px;
`

const LogoTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`
