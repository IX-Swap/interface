import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { ManagedOffer } from 'state/launchpad/types'
import { DropdownField } from '../IssuanceForm/shared/fields/DropdownField';
import { shortenAddress } from 'utils'
import { Copy, Edit3, CheckCircle } from 'react-feather';
import { KEY_OFFER_STATUSES, OFFER_STATUSES } from '../utils/constants';
import useCopyClipboard from 'hooks/useCopyClipboard';
import { useHistory, } from 'react-router-dom';
import { ReactComponent as HelpIcon } from 'assets/launchpad/svg/help-icon.svg'
import { ContactFormModal } from '../utils/ContactFormModal';

interface Props {
  offer: ManagedOffer;
}

export const HeaderButtons = ({ offer }: Props) => {
  const { status, tokenAddress, issuanceId } = offer;

  const theme = useTheme()
  const [isCopied, setCopied] = useCopyClipboard()
  const history = useHistory()

  const [stage, setStage] = useState<string | undefined>(status as string);
  const [contactFormOpen, setContactFormOpen] = React.useState<boolean>(false)

  const onChooseStage = (_: string, value?: string) => {
    setStage(value);
  }
  const stageOptions = useMemo(() => {
    const statuses = [...KEY_OFFER_STATUSES];
    const index = statuses.findIndex((item) => item === status);
    if (index < 0) return [];
    const allowedStatuses = statuses.slice(0, index + 1);
    return allowedStatuses.map((status: string) => ({ value: status, label: OFFER_STATUSES[status as keyof typeof OFFER_STATUSES] as string }));
  }, [status]);
  const onCopy = () => {
    setCopied(tokenAddress);
  }
  const onExplorer = () => {
    const address = `https://polygonscan.com/token/${tokenAddress}`;
    window.open(address, '_blank', 'noreferrer');
  }
  const onEdit = () => {
    history.push(`/issuance/create/information?id=${issuanceId}`);
  }

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
          }}
        />
        <BtnContainer onClick={onCopy}>
          {shortenAddress(tokenAddress, 5)}
          {!isCopied && <Copy stroke={theme.launchpad.colors.text.body} size="18" />}
          {isCopied && <CheckCircle stroke={theme.launchpad.colors.text.body} size="18" />}
        </BtnContainer>
        <BtnContainer onClick={onExplorer}>
          Explorer
        </BtnContainer>
      </HeaderItem>

      <HeaderItem gap="32px">
        <RightBtn onClick={onEdit} mr="12px">
          <Edit3 size={12} color={theme.launchpad.colors.text.bodyAlt} />
          <span>Edit</span>
        </RightBtn>
        <RightBtn onClick={() => setContactFormOpen(true)} mr="6px">
          <HelpIcon color={theme.launchpad.colors.text.bodyAlt} />
          <span>Support</span>
        </RightBtn>
      </HeaderItem>

      <ContactFormModal
        open={contactFormOpen}
        closeForm={() => setContactFormOpen(false)}
        offerId={offer.id}
      />
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 22px 0 16px;
`;
const HeaderItem = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap || "16px"};
`;
const BtnContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  .label {
    color: ${props => props.theme.launchpad.colors.text.body};
    margin-right: 0.5rem;
  }

  svg, img {
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
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.bodyAlt};
  }
`;