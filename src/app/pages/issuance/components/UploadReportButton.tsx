import React from 'react'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { generatePath } from 'react-router'
import { Button, Tooltip } from '@material-ui/core'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'

export const UploadReportButton = () => {
  const { data } = useDSOsByUserId('Approved', true)

  const disabled = data.list.length < 1
  const tooltipMessage = (
    <>
      To create a report it is <br /> necessary to have a DSO
    </>
  )

  return (
    <Tooltip title={disabled ? tooltipMessage : ''} placement='top' arrow>
      <span>
        <Button
          component={AppRouterLinkComponent}
          to={generatePath(IssuanceRoute.uploadReport)}
          variant='contained'
          color='primary'
          style={{ height: 40 }}
          disableElevation
          disabled={disabled}
        >
          Upload Report
        </Button>
      </span>
    </Tooltip>
  )
}
