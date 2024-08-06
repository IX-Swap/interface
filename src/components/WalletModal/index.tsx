import React from 'react'

import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'

import AccountDetails from '../AccountDetails'
import { Wrapper } from './styleds'

export default function WalletModal({ ENSName }: { ENSName?: string }) {
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  return (
    <RedesignedWideModal isOpen={walletModalOpen} onDismiss={toggleWalletModal} mobileMaxHeight={80} isright>
      <Wrapper>
        <AccountDetails toggleWalletModal={toggleWalletModal} ENSName={ENSName} />
      </Wrapper>
    </RedesignedWideModal>
  )
}
