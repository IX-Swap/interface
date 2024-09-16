import React, { FC } from 'react'
import { Flex } from 'rebass'
import { TYPE } from 'theme'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useCurrency } from 'hooks/Tokens'
import { Document } from 'state/admin/actions'

import { Attachments } from 'components/PayoutItem/PreviewModal'
import CurrencyLogo from 'components/CurrencyLogo'
import { Divider } from '@mui/material'

interface Props {
  type: string
  token: string
  attachments: Array<Document>
}

interface ItemProps {
  title: string
  content?: string | JSX.Element
}

export const InfoBlock: FC<Props> = ({ type, token, attachments }) => {
  const currency = useCurrency(token ?? undefined)

  return (
    <Container>
      <Item title={`Type`} content={type} />
      {currency && (
        <>
          <Divider />
          <Item
            title={`Payout Token`}
            content={
              <>
                <CurrencyLogo currency={currency} style={{ marginRight: 4 }} size="24px" />
                {currency.symbol}
              </>
            }
          />
        </>
      )}
      {Boolean(attachments.length) && (
        <>
          <Divider />
          <Item title={`Attachment`} />
          <Attachments attachments={attachments} />
        </>
      )}
    </Container>
  )
}

const Item: FC<ItemProps> = ({ title, content }) => {
  return (
    <Flex justifyContent='space-between'>
      <TYPE.body3>
        <Trans>{title}</Trans>
      </TYPE.body3>
      {content ? <Content>{content}</Content> : null}
    </Flex>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Content = styled(Flex)`
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  font-weight: 500;
  align-items: center;
`
