import React, { FC } from 'react'
import { Box, Flex } from 'rebass'
import { t, Trans } from '@lingui/macro'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonGradientBorder, ButtonPrimary, ButtonText } from 'components/Button'
import CurrencyLogo from 'components/CurrencyLogo'
import { ReadMore } from 'components/ReadMore'
import Column from 'components/Column'
import { TYPE } from 'theme'
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
    history.push(routes.securityTokens('payout-events'))
  }

  return (
    <Column style={{ gap: '32px' }}>
      <Flex justifyContent="space-between">
        <Flex>
          <ButtonText height="fit-content" marginTop="16px" marginRight="16px" onClick={goBack}>
            <ArrowLeft fill="white !important" />
          </ButtonText>
          <CurrencyLogo currency={new WrappedTokenInfo(secToken)} size="52px" />
          <Box marginLeft="16px">
            <TYPE.title4>
              <Trans>{title}</Trans>
            </TYPE.title4>
            <SecTokenLink to={routes.securityToken(secToken.catalogId)}>
              {secToken.originalSymbol ?? secToken.symbol}
            </SecTokenLink>
          </Box>
        </Flex>

        <Flex marginTop="16px">
          {isMyPayout && <EditButton>Edit</EditButton>}
          <PayoutStatus status={status} />
        </Flex>
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

const SecTokenLink = styled(NavLink)`
  font-size: 18px;
  line-height: 27px;
  text-decoration: underline;
  color: #fff;
`

const EditButton = styled(ButtonGradientBorder)`
  min-height: 32px;
  max-height: 32px;
  padding: 8px 24px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  margin-right: 24px;
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
`

export const ReadMoreContainer = styled.div`
  * {
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.text2};
  }
`
