import React, { useCallback } from 'react'
import { Box } from 'rebass'
import { t, Trans } from '@lingui/macro'

import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import { TYPE } from 'theme'

import { AccreditationStatusEnum } from './enum'
import { StatusTitle } from './styleds'
import Column from 'components/Column'

interface Props {
  brokerDealerStatus: string
  custodianStatus: string
  message: string
}

export const AccreditationStatus = ({ brokerDealerStatus, custodianStatus, message }: Props) => {
  const statuses = [brokerDealerStatus, custodianStatus]

  const needReason = [AccreditationStatusEnum.DECLINED, AccreditationStatusEnum.FAILED].some((status) =>
    statuses.includes(status)
  )

  const getStatusInfo = useCallback((status: string) => {
    switch (status) {
      case AccreditationStatusEnum.DECLINED:
        return {
          color: 'error',
          text: t`Rejected`,
        }
      case AccreditationStatusEnum.FAILED:
        return {
          color: 'error',
          text: t`Failed`,
        }
      case AccreditationStatusEnum.APPROVED:
        return {
          color: 'green1',
          text: t`Passed`,
        }
      case AccreditationStatusEnum.PENDING:
      default:
        return {
          color: 'text1',
          text: t`Passing accreditation`,
          icon: <LoaderThin size={20} />,
        }
    }
  }, [])

  return (
    <Column style={{ marginTop: '28px', order: statuses.includes(AccreditationStatusEnum.DECLINED) ? 2 : 3 }}>
      <RowCenter flexWrap="wrap">
        <StatusTitle>
          <Trans>Broker - dealer:</Trans>
        </StatusTitle>
        <Box marginLeft="13px" display="flex" alignItems="center">
          <TYPE.titleSmall color={getStatusInfo(brokerDealerStatus).color}>
            {getStatusInfo(brokerDealerStatus).text}
          </TYPE.titleSmall>
          {getStatusInfo(brokerDealerStatus).icon && (
            <Box marginLeft="9px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{getStatusInfo(brokerDealerStatus).icon}</IconWrapper>
            </Box>
          )}
        </Box>
      </RowCenter>
      <RowCenter flexWrap="wrap">
        <StatusTitle>
          <Trans>Custodian:</Trans>
        </StatusTitle>
        <Box marginLeft="13px" display="flex" alignItems="center">
          <TYPE.titleSmall color={getStatusInfo(custodianStatus).color}>
            {getStatusInfo(custodianStatus).text}
          </TYPE.titleSmall>
          {getStatusInfo(custodianStatus).icon && (
            <Box marginLeft="9px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{getStatusInfo(custodianStatus).icon}</IconWrapper>
            </Box>
          )}
        </Box>
      </RowCenter>
      {message && needReason && (
        <RowCenter flexWrap="wrap" marginTop="8px">
          <StatusTitle color="error">
            <Trans>Reason:</Trans>
          </StatusTitle>
          <Box marginLeft="13px" display="flex" alignItems="center">
            <TYPE.titleSmall>{message}</TYPE.titleSmall>
          </Box>
        </RowCenter>
      )}
    </Column>
  )
}
