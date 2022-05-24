import React from 'react'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'

import { AtlasInfoContainer } from './styleds'

interface Props {
  atlasInfo: any
}

export const AtlasInfo = ({
  atlasInfo: { issuanceDate, exchange, issuePrice, marketCapitalization, tokenSupply, protocol },
}: Props) => {
  return (
    <AtlasInfoContainer>
      {issuanceDate && (
        <div>
          <Trans>Issuance Date:</Trans>
          <span>{dayjs(issuanceDate).format('YY-MM-DD')}</span>
        </div>
      )}
      {exchange && (
        <div>
          <Trans>Exchange:</Trans>
          <span>{exchange}</span>
        </div>
      )}
      {issuePrice && (
        <div>
          <Trans>Issuing price:</Trans>
          <span>{issuePrice}</span>
        </div>
      )}
      {marketCapitalization && (
        <div>
          <Trans>Market Capitalization:</Trans>
          <span>{`$${Number(marketCapitalization)?.toFixed(3)}`}</span>
        </div>
      )}
      {tokenSupply && (
        <div>
          <Trans>Token Supply:</Trans>
          <span>{tokenSupply}</span>
        </div>
      )}
      {protocol && (
        <div>
          <Trans>Protocol:</Trans>
          <span>{protocol}</span>
        </div>
      )}
    </AtlasInfoContainer>
  )
}
