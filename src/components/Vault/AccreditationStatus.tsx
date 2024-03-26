import React, { useCallback } from 'react'
import { Box } from 'rebass'
import { t, Trans } from '@lingui/macro'

import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowBetween, RowCenter, RowStart } from 'components/Row'
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
          text: `Rejected`,
        }
      case AccreditationStatusEnum.FAILED:
        return {
          color: 'error',
          text: `Failed`,
        }
      case AccreditationStatusEnum.APPROVED:
        return {
          color: 'green1',
          text: `Passed`,
        }
      case AccreditationStatusEnum.PENDING:
      default:
        return {
          color: 'text1',
          text: `Passing accreditation`,
          icon: <LoaderThin size={20} />,
        }
    }
  }, [])

  return (
    <Column style={{ marginTop: '28px', order: statuses.includes(AccreditationStatusEnum.DECLINED) ? 2 : 3 }}>
      <RowStart style={{ border: '1px solid #E6E6FF', padding: '8px' }}>
        <TYPE.title10>
          <Trans>Broker - Dealer:</Trans>
        </TYPE.title10>
        <Box marginLeft="13px" display="flex" alignItems="center">
          <TYPE.body3><Trans>{getStatusInfo(brokerDealerStatus).text}</Trans></TYPE.body3>
          {getStatusInfo(brokerDealerStatus).icon && (
            <Box marginLeft="9px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{getStatusInfo(brokerDealerStatus).icon}</IconWrapper>
            </Box>
          )}
        </Box>
      </RowStart>
      <RowStart style={{ border: '1px solid #E6E6FF', padding: '8px', marginTop: '16px' }}>
        <TYPE.title10>
          <Trans>Custodian:</Trans>
        </TYPE.title10>
        <Box marginLeft="13px" display="flex" alignItems="center">
          <TYPE.body3><Trans>{getStatusInfo(custodianStatus).text}</Trans></TYPE.body3>
          {getStatusInfo(custodianStatus).icon && (
            <Box marginLeft="9px" display="flex" justifyContent="center">
              <IconWrapper size={20}>{getStatusInfo(custodianStatus).icon}</IconWrapper>
            </Box>
          )}
        </Box>
      </RowStart>
      {message && needReason && (
        <RowCenter style={{ border: '1px solid #E6E6FF', padding: '8px', marginTop: '16px' }} flexWrap="wrap">
          <TYPE.title10 color="error">
            <Trans>Reason:</Trans>
          </TYPE.title10>
          <Box marginLeft="13px" display="flex" alignItems="center">
            <TYPE.body3>{message}</TYPE.body3>
          </Box>
        </RowCenter>
      )}
    </Column>
  )
}
