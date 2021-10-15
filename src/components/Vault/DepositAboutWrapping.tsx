import React, { FC } from 'react'
import { Trans, t } from '@lingui/macro'
import Column from 'components/Column'
import { TYPE } from 'theme'

export const DepositAboutWrapping: FC = () => {
  const info = [
    t`At the moment, security tokens are kept by the custodian and can only be regulated by him. This is done to
    prevent theft and fraudulent transactions. Your security tokens (further as a SEC) cannot be controlled or
    moved, but you have the rights to own them. Relatively speaking, you can dispose of your rights to your own
    security tokens. First reason to do this, we tokenize your token ownership and call it wrapped tokens (further
    as a wSEC).`,
    t`
    Second reason you need wSEC is to be able to trade SEC for other ERC-20 tokens on decentralized platforms like
    IXS. Because decentralized platforms running on Ethereum use smart contracts to facilitate trades directly
    between users, every user needs to have the same standardized format for every token they trade. This ensures
    tokens don’t get lost in translation.
    `,
    t`
    When you “wrap” SEC, you are actually not so much wrapping as trading through a smart contract for an equal
    token called wSEC. If you want to get back a simple SEC, you need to &quot;unfold&quot; it. AKA will exchange
    it for a simple SEC.
    `,
    t`When you make a deposit, we create a wrap token and transfer it to your balance. In the future, you have the
    ability to manage it - change, sell, stake, etc. 1 security token = 1 wrapped token (1 SEC = wSEC)
    `,
  ]

  return (
    <div style={{ position: 'relative' }}>
      <Column style={{ marginTop: '18px', marginBottom: '69px' }}>
        {info.map((text, index) => (
          <TYPE.title11 key={`info-${index}`}>
            <Trans>{text}</Trans>
          </TYPE.title11>
        ))}
      </Column>
    </div>
  )
}
