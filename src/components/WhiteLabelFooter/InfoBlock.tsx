import React from 'react'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import { useWhitelabelState } from 'state/whitelabel/hooks'
import { InfoBlockContainer } from './styleds'

export const InfoBlock = () => {
  const { config } = useWhitelabelState()

  return (
    <InfoBlockContainer>
      <Block1>
        {config?.footerConfig?.block1 || (
          <>
            <div>
              <Trans>
                {config?.footerConfig?.block1 ||
                  `IXS is built by a global team of capital markets, legal and blockchain experts, bringing you the next
        generation of trading for Security tokens and tokenized stocks`}
              </Trans>
            </div>
          </>
        )}
      </Block1>

      <Block23>
        {config?.footerConfig?.block2 || (
          <>
            <div>
              <Trans>
                {config?.name || 'IXS'} is a globally accessible decentralized finance platform which allows for
                exchange of security tokens and cryptocurrency. At {config?.name || 'IXS'}, we look to offer
                end-to-end infrastructure for the dealing, listing, trading and custody of digital assets. We have
                currently integrated with InvestaX in Singapore as a broker-dealer partner, as well as 1st Digital Trust
                in Hong Kong as our custody partner and also work with multiple licensed broker-dealers and distributors
                to provide access to such digital assets globally. At the blockchain level, we have integrated with the
                Ethereum and Polygon chains and a number of protocol integrations are underway.
              </Trans>
            </div>
            <div>
              <Trans>
                Your use of the {config?.name || 'IXS'} involves various risks, including, but not limited to,
                losses while digital assets are being supplied to the {config?.name || 'IXS'} protocol and losses
                due to the fluctuation of prices of tokens in a trading pair or liquidity pool. Before using{' '}
                {config?.name || 'IXS'}, you should review the relevant documentation to make sure you understand
                how {config?.name || 'IXS'} works.
              </Trans>
            </div>
          </>
        )}
      </Block23>

      <Block23>
        {config?.footerConfig?.block3 || (
          <>
            <div>
              <Trans>
                THE IXS PLATFORM IS PROVIDED ON &quot;AS IS&quot;, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY
                KIND. {config?.name || 'IXS'} platform is run by smart contracts deployed on the Ethereum
                blockchain. Upgrades and modifications to the protocol are managed in a community-driven way by holders
                of the {config?.name || 'IXS'} governance token. No developer or entity involved in creating the{' '}
                {config?.name || 'IXS'} will be liable for any claims or damages whatsoever associated with your
                use, inability to use, or your interaction with other users of, the IXS platform, including any
                direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits,
                cryptocurrencies, tokens, or anything else of value.
              </Trans>
            </div>
            <div>
              <Trans>
                The {config?.name || 'IXS'} Platform is not meant for US investors or other FATF prohibited
                jurisdictions, potentially including Iran, Afghanistan, North Korea, Hong Kong, Singapore, and/or other
                jurisdictions. Users must pass sufficient KYC checks in order to use the {config?.name || 'IXS'}{' '}
                platform.
              </Trans>
            </div>
          </>
        )}
      </Block23>
    </InfoBlockContainer>
  )
}

const Block1 = styled.div`
  color: #666680;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.32px;
`

const Block23 = styled.div`
  color: #666680;
  font-family: Inter;
  font-size: 11px !important;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 17.6px */
  letter-spacing: -0.22px;
`
