import React, { FC } from 'react'
import { Flex } from 'rebass'
import { TYPE } from 'theme'
import styled from 'styled-components'
import { Trans, t } from '@lingui/macro'

import { useCurrency } from 'hooks/Tokens'
import { Document } from 'state/admin/actions'

import { Attachments } from 'components/PayoutItem/PreviewModal'
import CurrencyLogo from 'components/CurrencyLogo'

interface Props {
  type: string
  token: string
  attachments: Array<Document>
}

interface ItemProps {
  title: string
  content: string | JSX.Element
}

export const InfoBlock: FC<Props> = ({ type, token, attachments }) => {
  const currency = useCurrency(token ?? undefined)

  return (
    <Container>
      <Item title={`TYPE:`} content={<div style={{ textTransform: 'uppercase' }}>{type}</div>} />
      {currency && (
        <Item
          title={`PAYOUT TOKEN:`}
          content={
            <>
              <CurrencyLogo currency={currency} style={{ marginRight: 4 }} size="24px" />
              {currency.symbol}
            </>
          }
        />
      )}
      {Boolean(attachments.length) && (
        <Item title={`ATTACHMENTS:`} content={<Attachments attachments={attachments} />} />
      )}
    </Container>
  )
}

const Item: FC<ItemProps> = ({ title, content }) => {
  return (
    <Flex>
      <TYPE.titleSmall marginRight="12px">
        <Trans>{title}</Trans>
      </TYPE.titleSmall>
      <Content>{content}</Content>
    </Flex>
  )
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`

const Content = styled(Flex)`
  color: ${({ theme }) => theme.text2};
  font-size: 18px;
  line-height: 27px;
  font-weight: 600;
  align-items: center;
`
