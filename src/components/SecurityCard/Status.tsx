import React from 'react'
import { ReactComponent as IconClock } from 'assets/images/clock.svg'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import styled from 'styled-components'
import { AccreditationStatusEnum } from 'components/Vault/enum'
import { ReactComponent as Attention } from 'assets/images/attention.svg'

const StatusBox = styled(Box)`
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Status = ({ status }: { status: AccreditationStatusEnum }) => {
  return (
    <>
      {status === AccreditationStatusEnum.PENDING && (
        <StatusBox>
          <IconClock />
          <TYPE.status>
            <Trans>Passing KYC...</Trans>
          </TYPE.status>
        </StatusBox>
      )}
      {status === AccreditationStatusEnum.REJECTED && (
        <StatusBox>
          <Attention />
          <TYPE.status>
            <Trans>Rejected</Trans>
          </TYPE.status>
        </StatusBox>
      )}
    </>
  )
}
