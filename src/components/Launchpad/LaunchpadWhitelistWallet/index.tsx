import React, { useCallback, useEffect, useState } from 'react'

import { SearchFilter } from 'components/LaunchpadIssuance/IssuanceDashboard/SearchFilter'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { ErrorText, Separator } from 'components/LaunchpadMisc/styled'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { useAppSelector } from 'state/hooks'
import { setFilterValue } from 'state/issuance/actions'
import { useDeleteWhitelisted, useGetWhitelisted } from 'state/issuance/hooks'
import { Pagination } from '../Pagination'
import { tabs } from './constants'
import { WhitelistForm } from './WhitelistForm'
import { WhitelistWalletTable } from './WhitelistWalletTable'
import { Actions } from './WhitelistWalletTable/Actions'
import { ConfirmDeletePopup } from './WhitelistWalletTable/ConfirmDeletePopup'
import { DialogWrapper, Tab, Tabs } from './styled'
export interface LaunchpadWhitelistWalletProps {
  offerId: string
}
export interface WhitelistWalletFormValues {
  walletAddress: string
  fullName: string
}
export const LaunchpadWhitelistWallet = ({ offerId }: LaunchpadWhitelistWalletProps) => {
  const [showWhitelistPopup, setShowWhitelistPopup] = useState(true)
  const toggleDialog = React.useCallback(() => setShowWhitelistPopup((state) => !state), [])

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
  const { items, ...rest } = whitelisted
  const container = React.useRef<HTMLDivElement>(null)
  const onDiscard = useCallback(
    (walletAddress: string) => {
      deleteWhiteListedWallet(offerId, walletAddress)
    },
    [offerId]
  )
  const onClose = () => setIsConfirmOpen(false)

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
    <IssuanceDialog show={showWhitelistPopup} title="Whitelist Wallet" onClose={toggleDialog} width="800px">
      <DialogWrapper>
        <WhitelistForm offerId={offerId} onSuccess={onSuccessCreate} />
        <Separator marginTop="0.25rem" marginBottom="0.25rem" />
        <>
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
        </>
        <WhitelistWalletTable loading={loadingGet} items={items} actions={Actions} onAction={onAction} />
        {getError && <ErrorText>{getError}</ErrorText>}
        <Pagination
          {...rest}
          container={container}
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
