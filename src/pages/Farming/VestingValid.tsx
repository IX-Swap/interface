import { Trans } from '@lingui/macro'
import { ButtonIXSWide } from 'components/Button'
import Column from 'components/Column'
import { TextRow } from 'components/TextRow/TextRow'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { TYPE } from 'theme'
import { VestingContractDetails, VestingTableTitle } from './styleds'

export const VestingValid = () => {
  const theme = useTheme()

  return (
    <>
      <VestingContractDetails>
        <VestingTableTitle>
          <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase', marginBottom: '25px' }}>
            <Trans>Details</Trans>
          </TYPE.title6>
        </VestingTableTitle>
        <Column style={{ gap: '16px' }}>
          <Column>
            <TYPE.body1>
              <Trans>Start Date</Trans>&nbsp;
            </TYPE.body1>
            <TYPE.titleSmall fontWeight={400}>05.06.2021, 9:00 am</TYPE.titleSmall>
          </Column>
          <Column>
            <TYPE.body1>
              <Trans>Next Payment</Trans>&nbsp;
            </TYPE.body1>
            <TYPE.titleSmall fontWeight={400}>05.06.2022, 9:00 am</TYPE.titleSmall>
          </Column>
          <Column style={{ gap: '19px' }}>
            <TextRow
              textLeft={<Trans>Total Vesting</Trans>}
              textRight={<TYPE.titleSmall fontWeight={400}>4000 IXS</TYPE.titleSmall>}
            />
            <TextRow
              textLeft={<Trans>Already Vested</Trans>}
              textRight={<TYPE.titleSmall fontWeight={400}>2000 IXS</TYPE.titleSmall>}
            />
            <TextRow
              textLeft={<Trans>Already Released</Trans>}
              textRight={<TYPE.titleSmall fontWeight={400}>1000 IXS</TYPE.titleSmall>}
            />
            <TextRow
              textLeft={<Trans>Releasable</Trans>}
              textRight={<TYPE.titleSmall fontWeight={400}>1000 IXS</TYPE.titleSmall>}
            />
          </Column>
        </Column>
      </VestingContractDetails>

      <ButtonIXSWide data-testid="release-vesting" style={{ width: '308px' }}>
        <Trans>Release</Trans>
      </ButtonIXSWide>
    </>
  )
}
