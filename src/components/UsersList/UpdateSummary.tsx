import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { MEDIA_WIDTHS, ModalBlurWrapper } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { CopyAddress } from 'components/CopyAddress'
import { ROLES, ROLES_LABEL } from 'constants/roles'
import checkIcon from 'assets/images/check-success.svg'
import notCheckIcon from 'assets/images/reject.svg'
// import closeIcon from 'assets/images/cross.svg'
import { CloseIcon } from '../../theme'

import { Option } from './TokensBlock'

const Header = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 22px;
  line-height: 33px;
  padding: 20px 0px;
  color: ${({ theme }) => theme.text1};
  gap: 16px;

  > :first-child {
    flex: 1;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    font-size: 16px;
  }
`

const LabelContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.text9};
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const SummaryContainer = styled.div`
  padding: 24px;
  border: 1px solid #e6e6ff;
  border-radius: 6px;

  > div {
    padding: 16px;
    border-radius: 20px;
    min-width: 500px;
    width: 100%;

    @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      min-width: 100%;
    }
  }
`

const SummaryContent = styled.div`
  display: grid;
  // grid-template-columns: minmax(145px, auto) 1fr;
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
  margin-bottom: 15px;
`

const TokenList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`

const Token = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e6e6ff;
  column-gap: 4px;
  border-radius: 6px;
  padding: 10px;
`

interface Props {
  item: { ethAddress: string; role: string; isWhitelisted: boolean; username: string; managerOf: Option[] }
  close: () => void
}

export const UpdateSummary = ({ item, close }: Props) => {
  const { role, isWhitelisted, username, ethAddress, managerOf } = item

  return (
    <RedesignedWideModal isOpen onDismiss={close}>
      <ModalBlurWrapper
        data-testid="remove-tokens-for-manager "
        style={{ maxWidth: '600px', minWidth: '320px', width: '100%', position: 'relative' }}
      >
        <CloseIcon style={{ position: 'absolute', right: '30px', top: '30px' }} data-testid="cross" onClick={close} />
        <Header>
          <div>
            <Trans>
              Information has <br /> been updated
            </Trans>
          </div>
          {/* <img
            src={closeIcon}
            alt="closeIcon"
            onClick={close}
            style={{ cursor: 'pointer' }}
            width="20px"
            height="20px"
            color="red"
          /> */}
        </Header>
        <SummaryContainer>
          <div>
            <SummaryContent>
              <LabelContainer>
                <Label>Wallet Address:</Label>
                <CopyAddress address={ethAddress} />
              </LabelContainer>

              <LabelContainer>
                <Label>Name:</Label>
                {username}
              </LabelContainer>

              <LabelContainer>
                <Label>{`User's Role:`}</Label>
                {ROLES_LABEL[role]}
              </LabelContainer>

              <LabelContainer>
                <Label>Whitelisted:</Label>
                <img src={isWhitelisted ? checkIcon : notCheckIcon} alt="is-whitelisted" />
              </LabelContainer>

              {role === ROLES.TOKEN_MANAGER && (
                <LabelContainer style={{ border: 'none', whiteSpace: 'pre' }}>
                  <Label>{`Managed Tokens:`}</Label>
                  <TokenList>
                    {managerOf.map(({ icon, label }) => (
                      <Token key={label}>
                        {icon}
                        {label}
                      </Token>
                    ))}
                  </TokenList>
                </LabelContainer>
              )}
            </SummaryContent>
          </div>
        </SummaryContainer>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

export default UpdateSummary
