import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'

import { AboutWrapping } from 'components/Vault/AboutWrapping'
import { ButtonGradient } from 'components/Button'
import { useCurrency } from 'hooks/Tokens'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { useActiveWeb3React } from 'hooks/web3'
import { ApplicationModal } from 'state/application/actions'
import { useToggleModal } from 'state/application/hooks'
import { TextGradient } from 'theme'
import { shortenAddress } from 'utils'
import { ReactComponent as Info } from 'assets/images/info-filled.svg'

import { AddressToMetamask, StyledButtonGradient } from './styleds'

interface Props {
  token: any
}

export const AddToMetamask = ({ token }: Props) => {
  const originalAddress = useMemo(() => {
    return token?.address
  }, [token])

  const originalCurrency = useCurrency(originalAddress ?? null)
  const { library } = useActiveWeb3React()

  const addOriginalCurrency = useAddTokenToMetamask(originalCurrency ?? undefined)
  const [originAddIsCopied, setOriginAddCopied] = useCopyClipboard()

  return (
    <AddressToMetamask>
      {token.token?.originalAddress && (
        <>
          <div>
            <Trans>{token?.ticker || 'Original token'}:</Trans>
          </div>
          <div onClick={() => setOriginAddCopied(token?.token?.originalAddress ?? '')}>
            {originAddIsCopied ? <Trans>Copied!</Trans> : shortenAddress(token?.token?.originalAddress ?? '')}
          </div>
          {originalCurrency && library?.provider?.isMetaMask && (
            <StyledButtonGradient onClick={() => !addOriginalCurrency.success && addOriginalCurrency.addToken()}>
              <Trans>{!addOriginalCurrency.success ? 'Add to Metamask' : 'Added'}</Trans>
            </StyledButtonGradient>
          )}
        </>
      )}
    </AddressToMetamask>
  )
}
export const AddWrappedToMetamask = ({ token }: Props) => {
  const addCurrency = useAddTokenToMetamask({ ...token?.token, wrapped: token?.token } ?? undefined)
  const { library } = useActiveWeb3React()
  const toggleAbout = useToggleModal(ApplicationModal.ABOUT_WRAPPING)
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <>
      <AboutWrapping />
      <AddressToMetamask style={{ marginTop: 8 }}>
        {token.token?.address && (
          <>
            <div>
              <Info onClick={toggleAbout} />
              <div>
                <Trans>Wrapped {token?.ticker || 'Original token'}:</Trans>
              </div>
            </div>
            <div onClick={() => setCopied(token?.token?.address ?? '')}>
              {isCopied ? <Trans>Copied!</Trans> : shortenAddress(token?.token?.address ?? '')}
            </div>
            {library?.provider?.isMetaMask && (
              <StyledButtonGradient onClick={() => !addCurrency.success && addCurrency.addToken()}>
                <Trans>{!addCurrency.success ? 'Add to Metamask' : 'Added'}</Trans>
              </StyledButtonGradient>
            )}
          </>
        )}
      </AddressToMetamask>
    </>
  )
}
