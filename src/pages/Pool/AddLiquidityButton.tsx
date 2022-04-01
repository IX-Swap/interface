import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import { useNativeCurrency } from 'hooks/useNativeCurrency'

import { RowCenter } from '../../components/Row'
import { ButtonIXSWide } from '../../components/Button'

export const AddLiquidityButton = () => {
  const native = useNativeCurrency()

  return (
    <RowCenter>
      <ButtonIXSWide id="add-liquidity" data-testid="add-liquidity" as={Link} to={`/add/${native.symbol || 'ETH'}`}>
        <Text>
          <Trans>Add Liquidity</Trans>
        </Text>
      </ButtonIXSWide>
    </RowCenter>
  )
}
