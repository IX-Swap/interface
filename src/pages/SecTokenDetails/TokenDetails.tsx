import { Currency, Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import React from 'react'
import { shortenAddress } from 'utils'
import PortisIcon from '../../assets/images/portisIcon.png'
import { DetailsElement } from './DetailsElement'
import { Details, IconWrapper } from './styleds'

interface Props {
  currency?: Token
}
export const TokenDetails = ({ currency }: Props) => {
  return (
    <Details>
      <DetailsElement
        title={<Trans>Issuer:</Trans>}
        content={
          <>
            <IconWrapper size={16}>
              <img src={PortisIcon} alt={'logo'} />
            </IconWrapper>
            investax.io
          </>
        }
      />
      <DetailsElement title={<Trans>Initial Price:</Trans>} content="17$" />
      <DetailsElement title={<Trans>Total Issued:</Trans>} content="100000000" />
      <DetailsElement title={<Trans>Contract:</Trans>} content={shortenAddress(currency?.address ?? '')} />
      <DetailsElement title={<Trans>Initial offering price:</Trans>} content="$25" />
      <DetailsElement title={<Trans>STO Med. price:</Trans>} content="$30" />
    </Details>
  )
}
