import { Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { TYPE } from 'theme'
import { ChartParent, VestingTableTitle, VestingTableWrapper } from './styleds'

export const VestingTable = ({ data, options }: { data: any; options: any }) => {
  const theme = useTheme()
  return (
    <VestingTableWrapper>
      <VestingTableTitle>
        <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase' }}>
          <Trans>Progress</Trans>
        </TYPE.title6>
      </VestingTableTitle>
      <ChartParent>
        <Line data={data} options={options} />
      </ChartParent>
    </VestingTableWrapper>
  )
}
