import { Bank } from 'types/bank'
import React, { useState } from 'react'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { ActionContent } from 'app/pages/accounts/pages/banks/pages/BanksList/ActionContent'
import { history } from 'config/history'
import { generatePath } from 'react-router-dom'
import { useRemoveBank } from 'app/pages/accounts/pages/banks/hooks/useRemoveBank'
import { BankDetailsDialog } from 'app/pages/accounts/pages/banks/pages/BanksList/BankDetailsDialog'
import { OTPDialog } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/OTPDialog'
import { Form } from 'components/form/Form'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export interface ActionsProps {
  item: Bank
}

export const Actions = ({ item }: ActionsProps) => {
  const [removeBank, { isLoading }] = useRemoveBank()
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const theme = useTheme()

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
      <Dropdown
        arrow
        contentTheme='dark'
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
      <BankDetailsDialog bank={item} open={showBankDetails} close={close} />
      <Form onSubmit={remove}>
        <OTPDialog
          open={showOtpDialog}
          close={closeOtpDialog}
          title='Are you sure you want to remove Bank Account?'
          actionLabel='Confirm'
          content={
            <Typography
              variant='body1'
              align='center'
              style={{ marginBottom: 24 }}
              color={theme.palette.text.secondary}
              fontWeight={500}
            >
              You will no longer be able to do transactions from this bank{' '}
              <br />
              account
            </Typography>
          }
        />
      </Form>
    </>
  )
}
