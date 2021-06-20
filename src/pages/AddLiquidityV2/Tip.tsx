import React from 'react'
import { Trans } from '@lingui/macro'
import { TipWithMessage } from 'components/TipWithMessage'
interface Props {
  noLiquidity?: boolean
  isCreate?: boolean
}

export const Tip = ({ noLiquidity, isCreate }: Props) => {
  return (
    <>
      {noLiquidity ||
        (isCreate ? (
          <TipWithMessage
            message={
              <Trans>
                When you add liquidity, you will receive pool tokens representing your position. These tokens
                automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
              </Trans>
            }
          />
        ) : (
          <TipWithMessage
            message={
              <Trans>
                When you add liquidity, you will receive pool tokens representing your position. These tokens
                automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
              </Trans>
            }
          />
        ))}
    </>
  )
}
