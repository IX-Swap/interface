import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import { ManagedOffer } from 'state/launchpad/types'
import { DropdownField } from '../IssuanceForm/shared/fields/DropdownField'
import { shortenAddress } from 'utils'
import { Copy, Edit3, CheckCircle } from 'react-feather'
import { KEY_OFFER_STATUSES, OFFER_STATUSES } from '../utils/constants'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { ReactComponent as HelpIcon } from 'assets/launchpad/svg/help-icon.svg'
import { ContactFormModal } from '../utils/ContactFormModal'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { nameChainMap, SupportedChainId } from 'constants/chains'
import { DiscreteInternalLink, DiscreteExternalLink } from 'theme'
import { text10, text8 } from 'components/LaunchpadMisc/typography'
import { useActiveWeb3React } from 'hooks/web3'

interface Props {
  offer: ManagedOffer
  stage?: string
  setStage: any
}

export const HeaderButtons = ({ offer, stage, setStage }: Props) => {
  const { status, tokenAddress, issuanceId, network, hasPresale } = offer

  const theme = useTheme()
  const [isCopied, setCopied] = useCopyClipboard()
  const [contactFormOpen, setContactFormOpen] = React.useState<boolean>(false)

  const onChooseStage = (_: string, value?: string) => {
    setStage(value)
  }
  const stageOptions = useMemo(() => {
    const statuses = hasPresale ? KEY_OFFER_STATUSES : KEY_OFFER_STATUSES.slice(2)
    const index = statuses.findIndex((item) => item === status)
    if (index < 0) return []
    const allowedStatuses = statuses.slice(0, index + 1)
    return allowedStatuses.map((status: string) => ({
      value: status,
      label: OFFER_STATUSES[status as keyof typeof OFFER_STATUSES] as string,
    }))
  }, [status, hasPresale])
  const onCopy = () => {
    setCopied(tokenAddress)
  }
  const { chainId } = useActiveWeb3React()
  const explorerLink = useMemo(() => {
    const nameChainMapNetwork = chainId === SupportedChainId.MUMBAI ? SupportedChainId.MUMBAI : nameChainMap[network]
    return getExplorerLink(nameChainMapNetwork, tokenAddress, ExplorerDataType.TOKEN)
  }, [network, tokenAddress])
  const editLink = useMemo(() => `/issuance/edit/information?id=${issuanceId}`, [issuanceId])

  return (
    <Header>
      <HeaderItem>
        <DropdownField
          field="stage"
          setter={onChooseStage}
          label=""
          options={stageOptions}
          value={stage}
          wrapperStyle={{
            padding: '0',
            cursor: 'pointer',
          }}
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
            width: '180px',
            paddingLeft: '12px',
          }}
        />
        <BtnContainer onClick={onCopy}>
          {shortenAddress(tokenAddress, 5)}
          {!isCopied && <Copy stroke={theme.launchpad.colors.text.body} size="18" />}
          {isCopied && <CheckCircle stroke={theme.launchpad.colors.text.body} size="18" />}
        </BtnContainer>
        <BtnContainer as={DiscreteExternalLink} href={explorerLink}>
          Explorer
        </BtnContainer>
      </HeaderItem>

      <HeaderItem gap="32px">
        <RightBtn mr="12px" as={DiscreteInternalLink} to={editLink}>
          <Edit3 size={12} color={theme.launchpad.colors.text.bodyAlt} />
          <span>Edit</span>
        </RightBtn>
        <RightBtn onClick={() => setContactFormOpen(true)} mr="6px">
          <HelpIcon color={theme.launchpad.colors.text.bodyAlt} />
          <span>Support</span>
        </RightBtn>
      </HeaderItem>

      <ContactFormModal open={contactFormOpen} closeForm={() => setContactFormOpen(false)} offerId={offer.id} />
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22px 0 16px;
`
const HeaderItem = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap || '16px'};
`
const BtnContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  ${text10}
  color: ${(props) => props.theme.launchpad.colors.text.title};

  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  .label {
    color: ${(props) => props.theme.launchpad.colors.text.body};
    margin-right: 0.5rem;
  }

  svg,
  img {
    margin-left: 0.5rem;
  }

  padding: 10px 0;
  width: 180px;
  height: 40px;
  cursor: pointer;
  position: relative;
`
const RightBtn = styled.div<{ mr: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  > svg {
    margin-right: ${(props) => props.mr};
  }
  > span {
    ${text8}
    color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  }
`
