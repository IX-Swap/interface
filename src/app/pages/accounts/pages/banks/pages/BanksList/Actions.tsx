import { Typography, useTheme } from '@mui/material'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { OTPDialog } from 'app/pages/accounts/components/OTPDialog/OTPDialog'
import { useRemoveBank } from 'app/pages/accounts/pages/banks/hooks/useRemoveBank'
import { ActionContent } from 'app/pages/accounts/pages/banks/pages/BanksList/ActionContent'
import { BankDetailsDialog } from 'app/pages/accounts/pages/banks/pages/BanksList/BankDetailsDialog'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { Form } from 'components/form/Form'
import { history } from 'config/history'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'
import { generatePath } from 'react-router-dom'
import { Bank } from 'types/bank'
import { MobileActions } from './MobileActions'

export interface ActionsProps {
  item: Bank
}

export const Actions = ({ item }: ActionsProps) => {
  const [removeBank, { isLoading }] = useRemoveBank()
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const theme = useTheme()
  const { isTablet } = useAppBreakpoints()
  const view = () => {
    setShowBankDetails(true)
  }

  const close = () => {
    setShowBankDetails(false)
  }

  const edit = () =>
    history.push(generatePath(BanksRoute.edit, { bankId: item._id }))

  const remove = async ({ otp }: { otp: string }) => {
    await removeBank({ bankId: item._id, otp })
    closeOtpDialog()
  }

  const openOtpDialog = () => {
    setShowOtpDialog(true)
  }

  const closeOtpDialog = () => {
    setShowOtpDialog(false)
  }

  return (
    <>
      {!isTablet && (
        <Dropdown
          trigger={props => (
            <ActionsDropdownTrigger {...props} isLoading={isLoading} />
          )}
          content={props => (
            <ActionContent
              {...props}
              edit={edit}
              remove={openOtpDialog}
              view={view}
            />
          )}
        />
      )}
      {isTablet && (
        <MobileActions edit={edit} remove={openOtpDialog} view={view} />
      )}
      <BankDetailsDialog bank={item} open={showBankDetails} close={close} />
      <Form onSubmit={remove}>
        <OTPDialog
          open={showOtpDialog}
          close={closeOtpDialog}
          title='Are you sure you want to delete account?'
          actionLabel='Delete'
          content={
            <Typography
              variant='body1'
              align='center'
              style={{ marginBottom: 24 }}
              color={theme.palette.text.secondary}
              fontWeight={500}
            >
              To confirm fill in the code from your authenticator app
            </Typography>
          }
        />
      </Form>
    </>
  )
}
