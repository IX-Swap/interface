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
import { shortenAddress } from 'utils'
import { DetailsElement } from './DetailsElement'
import { Details } from './styleds'
interface Props {
  token: any
  accreditationRequest: AccreditationRequest | null
}
export const TokenDetails = ({ token }: Props) => {
  const originalAddress = useMemo(() => {
    return token?.address
  }, [token])
  const originalSymbol = useMemo(() => {
    return token?.token?.originalSymbol
  }, [token])
  const originalCurrency = useCurrency(originalAddress ?? null)
  const { library } = useActiveWeb3React()
  const toggleAbout = useToggleModal(ApplicationModal.ABOUT_WRAPPING)
  const addCurrency = useAddTokenToMetamask({ ...token?.token, wrapped: token?.token } ?? undefined)
  const addOriginalCurrency = useAddTokenToMetamask(originalCurrency ?? undefined)
  const [isCopied, setCopied] = useCopyClipboard()
  const [originAddIsCopied, setOriginAddCopied] = useCopyClipboard()

  return (
    <Details>
      <AboutWrapping />
      {token && (
        <div>
          {token.token?.address && (
            <RowStart style={{ gap: '5px', flexWrap: 'wrap' }}>
              <div onClick={() => setCopied(token.token?.address ?? '')}>
                <DetailsElement
                  title={<Trans>Wrapped {token.symbol}:</Trans>}
                  content={isCopied ? <Trans>Copied!</Trans> : shortenAddress(token.token?.address ?? '')}
                />
              </div>
              {library?.provider?.isMetaMask && (
                <TextGradient
                  style={{ cursor: 'pointer', marginBottom: '0.75rem', fontSize: '18px', lineHeight: '27px' }}
                  onClick={() => !addCurrency.success && addCurrency.addToken()}
                >
                  {!addCurrency.success ? <Trans>Add to Metamask</Trans> : null}
                </TextGradient>
              )}
              <ButtonGradient
                style={{ width: '146px', alignSelf: 'flex-start', marginBottom: '0.75rem' }}
                onClick={toggleAbout}
              >
                <Trans>About Wrapping</Trans>
              </ButtonGradient>
            </RowStart>
          )}
          {token.token?.originalAddress && (
            <RowStart style={{ gap: '5px', flexWrap: 'wrap' }}>
              <div onClick={() => setOriginAddCopied(token?.token?.originalAddress ?? '')}>
                <DetailsElement
                  title={<Trans>{originalSymbol || 'Original token'}:</Trans>}
                  content={
                    originAddIsCopied ? <Trans>Copied!</Trans> : shortenAddress(token?.token?.originalAddress ?? '')
                  }
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
          <DetailsElement title={<Trans>Country:</Trans>} content={token.country} />
          <DetailsElement title={<Trans>Industry:</Trans>} content={token.industry} />
          <DetailsElement
            title={<Trans>Issuer:</Trans>}
            content={
              <ExternalLink href={token.issuer.url} style={{ textDecorationLine: 'underline' }}>
                {token.issuer.name}
              </ExternalLink>
            }
          />
          <DetailsElement
            title={<Trans>Website:</Trans>}
            content={
              <ExternalLink href={token.url} style={{ textDecorationLine: 'underline' }}>
                {token.url}
              </ExternalLink>
            }
          />
        </div>
      )}
    </Details>
  )
}
