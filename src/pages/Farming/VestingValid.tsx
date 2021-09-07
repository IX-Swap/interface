import { CurrencyAmount } from '@ixswap1/sdk-core'
import { Trans, t } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { TextRow } from 'components/TextRow/TextRow'
import Tooltip from 'components/Tooltip'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useState } from 'react'
import { useAvailableClaim, useClaimAll, usePayouts, useVestingDetails, useVestingStatus } from 'state/vesting/hooks'
import { getVestingDates } from 'state/vesting/utils'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { closestFutureDate, getPayoutClosestToPresent, unixTimeToFormat } from 'utils/time'
import { VestingContractDetails, InfoIcon, VestingDetailsTitle } from './styleds'

export const VestingValid = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const theme = useTheme()
  const vestingDetails = useVestingDetails()
  const payouts = usePayouts()
  const { chainId } = useActiveWeb3React()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const nextPayment = closestFutureDate({ dates: getVestingDates({ payouts }) })
  const availableClaim = useAvailableClaim()
  const alreadyVested = getPayoutClosestToPresent({ payouts })
  const claim = useClaimAll()

  return (
    <>
      <VestingContractDetails>
        <VestingDetailsTitle>
          <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase', marginBottom: '25px' }}>
            <Trans>Details</Trans>
          </TYPE.title6>
          <Tooltip
            placement="top"
            show={showTooltip}
            text={t`Your tokens will be released linearly over time. You can claim the releasable amount right now. Come back later to claim more tokens until the full balance is claimed.`}
          >
            <InfoIcon onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} />
          </Tooltip>
        </VestingDetailsTitle>
        <Column style={{ gap: '16px' }}>
          {vestingDetails?.start && (
            <Column>
              <TYPE.body1>
                <Trans>Start Date</Trans>&nbsp;
              </TYPE.body1>
              <TYPE.titleSmall fontWeight={400} lineHeight={'18px'}>
                {unixTimeToFormat({ time: vestingDetails?.start })}
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
          <Column style={{ gap: '19px' }}>
            {vestingDetails?.amount && currency && (
              <TextRow
                textLeft={<Trans>Total Vesting</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400}>
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, vestingDetails?.amount), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
            {alreadyVested && currency && (
              <TextRow
                textLeft={<Trans>Already Vested</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400}>
                    {' '}
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, alreadyVested[1]), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
            {vestingDetails?.claimed && currency && (
              <TextRow
                textLeft={<Trans>Already Released</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400}>
                    {formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, vestingDetails?.claimed), 10)}{' '}
                    {currency?.symbol}
                  </TYPE.titleSmall>
                }
              />
            )}
            {availableClaim && currency && (
              <TextRow
                textLeft={<Trans>Releasable</Trans>}
                textRight={
                  <TYPE.titleSmall fontWeight={400}>
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

      <ButtonIXSWide
        data-testid="release-vesting"
        style={{ width: '308px' }}
        onClick={() => claim()}
        disabled={!availableClaim || availableClaim === '0'}
      >
        <Trans>Release</Trans>
      </ButtonIXSWide>
    </>
  )
}
