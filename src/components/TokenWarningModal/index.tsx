import { ImportToken } from 'components/SearchModal/ImportToken'
import React from 'react'
import { useDismissTokenWarning, useImportNonDefaultTokens } from 'state/swap/hooks'
import * as H from 'history'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ModalBlurWrapper } from 'theme'

export default function TokenWarningModal({ history }: { history: H.History }) {
  const { dismissTokenWarning, handleDismissTokenWarning, handleConfirmTokenWarning } = useDismissTokenWarning(history)
  const { importTokensNotInDefault } = useImportNonDefaultTokens()
  return (
    <RedesignedWideModal
      isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
      onDismiss={handleDismissTokenWarning}
      maxHeight={100}
    >
      <ModalBlurWrapper>
        <ImportToken tokens={importTokensNotInDefault} handleCurrencySelect={handleConfirmTokenWarning} />
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}
