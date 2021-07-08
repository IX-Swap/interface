import React from 'react'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import { RowCenter } from '../../components/Row'
import { ButtonIXSWide } from '../../components/Button'
import { Trans } from '@lingui/macro'

export const AddLiquidityButton = () => {
  return (
    <RowCenter>
      <ButtonIXSWide id="add-liquidity" data-testid="add-liquidity" as={Link} to="/add/ETH">
        <Text>
          <Trans>Add Liquidity</Trans>
        </Text>
      </ButtonIXSWide>
    </RowCenter>
  )
}
