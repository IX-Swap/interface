import { Trans } from '@lingui/macro'
import React, { FC, useState, useCallback } from 'react'

import { ButtonGradientBorder, ButtonIXSGradient, ButtonOutlined, PinnedContentButton } from 'components/Button'
import Column from 'components/Column'
import { TYPE } from 'theme'

import { FormCard, PageLink, KYCStatusIcons } from './styleds'
import { Box } from 'rebass'
import { useLocalization } from 'i18n'

interface KYCProgressTopic {
  title: string
  href: string
  passed?: boolean
  failed?: boolean
}

interface Props {
  topics: KYCProgressTopic[]
  reasons: string[]
  description: string | null
  disabled?: boolean
  handleSubmit?: (e: any) => void
  handleSaveProgress?: (e: any) => void
  isKycV2?: boolean
}

export const KYCProgressBar: FC<Props> = ({
  description,
  topics,
  disabled,
  handleSubmit,
  handleSaveProgress,
  isKycV2,
}: Props) => {
  const [activeTopic, setActiveTopic] = useState<number>(0)
  const { t } = useLocalization()

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
        <TYPE.title6 fontSize={'18px'} fontWeight={'700'} marginBottom="16px" paddingX="24px">
          {t('kyc.progress')}
        </TYPE.title6>

        <Column>
          {topics.map(
            ({ title, href, passed, failed }, index) =>
              title && (
                <PageLink
                  onClick={() => handleScrollToDiv(href, index)}
                  active={index === activeTopic}
                  key={`page-nav-${index}`}
                >
                  {title}
                  {passed && KYCStatusIcons.approved()}
                  {failed && KYCStatusIcons.rejected()}
                </PageLink>
              )
          )}
        </Column>
        {!isKycV2 && (
          <Box style={{ padding: '0px 20px' }}>
            <PinnedContentButton
              onClick={handleSubmit}
              disabled={disabled}
              type="submit"
              data-testid="submitButton"
              style={{ width: '100%' }}
              marginY="24px"
            >
              Submit form
            </PinnedContentButton>
            <ButtonOutlined style={{ width: '100%' }} onClick={handleSaveProgress}>
              Save Progress
            </ButtonOutlined>
          </Box>
        )}
      </FormCard>

      {/* <ButtonIXSGradient
        onClick={handleSubmit}
        disabled={disabled}
        type="submit"
        data-testid="submitButton"
        style={{ width: '100%' }}
        marginY="24px"
      >
        Submit form
      </ButtonIXSGradient> */}
    </div>
  )
}
