import React, { FC } from 'react'
import { Flex, Box } from 'rebass'
import { Trans, t } from '@lingui/macro'

import { PAYOUT_STATUS } from '..'
import { Container, StyledButtonIXSGradient } from './styleds'

interface Props {
  status: PAYOUT_STATUS
}

export const UserView: FC<Props> = ({ status }) => {
  const isNotAccredited = false
  const isNotTokenHolder = true

  if (status === PAYOUT_STATUS.ENDED) return <PayoutEnded />
  if (isNotAccredited) return <NotAccreditedView />
  if (isNotTokenHolder) return <NotTokenHoldersView status={status} />

  return <>User View</>
}

const NotTokenHoldersView: FC<{ status: PAYOUT_STATUS }> = ({ status }) => {
  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.ANNOUNCED:
        return (
          <>
            <Box marginBottom="4px">{t`No SEC tokens detected.`}</Box>
            <Box marginBottom="24px">{t`You need SEC tokens to be eligible for this payout.`}</Box>
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Flex marginBottom="4px">
              <Trans>
                This payout event is <strong style={{ marginLeft: '4px', color: '#ED0376' }}>delayed.</strong>
              </Trans>
            </Flex>
            <Box marginBottom="24px">{t`You have no pending payout as you have 0 SEC tokens as of record date.`}</Box>
          </>
        )
      default:
        return (
          <>
            <Box marginBottom="4px">{t`Payout unavailable.`}</Box>
            <Box marginBottom="24px">{t`You have 0 SEC tokens as of record date.`}</Box>
          </>
        )
    }
  }
  return (
    <Container>
      {getContentByStatus()}
      <StyledButtonIXSGradient>{t`Buy Now`}</StyledButtonIXSGradient>
    </Container>
  )
}

const NotAccreditedView: FC = () => {
  return (
    <Container>
      <Box marginBottom="24px">{t`You need to pass KYC and get accredited to be eligible for this payout.`}</Box>
      <StyledButtonIXSGradient>{t`Pass Accreditation`}</StyledButtonIXSGradient>
    </Container>
  )
}

const PayoutEnded: FC = () => (
  <Container>
    <Flex>
      <Trans>
        This payout event is <strong style={{ marginLeft: '4px' }}>ended.</strong>
      </Trans>
    </Flex>
  </Container>
)
