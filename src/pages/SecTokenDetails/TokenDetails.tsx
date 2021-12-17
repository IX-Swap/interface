import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { Logo } from './styleds'
import { AccreditationRequest } from 'components/Vault/enum'
import React, { useMemo } from 'react'
import useCopyClipboard from 'hooks/useCopyClipboard'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { IXS_GOVERNANCE_ADDRESS } from 'constants/addresses'
import { ExternalLink, TextGradient } from 'theme'
import { RowStart } from 'components/Row'
import { shortenAddress } from 'utils'
import { DetailsElement } from './DetailsElement'
import { Details } from './styleds'
import { SecTokenPlatform } from 'types/secToken'

interface Props {
  currency?: Token
  accreditationRequest: AccreditationRequest | null
  platform: SecTokenPlatform
}
export const TokenDetails = ({ currency, platform }: Props) => {
  const originalAddress = useMemo(() => {
    return (currency as any)?.tokenInfo?.originalAddress
  }, [currency])

  const originalName = useMemo(() => {
    return (currency as any)?.tokenInfo?.originalName
  }, [currency])

  const IXSGovCurrency = useCurrency(IXS_GOVERNANCE_ADDRESS[originalAddress ?? 1])
  const { library } = useActiveWeb3React()

  const addIXSGov = useAddTokenToMetamask(IXSGovCurrency ?? undefined)
  const addIXS = useAddTokenToMetamask(currency ?? undefined)

  const [isCopied, setCopied] = useCopyClipboard()
  const [originAddIsCopied, setOriginAddCopied] = useCopyClipboard()

  return (
    <Details>
      <div>
        {platform && (
          <DetailsElement
            title={<Trans>Issuer:</Trans>}
            content={
              <>
                <Logo style={{ marginRight: '6px' }} currency={currency} size="27px" />
                <ExternalLink href={platform.website} style={{ textDecorationLine: 'underline' }}>
                  {platform.name}
                </ExternalLink>
              </>
            }
          />
        )}
        {currency?.address && (
          <RowStart style={{ gap: '5px' }}>
            <div onClick={() => setCopied(currency?.address ?? '')}>
              <DetailsElement
                title={<Trans>Contract:</Trans>}
                content={isCopied ? <Trans>Copied!</Trans> : shortenAddress(currency?.address ?? '')}
              />
            </div>
            {currency && library?.provider?.isMetaMask && (
              <TextGradient
                style={{ cursor: 'pointer', marginBottom: '0.75rem', fontSize: '18px', lineHeight: '27px' }}
                onClick={() => !addIXS.success && addIXS.addToken()}
              >
                {!addIXS.success ? <Trans>Add to Metamask</Trans> : null}
              </TextGradient>
            )}
          </RowStart>
        )}
        {originalName && <DetailsElement title={<Trans>Original Name:</Trans>} content={originalName ?? ''} />}
        {originalAddress && (
          <RowStart style={{ gap: '5px' }}>
            <div onClick={() => setOriginAddCopied(originalAddress ?? '')}>
              <DetailsElement
                title={<Trans>Original Contract:</Trans>}
                content={originAddIsCopied ? <Trans>Copied!</Trans> : shortenAddress(originalAddress ?? '')}
              />
            </div>
            {currency && library?.provider?.isMetaMask && (
              <TextGradient
                style={{ cursor: 'pointer', marginBottom: '0.75rem', fontSize: '18px', lineHeight: '27px' }}
                onClick={() => !addIXSGov.success && addIXSGov.addToken()}
              >
                {!addIXSGov.success ? <Trans>Add to Metamask</Trans> : null}
              </TextGradient>
            )}
          </RowStart>
        )}
      </div>
      {false && <DetailsElement title={<Trans>Initial Price:</Trans>} content="17$" />}
      {false && <DetailsElement title={<Trans>Total Issued:</Trans>} content="100000000" />}
      {false && <DetailsElement title={<Trans>Initial offering price:</Trans>} content="$25" />}
      {false && <DetailsElement title={<Trans>STO Med. price:</Trans>} content="$30" />}
    </Details>
  )
}
