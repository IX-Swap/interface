import { t, Trans } from '@lingui/macro'
import { ReactComponent as Clock } from 'assets/images/clock.svg'
import { RowCenter } from 'components/Row'
import { IconWrapper } from 'pages/SecTokenDetails/styleds'
import React, { useMemo } from 'react'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { AccreditationStatusEnum } from './enum'
import { StatusTitle } from './styleds'

interface Props {
  status?: AccreditationStatusEnum
}
interface Details {
  color: string
  text: string
  icon: () => JSX.Element | null
}

const useAccreditationDetails = (status?: AccreditationStatusEnum): Details => {
  const info = useMemo(() => {
    switch (status) {
      case AccreditationStatusEnum.REJECTED:
        return {
          color: 'error',
          text: t`Rejected`,
          // eslint-disable-next-line react/display-name
          icon: () => null,
        }
      case AccreditationStatusEnum.FAILED:
        return {
          color: 'error',
          text: t`Failed`,
          // eslint-disable-next-line react/display-name
          icon: () => null,
        }
      case AccreditationStatusEnum.PENDING_CUSTODIAN:
      case AccreditationStatusEnum.PENDING:
      default:
        return {
          color: 'text1',
          text: t`Passing accreditation`,
          // eslint-disable-next-line react/display-name
          icon: () => <Clock />,
        }
    }
  }, [status])
  return info
}

export const AccreditationStatus = ({ status }: Props) => {
  const info = useAccreditationDetails(status)
  return (
    <RowCenter flexWrap="wrap" style={{ marginTop: '10px' }}>
      <StatusTitle>
        <Trans>Status:</Trans>
      </StatusTitle>
      <Box marginLeft="13px" display="flex" alignItems="center">
        <TYPE.titleSmall color={info.color}>{info.text}</TYPE.titleSmall>
        {info.icon() && (
          <Box marginLeft="9px" display="flex" justifyContent="center">
            <IconWrapper size={20}>{info.icon()}</IconWrapper>
          </Box>
        )}
      </Box>
    </RowCenter>
  )
}
