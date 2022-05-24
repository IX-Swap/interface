import { Trans } from '@lingui/macro'
import React, { FC, useState, useCallback } from 'react'

import { ButtonIXSGradient } from 'components/Button'
import Column from 'components/Column'
import { TYPE } from 'theme'
import { ReactComponent as Passed } from 'assets/images/check-success.svg'

import { FormCard, PageLink } from './styleds'

interface Props {
  topics: any[]
  reasons: string[]
  description: string | null
  disabled?: boolean
  handleSubmit?: (e: any) => void
}

export const KYCProgressBar: FC<Props> = ({ description, topics, disabled, handleSubmit }: Props) => {
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
          <TYPE.title6 fontSize={15} marginBottom="16px" style={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }} color={'bg14'}>
            <Trans>Reason of changes requested</Trans>
          </TYPE.title6>

          <TYPE.body3 marginBottom="16px" opacity="0.5">
            {description}
          </TYPE.body3>

          {/* <Ul style={{ paddingLeft: 32 }}>
          {reasons.map((reason) => (
            <Li key={`reason-${reason}`}>
              <TYPE.body1 lineHeight="16px">{reason}</TYPE.body1>
            </Li>
          ))}
        </Ul> */}
        </FormCard>
      )}

      <FormCard style={{ padding: '24px 0px' }}>
        <TYPE.title6 marginBottom="16px" paddingX="24px" style={{ textTransform: 'uppercase' }}>
          Progress
        </TYPE.title6>

        <Column>
          {topics.map(
            ({ title, href, passed }, index) =>
              title && (
                <PageLink
                  onClick={() => handleScrollToDiv(href, index)}
                  active={index === activeTopic}
                  key={`page-nav-${index}`}
                >
                  {title}
                  {passed && <Passed />}
                </PageLink>
              )
          )}
        </Column>
      </FormCard>

      <ButtonIXSGradient
        onClick={handleSubmit}
        disabled={disabled}
        type="submit"
        style={{ width: '100%' }}
        marginY="24px"
      >
        Submit form
      </ButtonIXSGradient>
      {/* <ButtonGradientBorder disabled style={{ width: '100%' }}>
        Save Progress
      </ButtonGradientBorder> */}
    </div>
  )
}
