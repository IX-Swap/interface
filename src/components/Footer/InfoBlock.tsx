import React from 'react'
import { Trans } from '@lingui/macro'

import { InfoBlockContainer } from './styleds'

export const InfoBlock = () => {
  return (
    <InfoBlockContainer>
      <div>
        <div>
          <Trans>
            IX Swap is a globally accessible decentralized finance platform which allows for exchange of security tokens
            and cryptocurrency. At IX Swap, we look to offer end-to-end infrastructure for the dealing, listing, trading
            and custody of digital assets. We have currently integrated with InvestaX in Singapore as a broker-dealer
            partner, as well as 1st Digital Trust in Hong Kong as our custody partner and also work with multiple
            licensed broker-dealers and distributors to provide access to such digital assets globally. At the
            blockchain level, we have integrated with the Ethereum and Polygon chains and a number of protocol
            integrations are underway.
          </Trans>
        </div>
        <div>
          <Trans>
            Your use of the IX Swap involves various risks, including, but not limited to, losses while digital assets
            are being supplied to the IX Swap protocol and losses due to the fluctuation of prices of tokens in a
            trading pair or liquidity pool. Before using IX Swap, you should review the relevant documentation to make
            sure you understand how IX Swap works.
          </Trans>
        </div>
      </div>

      <div>
        <div>
          <Trans>
            THE IX SWAP PLATFORM IS PROVIDED ON &quot;AS IS&quot;, AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.
            IX Swap platform is run by smart contracts deployed on the Ethereum blockchain. Upgrades and modifications
            to the protocol are managed in a community-driven way by holders of the IX Swap governance token. No
            developer or entity involved in creating the IX Swap will be liable for any claims or damages whatsoever
            associated with your use, inability to use, or your interaction with other users of, the IX Swap platform,
            including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss
            of profits, cryptocurrencies, tokens, or anything else of value.
          </Trans>
        </div>
        <div>
          <Trans>
            The IX Swap Platform is not meant for US investors or other FATF prohibited jurisdictions, potentially
            including Iran, Afghanistan, North Korea, Hong Kong, Singapore, and/or other jurisdictions. Users must pass
            sufficient KYC checks in order to use the IX Swap platform.
          </Trans>
        </div>
      </div>
    </InfoBlockContainer>
  )
}
