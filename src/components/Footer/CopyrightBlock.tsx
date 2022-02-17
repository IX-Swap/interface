import React from 'react'
import { Trans, t } from '@lingui/macro'
import dayjs from 'dayjs'

import { CopyrightBlockContainer } from './styleds'

export const CopyrightBlock = () => {
  const year = dayjs().format('YYYY')

  return (
    <CopyrightBlockContainer>
      <div>
        <div>
          <Trans>Terms & Conditions</Trans>
        </div>
        <div>
          <Trans>Privacy Policy</Trans>
        </div>
      </div>
      <div>&quot;{t`Copyright © IX Swap ${year}`}&quot;</div>
    </CopyrightBlockContainer>
  )
}
