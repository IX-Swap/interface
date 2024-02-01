import { Trans } from '@lingui/macro'
import SettingsTab from 'components/Settings'
import React, { useState } from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import styled from 'styled-components'
import { RowBetween } from '../../components/Row'
import { ReactComponent as InfoIcon } from '../../assets/images/newInfo.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/x.svg'
import { isMobile } from 'react-device-detect'

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `};
`

const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: #292933;
`

const Disclaimer = styled.p`
  border: 1px solid #e6e6ff;
  padding: 25px;
  font-size: 13px;
  color: #666680;
  line-height: 19.5px;
`

export const LiquidityTitle = () => {
  const { allowedSlippage } = useDerivedSwapInfo()
  const storedDisclaimer = localStorage.getItem('Disclaimer');
  const [disclaimerVisible, setDisclaimerVisible] = useState(storedDisclaimer !== 'false');

  const handleDisclaimerClose = () => {
    setDisclaimerVisible(false);
    localStorage.setItem('Disclaimer', 'false');
  }

  return (
    <>
      <TitleRow padding={'0'}>
        <Title>
          <Trans>Liquidity Pool</Trans>
        </Title>
        <SettingsTab placeholderSlippage={allowedSlippage} />
      </TitleRow>

      {disclaimerVisible && (
        <Disclaimer>
          <div style={{ display: 'flex' }}>
            <InfoIcon style={{ cursor: 'pointer', position: 'absolute', left: isMobile ? '16px' : '45px' }} />
            <span style={{ fontSize: '14px', color: '#292933', fontWeight: '700' }}>Disclaimer:</span>
            <CloseIcon style={{ cursor: 'pointer', position: 'absolute', right: '60px' }} onClick={handleDisclaimerClose} />
          </div>
          <br />
          By accessing and utilizing Liquidity Pools, you acknowledge and accept the inherent risks involved, including
          market volatility, impermanent loss, regulatory changes and/or smart contract vulnerabilities. IX Swap makes
          no guarantees of profit and expressly disclaims responsibility for any losses you may suffer due to such
          risks. You acknowledge that your access and use of Liquidity Pools shall be at your own risk, and you should
          conduct independent research and are encouraged to seek professional advice before doing so.
        </Disclaimer>
      )}
    </>
  );
}
