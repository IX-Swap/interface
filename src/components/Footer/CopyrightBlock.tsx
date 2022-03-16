import React from 'react'
import { Trans, t } from '@lingui/macro'
import dayjs from 'dayjs'

import { CopyrightBlockContainer } from './styleds'

export const CopyrightBlock = () => {
  const year = dayjs().format('YYYY')

  return (
    <CopyrightBlockContainer>
      <div>
        <a href="https://ixswap.io/terms-and-conditions/" target="_blank" rel="noreferrer">
          <Trans>Terms & Conditions</Trans>
        </a>
        <a href="https://ixswap.io/privacy-policy/" target="_blank" rel="noreferrer">
          <Trans>Privacy Policy</Trans>
        </a>
      </div>
      <div>&quot;{t`Copyright © IX Swap ${year}`}&quot;</div>
    </CopyrightBlockContainer>
  )
}
