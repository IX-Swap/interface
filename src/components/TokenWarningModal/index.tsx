import { ImportToken } from 'components/SearchModal/ImportToken'
import React from 'react'
import { useDismissTokenWarning, useImportNonDefaultTokens } from 'state/swap/hooks'
import Modal from '../Modal'
import * as H from 'history'

export default function TokenWarningModal({ history }: { history: H.History }) {
  const { dismissTokenWarning, handleDismissTokenWarning, handleConfirmTokenWarning } = useDismissTokenWarning(history)
  const { importTokensNotInDefault } = useImportNonDefaultTokens()
  return (
    <Modal
      isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
      onDismiss={handleDismissTokenWarning}
      maxHeight={100}
    >
      <ImportToken tokens={importTokensNotInDefault} handleCurrencySelect={handleConfirmTokenWarning} />
    </Modal>
  )
}
