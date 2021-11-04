import { CurrencyAmount } from '@ixswap1/sdk-core'
import { t, Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { TextRow } from 'components/TextRow/TextRow'
import { MouseoverTooltip } from 'components/Tooltip'
import useIXSCurrency from 'hooks/useIXSCurrency'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useState } from 'react'
import { useClaimAll, useVestingState } from 'state/vesting/hooks'
import { getVestingDates } from 'state/vesting/utils'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { closestFutureDate, getPayoutClosestToPresent, unixTimeToFormat } from 'utils/time'
import { InfoIcon, VestingContractDetails, VestingDetailsTitle } from '../styleds'

export const VestingValid = () => {
  const theme = useTheme()
  const [isLoading, handleIsLoading] = useState(false)
  const { payouts, details } = useVestingState()
  const { account } = useActiveWeb3React()
  const currency = useIXSCurrency()
  const nextPayment = closestFutureDate({ dates: getVestingDates({ payouts }) })
  const alreadyVested = getPayoutClosestToPresent({ payouts })
  const claim = useClaimAll()
  const { customVestingAddress, availableClaim } = useVestingState()

  const isDifferentAddress = customVestingAddress && customVestingAddress !== account

  const onClickClaim = async () => {
    handleIsLoading(true)

    await claim()

    handleIsLoading(false)

    const { ym } = window
    ym(84960586, 'reachGoal', 'bigVestingClaim')
  }

  return (
    <>
      <VestingContractDetails>
        <VestingDetailsTitle>
          <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase', marginBottom: '25px' }}>
            <Trans>Details</Trans>
          </TYPE.title6>
          <MouseoverTooltip
            placement="top"
            text={t`Your tokens will be released linearly over time. You can claim the releasable amount right now. Come back later to claim more tokens until the full balance is claimed.`}
          >
            <InfoIcon />
          </MouseoverTooltip>
        </VestingDetailsTitle>
        <Column style={{ gap: '16px' }}>
          {details?.start && (
            <Column>
              <TYPE.body1>
                <Trans>Start Date</Trans>&nbsp;
              </TYPE.body1>
              <TYPE.titleSmall fontWeight={400} lineHeight={'18px'}>
                {unixTimeToFormat({ time: details?.start })}
              </TYPE.titleSmall>
            </Column>
          )}

          {nextPayment && (
            <Column>
              <TYPE.body1>
                <Trans>Next Payment</Trans>&nbsp;
              </TYPE.body1>
              <TYPE.titleSmall fontWeight={400} lineHeight={'18px'}>
                {unixTimeToFormat({ time: nextPayment })}
              </TYPE.titleSmall>
            </Column>
          )}
          {details?.end && (
            <Column>
              <TYPE.body1>
                <Trans>End Date</Trans>&nbsp;
              </TYPE.body1>
              <TYPE.titleSmall fontWeight={400} lineHeight={'18px'}>
                {unixTimeToFormat({ time: details?.end })}
              </TYPE.titleSmall>
            </Column>
          )}
          <Column style={{ gap: '19px' }}>
            {details?.amount && currency && (
              <TextRow
                textLeft={<Trans>Total Vested</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400} style={{ whiteSpace: 'nowrap' }}>
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, details?.amount), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
            {alreadyVested && currency && (
              <TextRow
                textLeft={<Trans>Vesting Amount</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400} style={{ whiteSpace: 'nowrap' }}>
                    {' '}
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, alreadyVested[1]), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
            {details?.claimed && currency && (
              <TextRow
                textLeft={<Trans>Claimed</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400} style={{ whiteSpace: 'nowrap' }}>
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, details?.claimed), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
            {availableClaim && currency && (
              <TextRow
                textLeft={<Trans>Claimable</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400} style={{ whiteSpace: 'nowrap' }}>
                    {' '}
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, availableClaim), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
          </Column>
        </Column>
      </VestingContractDetails>
      {!isDifferentAddress && (
        <ButtonIXSWide
          data-testid="release-vesting"
          style={{ width: '100%', maxWidth: 308 }}
          onClick={onClickClaim}
          disabled={!availableClaim || availableClaim === '0' || isLoading}
        >
          <Trans>Claim</Trans>
        </ButtonIXSWide>
      )}
    </>
  )
}
