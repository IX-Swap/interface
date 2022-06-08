import React, { FC } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'

import CurrencyLogo from 'components/CurrencyLogo'
import { ButtonGradient } from 'components/Button'

import { TYPE } from 'theme'
import { ReactComponent as PdfImage } from 'assets/images/pdf.svg'

interface Props {
  type: string
  token: any
  attachments: any[] // temporary 'any'
}

interface ItemProps {
  title: string
  content: string | JSX.Element
}

export const InfoBlock: FC<Props> = ({ type, token }) => {
  return (
    <Flex alignItems="start" justifyContent="space-between">
      <Item title={t`TYPE:`} content={type} />
      <Item
        title={t`PAYOUT TOKEN:`}
        content={
          <>
            <CurrencyLogo style={{ marginRight: 4 }} size="24px" />
            {token.name}
          </>
        }
      />
      <Item
        title={t`ATTACHMENTS:`}
        content={
          <AttachmentsButton>
            <Trans>View Files</Trans>
            <PdfIcon />
          </AttachmentsButton>
        }
      />
    </Flex>
  )
}

const Item: FC<ItemProps> = ({ title, content }) => {
  return (
    <Flex>
      <TYPE.titleSmall marginRight="12px">{title}</TYPE.titleSmall>
      <Content>{content}</Content>
    </Flex>
  )
}

const Content = styled(Flex)`
  color: ${({ theme }) => theme.text2};
  font-size: 18px;
  line-height: 27px;
  font-weight: 600;
  align-items: center;
`

const AttachmentsButton = styled(ButtonGradient)`
  font-size: 13px;
  line-height: 20px;
  border-radius: 32px;
  padding: 4px 12px;
`

const PdfIcon = styled(PdfImage)`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`
