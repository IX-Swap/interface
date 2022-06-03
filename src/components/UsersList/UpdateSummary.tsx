import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import useCopyClipboard from 'hooks/useCopyClipboard'
import { MEDIA_WIDTHS, ModalBlurWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { User } from 'state/admin/actions'
import { CopyAddress } from 'components/CopyAddress'
import { ROLES, ROLES_LABEL } from 'constants/roles'
import checkIcon from 'assets/images/check-success.svg'
import notCheckIcon from 'assets/images/reject.svg'
import closeIcon from 'assets/images/cross.svg'

interface Props {
  item: User
  close: () => void
}

export const UpdateSummary = ({ item, close }: Props) => {
  const [copied, setCopied] = useCopyClipboard()

  const { role, isWhitelisted, username, ethAddress, managerOf } = item

  return (
    <RedesignedWideModal isOpen onDismiss={close}>
      <ModalBlurWrapper
        data-testid="remove-tokens-for-manager "
        style={{ maxWidth: '612px', minWidth: '320px', width: '100%', position: 'relative' }}
      >
        <Header>
          <div>
            <Trans>Information has been updated</Trans>
          </div>
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={close}
            style={{ cursor: 'pointer' }}
            width="20px"
            height="20px"
          />
        </Header>
        <SummaryContainer>
          <div>
            <SummaryTitle>
              <Trans>Summary:</Trans>
            </SummaryTitle>
            <SummaryContent>
              <Label>Wallet Address:</Label>
              <CopyAddress address={ethAddress} copied={copied} setCopied={setCopied} />

              <Label>Name:</Label>
              {username}

              <Label>{`User's Role:`}</Label>
              {ROLES_LABEL[role]}

              <Label>Whitelisted:</Label>
              <img src={isWhitelisted ? checkIcon : notCheckIcon} alt="is-whitelisted" />

              {role === ROLES.TOKEN_MANAGER && (
                <>
                  <Label>{`User's Role:`}</Label>
                  <TokenList>
                    {managerOf.map(({ icon, label }) => (
                      <Token key={label}>
                        {icon}
                        {label}
                      </Token>
                    ))}
                  </TokenList>
                </>
              )}
            </SummaryContent>
          </div>
        </SummaryContainer>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Header = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  padding: 20px 32px 12px;
  color: ${({ theme }) => theme.green1};
  background: ${({ theme }) => theme.bgG4};
  border-radius: 20px 20px 0px 0px;
  gap: 16px;
  > :first-child {
    flex: 1;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: 16px;
  }
`

const SummaryContainer = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.bg11};
  border-radius: 0px 0px 20px 20px;
  > div {
    padding: 16px;
    background: ${({ theme }) => theme.bgG4};
    border-radius: 20px;
    min-width: 500px;
    width: 100%;
    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      min-width: 100%;
    }
  }
`

const SummaryTitle = styled.div`
  color: ${({ theme }) => theme.text2};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(237, 206, 255, 0.5);
  margin-bottom: 12px;
`

const SummaryContent = styled.div`
  display: grid;
  grid-template-columns: minmax(145px, auto) 1fr;
  row-gap: 8px;
  column-gap: 40px;
  @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    grid-template-columns: 1fr;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.text2};
  opacity: 0.5;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const TokenList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Token = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`
