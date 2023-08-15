import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import {
  Actions,
  ActionsProps
} from 'app/pages/accounts/pages/banks/pages/BanksList/Actions'
import {
  columns,
  compactColumns
} from 'app/pages/accounts/pages/banks/pages/BanksList/columns'
import { banksQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'
import { Bank } from 'types/bank'
import { CompactTable } from 'ui/CompactTable/CompactTable'
import { MobileMenu } from 'ui/CompactTable/MobileMenu'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Form } from 'components/form/Form'
import { OTPDialog } from 'app/pages/accounts/components/OTPDialog/OTPDialog'
import { Typography, useTheme } from '@mui/material'
import { useRemoveBank } from 'app/pages/accounts/pages/banks/hooks/useRemoveBank'
import { NoData } from './NoData'
import { AddBankAccountButton } from '../../../withdraw/components/AddBankAccountButton'

export const Table = ({ limitRows = 0 }: { limitRows?: number }) => {
  const theme = useTheme()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { isTablet } = useAppBreakpoints()
  const [removeBank, { isLoading }] = useRemoveBank()
  const titleExtractor = (selectedItem: Bank) => {
    return selectedItem.currency.symbol
  }
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [activeItem, setActiveItem] = useState<undefined | Bank>(undefined)

  const closeOtpDialog = () => {
    setShowOtpDialog(false)
  }

  const removeHandler = (item: Bank) => {
    setActiveItem(item)
    setShowOtpDialog(true)
  }

  const onSubmit = async ({ otp }: { otp: string }) => {
    if (activeItem !== undefined) {
      await removeBank({ bankId: activeItem._id, otp })
    }

    closeOtpDialog()
  }

  return (
    <ActiveElementContextWrapper>
      <Form onSubmit={onSubmit}>
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
      <TableView<Bank>
        uri={`/accounts/banks/list/${userId}`}
        name={banksQueryKeys.getListByUserId(userId)}
        columns={columns}
        actions={(props: ActionsProps) => (
          <Actions
            {...props}
            isLoading={isLoading}
            removeBankHandler={removeHandler}
          />
        )}
        noHeader={isTablet}
        // paperProps={{
        //   style: {
        //     position: 'relative',
        //     zIndex: 1
        //   }
        // }}
        limitRows={limitRows}
        noDataComponent={
          <NoData>
            <AddBankAccountButton variant={'contained'} />
          </NoData>
        }
      >
        {isTablet
          ? (props: TableViewRendererProps<Bank>) => (
              <CompactTable
                {...props}
                columns={compactColumns}
                menu={
                  <MobileMenu
                    items={props.items}
                    titleExtractor={titleExtractor}
                    actions={(item: Bank) => (
                      <Actions
                        item={item}
                        isLoading={isLoading}
                        removeBankHandler={removeHandler}
                      />
                    )}
                  />
                }
              />
            )
          : undefined}
      </TableView>
    </ActiveElementContextWrapper>
  )
}
