import { Trans } from '@lingui/macro'
import React, { FC, useState, useCallback } from 'react'

import { ButtonGradientBorder, ButtonIXSGradient, ButtonOutlined, PinnedContentButton } from 'components/Button'
import Column from 'components/Column'
import { TYPE } from 'theme'

import styled from 'styled-components'

interface ProgressTopic {
  title: string
  href: string
  passed?: boolean
  failed?: boolean
}

interface Props {
  topics: ProgressTopic[]
  description: string | null
}

export const ProgressBar: FC<Props> = ({ description, topics }: Props) => {
  const [activeTopic, setActiveTopic] = useState<number>(0)

  const handleScrollToDiv = useCallback(
    (href: string, index: number) => {
      setActiveTopic(index)

      document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' })
    },
    [setActiveTopic]
  )

  return (
    <div>
      {description && (
        <FormCard style={{ padding: 24, marginBottom: 24 }}>
          <TYPE.title6
            fontSize={15}
            marginBottom="16px"
            style={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
            color={'bg14'}
          >
            <Trans>Reason of changes requested</Trans>
          </TYPE.title6>

          <TYPE.body3 marginBottom="16px" opacity="0.5">
            {description}
          </TYPE.body3>
        </FormCard>
      )}

      <FormCard style={{ padding: '24px 0px' }}>
        <TYPE.title6 fontSize={'18px'} fontWeight={'700'} marginBottom="16px" paddingX="24px">
          Progress
        </TYPE.title6>

        <Column>
          {topics.map(
            ({ title, href }, index) =>
              title && (
                <PageLink
                  onClick={() => handleScrollToDiv(href, index)}
                  active={index === activeTopic}
                  key={`page-nav-${index}`}
                >
                  {title}
                </PageLink>
              )
          )}
        </Column>

        <div style={{ padding: 24 }}>
          <PinnedContentButton type="submit" style={{ width: '100%', height: 48, fontSize: 14 }}>
            Submit
          </PinnedContentButton>
        </div>
      </FormCard>
    </div>
  )
}

export const FormCard = styled.div<{ filled?: boolean }>`
  background: ${({ theme }) => theme.bg0};
  border: ${({ filled, theme }) => `1px solid ${filled ? theme.success : 'transparent'}`};
  padding: 24px 24px 32px 24px;
  border-radius: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
  `};
`

export const PageLink = styled.div<{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0px;
  padding: 8px 16px 8px 24px;
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text11)};
  border-left: ${({ theme, active }) => (active ? `2px solid ${theme.bg26}` : 'none')};
  text-decoration: none;
`
