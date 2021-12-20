import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { Logo } from './styleds'
import { AccreditationRequest } from 'components/Vault/enum'
import React, { useMemo } from 'react'
import useCopyClipboard from 'hooks/useCopyClipboard'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { ExternalLink, TextGradient } from 'theme'
import { RowStart } from 'components/Row'
import { shortenAddress } from 'utils'
import { DetailsElement } from './DetailsElement'
import { Details } from './styleds'
import { SecTokenPlatform } from 'types/secToken'
import { useShowAboutWrappingCallback } from 'state/deposit/hooks'
import { ButtonGradient } from 'components/Button'

interface Props {
  currency?: Token
  accreditationRequest: AccreditationRequest | null
  platform: SecTokenPlatform
}
export const TokenDetails = ({ currency, platform }: Props) => {
  const originalAddress = useMemo(() => {
    return (currency as any)?.tokenInfo?.originalAddress
  }, [currency])

  const originalCurrency = useCurrency(originalAddress)
  const { library } = useActiveWeb3React()
  const showAboutWrapping = useShowAboutWrappingCallback()

  const addCurrency = useAddTokenToMetamask(currency ?? undefined)
  const addOriginalCurrency = useAddTokenToMetamask(originalCurrency ?? undefined)

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
                title={<Trans>Wrapped {currency?.symbol}:</Trans>}
                content={isCopied ? <Trans>Copied!</Trans> : shortenAddress(currency?.address ?? '')}
              />
            </div>
            {currency && library?.provider?.isMetaMask && (
              <TextGradient
                style={{ cursor: 'pointer', marginBottom: '0.75rem', fontSize: '18px', lineHeight: '27px' }}
                onClick={() => !addCurrency.success && addCurrency.addToken()}
              >
                {!addCurrency.success ? <Trans>Add to Metamask</Trans> : null}
              </TextGradient>
            )}
            <ButtonGradient
              style={{ width: '146px', alignSelf: 'flex-start', marginBottom: '13px' }}
              onClick={showAboutWrapping}
            >
              <Trans>About Wrapping</Trans>
            </ButtonGradient>
          </RowStart>
        )}
        {originalAddress && (
          <RowStart style={{ gap: '5px' }}>
            <div onClick={() => setOriginAddCopied(originalAddress ?? '')}>
              <DetailsElement
                title={<Trans>{originalCurrency?.symbol || 'Original token'}:</Trans>}
                content={originAddIsCopied ? <Trans>Copied!</Trans> : shortenAddress(originalAddress ?? '')}
              />
            </div>
            {originalCurrency && library?.provider?.isMetaMask && (
              <TextGradient
                style={{ cursor: 'pointer', marginBottom: '0.75rem', fontSize: '18px', lineHeight: '27px' }}
                onClick={() => !addOriginalCurrency.success && addOriginalCurrency.addToken()}
              >
                {!addOriginalCurrency.success ? <Trans>Add to Metamask</Trans> : null}
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
