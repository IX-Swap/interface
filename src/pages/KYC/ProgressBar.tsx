import { Trans } from '@lingui/macro'
import React, { FC } from 'react'

import { ButtonGradientBorder, ButtonIXSGradient } from 'components/Button'
import Column from 'components/Column'
import { TYPE } from 'theme'
import { StatusIcons } from 'components/Vault/styleds'
import { ActionHistoryStatus } from 'components/Vault/enum'

import { FormCard, Ul, Li, PageLink } from './styleds'

interface Props {
  topics: any[]
  reasons: string[]
  description: string
}

export const ProgressBar: FC<Props> = ({ reasons, description, topics }: Props) => {
  const handleScrollToDiv = (href: string) => {
    document.getElementById(href)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <FormCard style={{ padding: 24 }}>
        <TYPE.title6 marginBottom="16px" style={{ textTransform: 'uppercase' }} color={'bg14'}>
          <Trans>Reason of reject</Trans>
        </TYPE.title6>

        <TYPE.body3 marginBottom="16px" opacity="0.5">
          {description}
        </TYPE.body3>

        <Ul style={{ paddingLeft: 32 }}>
          {reasons.map((reason) => (
            <Li key={`reason-${reason}`}>
              <TYPE.body1 lineHeight="16px">{reason}</TYPE.body1>
            </Li>
          ))}
        </Ul>
      </FormCard>

      <FormCard style={{ marginTop: 24, padding: '24px 0px' }}>
        <TYPE.title6 marginBottom="16px" paddingX="24px" style={{ textTransform: 'uppercase' }}>
          Progress
        </TYPE.title6>

        <Column>
          {topics.map(({ id, name, href, passed }) => (
            <PageLink onClick={() => handleScrollToDiv(href)} active={id === 1} key={`page-nav-${id}`}>
              {name}
              {passed && StatusIcons[ActionHistoryStatus.SETTLED]()}
            </PageLink>
          ))}
        </Column>
      </FormCard>

      <ButtonIXSGradient style={{ width: '100%' }} marginY="24px" disabled={true}>
        Submit form
      </ButtonIXSGradient>
      <ButtonGradientBorder style={{ width: '100%' }}>Submit Progress</ButtonGradientBorder>
    </>
  )
}
