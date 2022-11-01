import React, { FC } from 'react'
import { Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonGradientBorder, ButtonPrimary, ButtonText } from 'components/Button'
import CurrencyLogo from 'components/CurrencyLogo'
import { ReadMore } from 'components/ReadMore'
import Column from 'components/Column'
import { ellipsisText, MEDIA_WIDTHS, TYPE } from 'theme'
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-back.svg'
import { PAYOUT_STATUS } from 'constants/enums'
import { routes } from 'utils/routes'
import { PayoutEvent } from 'state/token-manager/types'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { capitalizeFirstLetter } from 'components/AdminAccreditationTable/utils'

import { useStatusButtonInfo } from './utils'
import { InfoBlock } from './InfoBlock'

interface Props {
  payout: PayoutEvent
  isMyPayout: boolean
}

export const PayoutHeader: FC<Props> = ({ payout, isMyPayout }) => {
  const { secToken, payoutToken, description, status, type, attachments, title, otherType } = payout
  const history = useHistory()

  const goBack = () => {
    history.push(isMyPayout ? '/token-manager/payout-events' : routes.securityTokens('payout-events'))
  }

  const edit = () => {
    history.push(`/payout/edit/${payout.id}`)
  }

  return (
    <Column style={{ gap: '32px' }}>
      <Flex>
        <BackContainer>
          <ButtonText height="fit-content" onClick={goBack}>
            <ArrowLeft fill="white !important" />
          </ButtonText>
        </BackContainer>
        <TitleContainer>
          <TitleContent>
            <LogoContainer>
              <CurrencyLogo currency={new WrappedTokenInfo(secToken)} size="52px" />
            </LogoContainer>
            <Title>
              <Trans>{title}</Trans>
            </Title>
          </TitleContent>

          <SecTokenLink to={routes.securityToken(secToken.catalogId)}>
            {secToken.originalSymbol ?? secToken.symbol}
          </SecTokenLink>

          <StatusAndEdit>
            {isMyPayout && status !== PAYOUT_STATUS.ENDED && <EditButton onClick={edit}>Edit</EditButton>}
            <PayoutStatus status={status} />
          </StatusAndEdit>
        </TitleContainer>
      </Flex>

      <ReadMoreContainer>
        <ReadMore more={t`Read More`} less={t`Show Less`} lines={8}>
          {description}
        </ReadMore>
      </ReadMoreContainer>

      <InfoBlock
        type={capitalizeFirstLetter(type === 'other' ? otherType : type)}
        token={payoutToken}
        attachments={attachments}
      />
    </Column>
  )
}

export const PayoutStatus: FC<{ status: PAYOUT_STATUS }> = ({ status }) => {
  const { title, backgroundColor, color, borderColor } = useStatusButtonInfo(status)

  return (
    <Status backgroundColor={backgroundColor} color={color} borderColor={borderColor}>
      {title}
    </Status>
  )
}

const TitleContent = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: ${MEDIA_WIDTHS.upToSmall + 1}px) {
    flex: 1;
  }
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
    align-items: flex-start;
  }
`

const LogoContainer = styled.div`
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: flex;
    align-items: center;
    height: 42px;
    > img,
    svg {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
    }
  }
`

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  margin-right: 16px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    height: 42px;
  }
`

const StatusAndEdit = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  order: 2;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    order: 3;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  row-gap: 2px;
  > * {
    align-self: center;
  }
`

const Title = styled(TYPE.title4)`
  margin-left: 4px !important;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 28px !important;
    line-height: 42px !important;
  }
`

const SecTokenLink = styled(NavLink)`
  font-size: 18px;
  line-height: 27px;
  text-decoration: underline;
  flex: 1;
  color: ${({ theme }) => theme.text1};
  order: 3;
  @media (min-width: ${MEDIA_WIDTHS.upToSmall + 1}px) {
    margin-left: 52px;
    min-width: 100%;
  }

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    order: 2;
  }
`

const EditButton = styled(ButtonGradientBorder)`
  min-height: 32px;
  max-height: 32px;
  padding: 8px 24px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  border-radius: 40px;

  :before {
    padding: 1px;
  }
`

const Status = styled(ButtonPrimary)<{ backgroundColor: string; color: string; borderColor: string | null }>`
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  border: ${({ borderColor }) => (borderColor ? `1px solid ${borderColor}` : 'none')};
  min-height: 32px;
  max-height: 32px;
  padding: 8px 16px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  pointer-events: none;
  border-radius: 40px;
  width: auto;
  margin-left: 16px;
`

export const ReadMoreContainer = styled.div`
  * {
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.text2};
  }
`
