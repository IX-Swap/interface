import { Trans } from '@lingui/macro'
import Column from 'components/Column'
import { LoaderThin } from 'components/Loader/LoaderThin'
import Row, { RowCenter } from 'components/Row'
import React from 'react'
import { TYPE } from 'theme'

export const DepositPending = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Column>
        <Row style={{ marginTop: '50px' }}>
          <TYPE.title8>
            <Trans>Pending</Trans>
          </TYPE.title8>
        </Row>
        <RowCenter style={{ marginTop: '68px', marginBottom: '112px' }}>
          <LoaderThin size={128} />
        </RowCenter>
      </Column>
    </div>
  )
}
