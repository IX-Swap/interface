import React from 'react'

import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { TYPE } from 'theme'

export const DepositPending = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Column>
        <RowCenter style={{ marginTop: '50px' }}>
          <TYPE.title8>
            <Trans>Pending</Trans>
          </TYPE.title8>
        </RowCenter>
        <RowCenter style={{ marginTop: '68px', marginBottom: '112px' }}>
          <LoaderThin size={64} />
        </RowCenter>
      </Column>
    </div>
  )
}
