import React, { useMemo } from 'react'
import { Trans } from '@lingui/macro'

import { AboutWrapping } from 'components/Vault/AboutWrapping'
import { useCurrency } from 'hooks/Tokens'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { useWeb3React } from 'hooks/useWeb3React'
import { CopyAddress } from 'components/CopyAddress'
import MetamaskIcon from 'assets/images/metamask.png'
import { AddressToMetamask, StyledButtonGradientAddMetamask } from './styleds'

interface Props {
  token: any
}

export const AddToMetamask = ({ token }: Props) => {
  const originalAddress = useMemo(() => {
    return token?.address
  }, [token])

  const originalCurrency = useCurrency(originalAddress ?? null)
  const { provider } = useWeb3React()

  const addOriginalCurrency = useAddTokenToMetamask(originalCurrency ?? undefined)

  return (
    <AddressToMetamask>
      {token.token?.originalAddress && (
        <>
          {/* <div>
            <Trans>{token?.ticker || 'Original token'}:</Trans>
          </div> */}
          <div>
            <CopyAddress address={token?.token?.originalAddress ?? ''} />
          </div>
          {!originalCurrency && provider?.provider?.isMetaMask && (
            <StyledButtonGradientAddMetamask
              onClick={() => !addOriginalCurrency.success && addOriginalCurrency.addToken()}
            >
              <Trans>{!addOriginalCurrency.success ? 'Add to Metamask' : 'Added'}</Trans>
              <img src={MetamaskIcon} style={{ marginLeft: '10px' }} width="15" />
            </StyledButtonGradientAddMetamask>
          )}
        </>
      )}
    </AddressToMetamask>
  )
}
export const AddWrappedToMetamask = ({ token }: Props) => {
  const addCurrency = useAddTokenToMetamask({ ...token?.token, wrapped: token?.token } ?? undefined)
  const { provider } = useWeb3React()

  return (
    <>
      <AboutWrapping />
      <AddressToMetamask style={{ marginTop: 8 }}>
        {token.token?.address && (
          <>
            <>
              {/* <div>
                <Info onClick={toggleAbout} />
                <div>
                  <Trans>Wrapped {token?.ticker || 'Original token'}:</Trans>
                </div>
              </div> */}
              <div>
                <CopyAddress address={token?.token?.address ?? ''} />
              </div>
            </>
            {provider?.provider?.isMetaMask && (
              <StyledButtonGradientAddMetamask onClick={() => !addCurrency.success && addCurrency.addToken()}>
                <Trans>{!addCurrency.success ? 'Add to Metamask' : 'Added'}</Trans>
                <img src={MetamaskIcon} style={{ marginLeft: '10px' }} width="15" />
              </StyledButtonGradientAddMetamask>
            )}
          </>
        )}
      </AddressToMetamask>
    </>
  )
}
