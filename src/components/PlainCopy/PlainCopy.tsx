import { t } from '@lingui/macro'
import React from 'react'

import useCopyClipboard from '../../hooks/useCopyClipboard'

export default function PlainCopy(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()
  return <span onClick={() => setCopied(props.toCopy)}>{isCopied ? t`Copied` : props.children}</span>
}
