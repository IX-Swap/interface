import React, { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from 'components/LaunchpadIssuance/IssuanceDashboard/SearchFilter'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { ErrorText, Separator } from 'components/LaunchpadMisc/styled'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { useAppSelector } from 'state/hooks'
import { resetWhitelistWalletErrors, setFilterValue } from 'state/issuance/actions'
import { useDeleteWhitelisted, useGetWhitelisted } from 'state/issuance/hooks'
import { tabs } from './constants'
import { DialogWrapper, FilterContainer, Tab, Tabs } from './styled'
import { WhitelistForm } from './WhitelistForm'
import { WhitelistWalletTable } from './WhitelistWalletTable'
import { Actions } from './WhitelistWalletTable/Actions'
import { ConfirmDeletePopup } from './WhitelistWalletTable/ConfirmDeletePopup'
import { IssuancePagination } from 'components/LaunchpadIssuance/IssuanceDashboard/IssuancePagination'
export interface LaunchpadWhitelistWalletProps {
  offerId: string
  isOpen: boolean
  setOpen: any
}
export interface WhitelistWalletFormValues {
  walletAddress: string
  fullName: string
}
export const LaunchpadWhitelistWallet = ({ offerId, isOpen, setOpen }: LaunchpadWhitelistWalletProps) => {
  const onCloseDialog = () => {
    setOpen(false)
    dispatch(resetWhitelistWalletErrors())
  }

  const getWhitelistedWallets = useGetWhitelisted()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const onSuccessDelete = () => {
    setIsConfirmOpen(false)
    getWhitelistedWallets(offerId, filter)
  }
  const onSuccessCreate = onSuccessDelete
  const deleteWhiteListedWallet = useDeleteWhitelisted({ onSuccess: () => onSuccessDelete() })
  const { whitelisted, filter, loadingGet, getError, loadingDelete } = useAppSelector((state) => state.issuance)
  const dispatch = useDispatch<AppDispatch>()
  const { items, page, offset, totalItems, totalPages } = whitelisted
  const onDiscard = useCallback(
    (walletAddress: string) => {
      deleteWhiteListedWallet(offerId, walletAddress)
    },
    [offerId]
  )
  const onClose = () => {
    setIsConfirmOpen(false)
  }

  const [walletToDelete, setWalletToDelete] = useState('')
  const onAction = (walletAddress: string) => {
    setIsConfirmOpen(true)
    setWalletToDelete(walletAddress)
  }

  useEffect(() => {
    getWhitelistedWallets(offerId, filter)
  }, [filter?.search, filter?.type, filter?.page])

  const [activeTab, setActiveTab] = useState(0)
  return (
    <IssuanceDialog show={isOpen} title="Whitelist Wallet" onClose={onCloseDialog} width="800px">
      <DialogWrapper>
        <WhitelistForm offerId={offerId} onSuccess={onSuccessCreate} />
        <Separator marginTop="1.25rem" marginBottom="1.5rem" />
        <FilterContainer>
          <Tabs>
            {tabs.map((tab) => (
              <Tab
                key={`whitelist-wallet-tab-${tab.name}`}
                active={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  dispatch(setFilterValue({ filter: { type: tab.type } }))
                }}
              >
                {tab.name}
              </Tab>
            ))}
          </Tabs>
          <SearchFilter onFilter={({ search }) => dispatch(setFilterValue({ filter: { search } }))} />
        </FilterContainer>
        <WhitelistWalletTable loading={loadingGet} items={items} actions={Actions} onAction={onAction} />
        {getError && <ErrorText>{getError}</ErrorText>}
        <IssuancePagination
          currentPage={page}
          pageSize={offset}
          totalPages={totalPages}
          totalItems={totalItems}
          enableChangePageSize={false}
          smallMargin
          onChangePage={(page) => dispatch(setFilterValue({ filter: { page } }))}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmOpen}
          onDiscard={() => onDiscard(walletToDelete)}
          onClose={onClose}
          loading={loadingDelete}
        />
      </DialogWrapper>
    </IssuanceDialog>
  )
}
