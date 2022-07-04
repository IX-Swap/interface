import React, { FC } from 'react'
import { Trans, t } from '@lingui/macro'

import Column from 'components/Column'
import { TYPE } from 'theme'
import { useWhitelabelState } from 'state/whitelabel/hooks'

export const DepositAboutWrapping: FC = () => {
  const { config } = useWhitelabelState()

  const info = [
    t`Wrapping allows a non-native token to be used on a different blockchain or on DeFi platforms, essentially making unsupported assets interoperable with other tokens under a different token standard.
    When your security token (SEC) is deposited on ${
      config?.name || 'IX Swap'
    }, the asset will be sent to a custodian address for safekeeping. In exchange, you will get a wrapped token (wSEC) that represents your asset and is worth exactly the same.`,
    t`By using wSEC, you will be able to leverage your original asset to participate in DeFi transactions or any other decentralized application within the Ethereum network, such as trading it with other ERC-20 tokens on ${
      config?.name || 'IX Swap'
    }.`,
    t`Once you deposit your SEC, its corresponding wSEC will be minted and transferred to your balance. Meanwhile, you simply have to unfold/unwrap your wSEC to exchange it for its SEC equivalent and get your original asset back.`,
    t`In our upcoming updates, you can expect more functionalities to become available on the platform, such as managing your assets, trading, staking, etc.`,
  ]

  return (
    <div style={{ position: 'relative' }}>
      <Column style={{ marginTop: '18px', marginBottom: '69px' }}>
        {info.map((text, index) => (
          <TYPE.title11 marginBottom="16px" key={`info-${index}`}>
            <Trans>{text}</Trans>
          </TYPE.title11>
        ))}
      </Column>
    </div>
  )
}
