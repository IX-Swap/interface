import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React from 'react'
import { shortenAddress } from 'utils'
import PortisIcon from '../../assets/images/portisIcon.png'
import { DetailsElement } from './DetailsElement'
import { Details, IconWrapper } from './styleds'

interface Props {
  currency?: Token
}
export const TokenDetails = ({ currency }: Props) => {
  const [isCopied, setCopied] = useCopyClipboard()
  return (
    <Details>
      {false && (
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
      )}
      {false && <DetailsElement title={<Trans>Initial Price:</Trans>} content="17$" />}
      {false && <DetailsElement title={<Trans>Total Issued:</Trans>} content="100000000" />}
      {currency?.address && (
        <div onClick={() => setCopied(currency?.address ?? '')}>
          <DetailsElement
            title={<Trans>Contract:</Trans>}
            content={isCopied ? <Trans>Copied!</Trans> : shortenAddress(currency?.address ?? '')}
          />
        </div>
      )}
      {false && <DetailsElement title={<Trans>Initial offering price:</Trans>} content="$25" />}
      {false && <DetailsElement title={<Trans>STO Med. price:</Trans>} content="$30" />}
    </Details>
  )
}
