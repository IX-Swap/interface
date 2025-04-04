import { Trans } from '@lingui/macro'
import SettingsTab from 'components/Settings'
import React, { useState } from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { StyledPageHeader, TYPE } from '../../theme'
import { RowBetween, RowFixed } from '../Row'
import { ReactComponent as InfoIcon } from '../../assets/images/newInfo.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/x.svg'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { useWhitelabelState } from 'state/whitelabel/hooks'

export default function SwapHeader() {
  const { config } = useWhitelabelState()
  const { allowedSlippage } = useDerivedSwapInfo()
  const storedDisclaimer = localStorage.getItem('SDisclaimer')
  const [disclaimerVisible, setDisclaimerVisible] = useState(storedDisclaimer !== 'false')

  const handleDisclaimerClose = () => {
    setDisclaimerVisible(false)
    localStorage.setItem('SDisclaimer', 'false')
  }

  const Disclaimer = styled.p`
    border: 1px solid #e6e6ff;
    padding: 24px 20px 24px 48px;
    font-size: 13px;
    color: #666680;
    line-height: 19.5px;
  `
  return (
    // <StyledPageHeader style={{ padding: '0px' }}>
    <>
      <RowBetween marginBottom={'16px'}>
        <RowFixed>
          <TYPE.black data-testid="swapTitle" fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
            <Trans>Swap</Trans>
          </TYPE.black>
        </RowFixed>
        <RowFixed>
          <SettingsTab placeholderSlippage={allowedSlippage} />
        </RowFixed>
      </RowBetween>

      {disclaimerVisible && (
        <Disclaimer>
          <div style={{ display: 'flex' }}>
            <InfoIcon style={{ cursor: 'pointer', position: 'absolute', left: isMobile ? '28px' : '58px' }} />
            <span style={{ fontSize: '14px', color: '#292933', fontWeight: '700' }}>Disclaimer:</span>
            <CloseIcon
              style={{
                cursor: 'pointer',
                position: 'absolute',
                right: isMobile ? '36px' : '60px',
                top: isMobile ? 'auto' : '125px',
              }}
              onClick={handleDisclaimerClose}
            />
          </div>
          By accessing and utilizing Swap/Trade, you acknowledge and accept the inherent risks involved, including
          market volatility, impermanent loss, regulatory changes and/or smart contract vulnerabilities.{' '}
          {config?.name || 'IXS'} makes no guarantees of profit and expressly disclaims responsibility for any
          losses you may suffer due to such risks. You acknowledge that your access and use of Swap/Trade shall be at
          your own risk, and you should conduct independent research and are encouraged to seek professional advice
          before doing so.
        </Disclaimer>
      )}
    </>

    // </StyledPageHeader>
  )
}
