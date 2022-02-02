import { Token } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonGradient } from 'components/Button'
import { RowStart } from 'components/Row'
import { AboutWrapping } from 'components/Vault/AboutWrapping'
import { AccreditationRequest } from 'components/Vault/enum'
import { useCurrency } from 'hooks/Tokens'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { ExternalLink, TextGradient } from 'theme'
import { SecTokenPlatform } from 'types/secToken'
import { shortenAddress } from 'utils'
import { DetailsElement } from './DetailsElement'
import { Details, Logo } from './styleds'
interface Props {
  currency?: Token | null
  token: any
  accreditationRequest: AccreditationRequest | null
  platform: SecTokenPlatform
}
export const TokenDetails = ({ token, currency, platform }: Props) => {
  const originalAddress = useMemo(() => {
    return (currency as any)?.tokenInfo?.originalAddress
  }, [currency])
  const originalSymbol = useMemo(() => {
    return (currency as any)?.tokenInfo?.originalSymbol
  }, [currency])
  const originalCurrency = useCurrency(originalAddress)
  const { library } = useActiveWeb3React()
  const toggleAbout = useToggleModal(ApplicationModal.ABOUT_WRAPPING)
  const addCurrency = useAddTokenToMetamask(currency ?? undefined)
  const addOriginalCurrency = useAddTokenToMetamask(originalCurrency ?? undefined)

  const [isCopied, setCopied] = useCopyClipboard()
  const [originAddIsCopied, setOriginAddCopied] = useCopyClipboard()
  return (
    <Details>
      <AboutWrapping />
      {false && (
        <div>
          {platform && (
            <DetailsElement
              title={<Trans>Issuer:</Trans>}
              content={
                <>
                  <Logo style={{ marginRight: '6px' }} currency={currency || undefined} size="27px" />
                  <ExternalLink href={platform.website} style={{ textDecorationLine: 'underline' }}>
                    {platform.name}
                  </ExternalLink>
                </>
              }
            />
          )}
          {currency?.address && (
            <RowStart style={{ gap: '5px', flexWrap: 'wrap' }}>
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
                onClick={toggleAbout}
              >
                <Trans>About Wrapping</Trans>
              </ButtonGradient>
            </RowStart>
          )}
          {originalAddress && (
            <RowStart style={{ gap: '5px', flexWrap: 'wrap' }}>
              <div onClick={() => setOriginAddCopied(originalAddress ?? '')}>
                <DetailsElement
                  title={<Trans>{originalSymbol || 'Original token'}:</Trans>}
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
      )}
      {false && <DetailsElement title={<Trans>Initial Price:</Trans>} content="17$" />}
      {false && <DetailsElement title={<Trans>Total Issued:</Trans>} content="100000000" />}
      {false && <DetailsElement title={<Trans>Initial offering price:</Trans>} content="$25" />}
      {false && <DetailsElement title={<Trans>STO Med. price:</Trans>} content="$30" />}
      {token && (
        <>
          <DetailsElement title={<Trans>Country:</Trans>} content={token.country} />
          <DetailsElement title={<Trans>Industry:</Trans>} content={token.industry} />
          <DetailsElement title={<Trans>Issuer:</Trans>} content={token.issuer.name} />
          <DetailsElement title={<Trans>Website:</Trans>} content={token.url} />
        </>
      )}
    </Details>
  )
}
