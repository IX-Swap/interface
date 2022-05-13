import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import { RowCenter } from '../../components/Row'
import { ButtonIXSWide } from '../../components/Button'

export const AddLiquidityButton = () => {
  return (
    <RowCenter>
      <ButtonIXSWide id="add-liquidity" data-testid="add-liquidity" as={Link} to="/add">
        <Text>
          <Trans>Add Liquidity</Trans>
        </Text>
      </ButtonIXSWide>
    </RowCenter>
  )
}
