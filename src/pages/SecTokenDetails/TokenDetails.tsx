import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { Logo } from './styleds'
import { AccreditationRequest } from 'components/Vault/enum'
import useCopyClipboard from 'hooks/useCopyClipboard'
import React from 'react'
import { ExternalLink } from 'theme'
import { shortenAddress } from 'utils'
import PortisIcon from '../../assets/images/portisIcon.png'
import { DetailsElement } from './DetailsElement'
import { Details, IconWrapper } from './styleds'

interface Props {
  currency?: Token
  accreditationRequest: AccreditationRequest | null
}
export const TokenDetails = ({ currency, accreditationRequest }: Props) => {
  const [isCopied, setCopied] = useCopyClipboard()
  return (
    <Details>
      <div>
        {accreditationRequest && (
          <DetailsElement
            title={<Trans>Issuer:</Trans>}
            content={
              <>
                <Logo style={{ marginRight: '6px' }} currency={currency} size="27px" />
                <ExternalLink href={accreditationRequest.custodian.website} style={{ textDecorationLine: 'underline' }}>
                  {accreditationRequest.custodian.name}
                </ExternalLink>
              </>
            }
          />
        )}
        {currency?.address && (
          <div onClick={() => setCopied(currency?.address ?? '')}>
            <DetailsElement
              title={<Trans>Contract:</Trans>}
              content={isCopied ? <Trans>Copied!</Trans> : shortenAddress(currency?.address ?? '')}
            />
          </div>
        )}
      </div>
      {false && <DetailsElement title={<Trans>Initial Price:</Trans>} content="17$" />}
      {false && <DetailsElement title={<Trans>Total Issued:</Trans>} content="100000000" />}
      {false && <DetailsElement title={<Trans>Initial offering price:</Trans>} content="$25" />}
      {false && <DetailsElement title={<Trans>STO Med. price:</Trans>} content="$30" />}
    </Details>
  )
}
