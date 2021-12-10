import { Trans } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/macro'

import Column, { ColumnCenter } from 'components/Column'
import { TYPE } from 'theme'
import { switchToNetwork } from 'hooks/switchToNetwork'
import { useActiveWeb3React } from 'hooks/web3'
import { SupportedChainId } from 'constants/chains'
import { ButtonText } from 'components/Button'
import Row from 'components/Row'

export const BodyWrapper = styled.div<{ margin?: string; padding?: string; paddingXS?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: 592px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  margin-top: 1rem;
  padding: ${({ padding }) => padding ?? '26px 36px 52px 36px;'};
  ${({ theme, paddingXS }) => theme.mediaWidth.upToExtraSmall`
      padding: ${paddingXS ?? '1rem 0.7rem'};
  `};
  z-index: 1;
`
export const BlurredOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
  display: flex;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  border-radius: 25px;
  background: ${({ theme }) => theme.bgG16};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, blurred, ...rest }: { children: React.ReactNode; blurred?: boolean }) {
  const { library } = useActiveWeb3React()

  const handleCovanClick = () => {
    if (library && library?.provider?.isMetaMask) {
      switchToNetwork({ library, chainId: SupportedChainId.KOVAN })
    }
  }

  return (
    <React.Fragment>
      <BodyWrapper {...rest}>
        {blurred && (
          <BlurredOverlay>
            <Column>
              <TYPE.titleBig marginBottom="33px" fontWeight={600}>
                <ColumnCenter>
                  <Trans>Mainnet to be deployed soon.</Trans>
                </ColumnCenter>
              </TYPE.titleBig>
              <TYPE.titleSmall fontWeight={600}>
                <ColumnCenter>
                  <Row>
                    <Trans>To use our playground you might switch to</Trans>
                    <ButtonText marginLeft="4px" onClick={handleCovanClick}>
                      <Trans>Kovan Testnet.</Trans>
                    </ButtonText>
                  </Row>
                </ColumnCenter>
              </TYPE.titleSmall>
            </Column>
          </BlurredOverlay>
        )}
        {children}
      </BodyWrapper>
    </React.Fragment>
  )
}
