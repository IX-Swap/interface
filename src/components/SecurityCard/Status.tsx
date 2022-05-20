import React from 'react'
import { ReactComponent as IconClock } from 'assets/images/clock.svg'
import { Box } from 'rebass'
import { Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import styled from 'styled-components'
import {
  AccreditationStatusEnum,
  ERROR_ACCREDITATION_STATUSES,
  PENDING_ACCREDITATION_STATUSES,
} from 'components/Vault/enum'
import { ReactComponent as Attention } from 'assets/images/attention.svg'

const StatusBox = styled(Box)`
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`
interface Props {
  brokerDealerStatus: string
  custodianStatus: string
}

export const Status = ({ brokerDealerStatus, custodianStatus }: Props) => {
  const statuses = [custodianStatus, brokerDealerStatus]
  return (
    <>
      {PENDING_ACCREDITATION_STATUSES.some((status) => statuses.includes(status)) && (
        <StatusBox>
          <IconClock />
          <TYPE.status>
            <Trans>Passing KYC...</Trans>
          </TYPE.status>
        </StatusBox>
      )}
      {ERROR_ACCREDITATION_STATUSES.some((status) => statuses.includes(status)) && (
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
