import { Trans, t } from '@lingui/macro'
import React from 'react'

import useCopyClipboard from '../../hooks/useCopyClipboard'

export default function PlainCopy(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()
  return (
    <span onClick={() => setCopied(props.toCopy)}>
      <Trans>{isCopied ? `Copied` : props.children}</Trans>
    </span>
  )
}
