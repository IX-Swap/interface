import React from 'react'
import { ReactComponent as IconClock } from 'assets/images/clock.svg'
import { ReactComponent as IconPassed } from 'assets/images/passed.svg'
import { Box } from 'rebass'
import { STOStatus } from './STOStatus'
import { Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import styled from 'styled-components'

const StatusBox = styled(Box)`
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Status = ({ status }: { status: STOStatus }) => {
  return (
    <>
      {status === STOStatus.PENDING && (
        <StatusBox>
          <IconClock />
          <TYPE.status>
            <Trans>Passing KYC...</Trans>
          </TYPE.status>
        </StatusBox>
      )}
      {status === STOStatus.PASSED && (
        <StatusBox>
          <IconPassed />
          <TYPE.status>
            <Trans>Approved</Trans>
          </TYPE.status>
        </StatusBox>
      )}
    </>
  )
}
