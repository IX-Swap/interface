import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Search, Copy, Plus } from 'react-feather'

import MetamaskIcon from 'assets/images/metamask.png'

import { IconButton, Row } from 'components/LaunchpadOffer/styled'

import { shortenAddress } from 'utils'

import { Offer } from 'state/launchpad/types'
import { useAddPopup } from 'state/application/hooks'

import { NETWORK_NAMES, CHAIN_INFO } from 'constants/chains'

interface Props {
  offer: Offer
}

export const OfferLinks: React.FC<Props> = (props) => {
  const theme = useTheme()
  const addPopup = useAddPopup()
  
  const networkLogoUrl = React.useMemo(() => {
    const network = props.offer.network
    const networkId = Object.entries(NETWORK_NAMES).find(([id, name]) => name === network)?.[0]

    if (!networkId) {
      return null
    }

    return CHAIN_INFO[Number(networkId)].logoUrl
  }, [])

  const copyAddress = React.useCallback(async () => {
    await navigator.clipboard.writeText(props.offer.tokenAddress)

    addPopup({ info: { success: true, summary: 'Copied to clipboard' } })
  }, [])

  return (
    <Row alignItems="stretch" gap="1rem" height="36px">
      <OfferLink>
        {networkLogoUrl && <img src={networkLogoUrl} width="20" />}
      </OfferLink>

      <OfferLink>
        <Search size="18" color={theme.launchpad.colors.text.bodyAlt} />
      </OfferLink>

      <OfferLink>
        <Plus size="12" color={theme.launchpad.colors.text.bodyAlt} />
        <img src={MetamaskIcon} width="20" />
      </OfferLink>

      <OfferLink grow>
        {shortenAddress(props.offer.tokenAddress, 8)}

        <IconButton onClick={copyAddress}>
          <Copy stroke={theme.launchpad.colors.text.body} size="18" />
        </IconButton>
      </OfferLink>
    </Row>
  )
}

const OfferLink = styled.div<{ grow?: boolean }>`
  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  align-items: center;

  ${props => props.grow ? 'flex-grow: 1;' : 'width: 60px;'}

  gap: 0.5rem;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;


  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
