import React, { useCallback, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { Search, Copy, Plus } from 'react-feather'
import MetamaskIcon from 'assets/images/metamask.png'
import { IconButton, Row } from 'components/LaunchpadMisc/styled'
import { shortenAddress } from 'utils'
import { OfferNetwork } from 'state/launchpad/types'
import { useAddPopup } from 'state/application/hooks'
import { NETWORK_NAMES, CHAIN_INFO, SupportedChainId, nameChainMap } from 'constants/chains'
import useAddTokenByDetailsToMetamask from 'hooks/useAddTokenByDetailsToMetamask'
import { DiscreteExternalLink } from 'theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { text10 } from 'components/LaunchpadMisc/typography'
import { useActiveWeb3React } from 'hooks/web3'

interface Props {
  network: OfferNetwork
  address: string
  symbol: string
  decimals: number
}

export const OfferLinks: React.FC<Props> = ({ network, address, symbol, decimals }) => {
  const theme = useTheme()
  const addPopup = useAddPopup()

  const { chainId } = useActiveWeb3React()
  const nameChainMapNetwork = chainId === SupportedChainId.MUMBAI ? SupportedChainId.MUMBAI : nameChainMap[network]

  const networkLogoUrl = CHAIN_INFO[nameChainMapNetwork].logoUrl

  const explorerLink = useMemo(
    () => {
      return getExplorerLink(nameChainMapNetwork, address, ExplorerDataType.TOKEN)
    },
    
    [network, address, nameChainMapNetwork]
  )

  const copyAddress = useCallback(async () => {
    await navigator.clipboard.writeText(address)
    addPopup({ info: { success: true, summary: 'Copied to clipboard' } })
  }, [])
  const { addToken } = useAddTokenByDetailsToMetamask()

  const addToMetamask = () => {
    addToken({
      symbol,
      address,
      decimals,
    })
  }
  return (
    <Row alignItems="stretch" gap="1rem" height="36px">
      <OfferLink>{networkLogoUrl && <img src={networkLogoUrl} width="20" />}</OfferLink>

      <OfferLink
        as={DiscreteExternalLink}
        href={explorerLink}
      >
        <Search size="18" color={theme.launchpad.colors.text.bodyAlt} />
      </OfferLink>

      <OfferLink onClick={() => addToMetamask()}>
        <Plus size="12" color={theme.launchpad.colors.text.bodyAlt} />
        <img src={MetamaskIcon} width="20" />
      </OfferLink>

      <OfferLink grow onClick={copyAddress}>
        {shortenAddress(address, 8)}
        <IconButton>
          <Copy stroke={theme.launchpad.colors.text.body} size="18" />
        </IconButton>
      </OfferLink>
    </Row>
  )
}

const OfferLink = styled.div<{ grow?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  ${(props) => (props.grow ? 'flex-grow: 1;' : 'width: 60px;')}
  gap: 0.5rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
