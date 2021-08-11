import Column from 'components/Column'
import { RowBetween } from 'components/Row'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { TYPE } from 'theme'
import { TokenDescriptionWrapper } from './styleds'

export const StackingDescription = () => {
  const theme = useTheme()
  return (
    <TokenDescriptionWrapper>
      <TYPE.descriptionThin>
        Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget
        tincidunt nibh pulvinar a. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies
        ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam
        vehicula elementum sed sit amet dui.
      </TYPE.descriptionThin>

      <RowBetween>
        <Column>
          <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
            Time
          </TYPE.titleSmall>
          <TYPE.title3>4 month - 4 years</TYPE.title3>
        </Column>
        <Column>
          <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
            Amount
          </TYPE.titleSmall>
          <TYPE.title3>4 month - 4 years</TYPE.title3>
        </Column>
        <Column>
          <TYPE.titleSmall color={theme.text2} style={{ textTransform: 'uppercase' }}>
            APY
          </TYPE.titleSmall>
          <TYPE.title3>8% - 10%</TYPE.title3>
        </Column>
      </RowBetween>
    </TokenDescriptionWrapper>
  )
}
