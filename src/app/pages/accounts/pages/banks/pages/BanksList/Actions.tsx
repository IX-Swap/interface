import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { ActionContent } from 'app/pages/accounts/pages/banks/pages/BanksList/ActionContent'
import { BankDetailsDialog } from 'app/pages/accounts/pages/banks/pages/BanksList/BankDetailsDialog'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { ActionsDropdownTrigger } from 'app/pages/authorizer/components/ActionsDropdownTrigger'
import { history } from 'config/history'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'
import { generatePath } from 'react-router-dom'
import { Bank } from 'types/bank'
import { MobileActions } from './MobileActions'

export interface ActionsProps {
  item: Bank
  isLoading: boolean
  removeBankHandler: (item: Bank) => void
}

export const Actions = ({
  item,
  removeBankHandler,
  isLoading
}: ActionsProps) => {
  const [showBankDetails, setShowBankDetails] = useState(false)
  const { isTablet } = useAppBreakpoints()
  const view = () => {
    setShowBankDetails(true)
  }

  const close = () => {
    setShowBankDetails(false)
  }

  const edit = () =>
    history.push(generatePath(BanksRoute.edit, { bankId: item._id }))

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
              remove={() => removeBankHandler(item)}
              view={view}
            />
          )}
        />
      )}
      {isTablet && (
        <MobileActions
          edit={edit}
          remove={() => removeBankHandler(item)}
          view={view}
        />
      )}
      <BankDetailsDialog bank={item} open={showBankDetails} close={close} />
    </>
  )
}
