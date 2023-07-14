import React from 'react'
import { Grid } from '@mui/material'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
// import { VSpacer } from 'components/VSpacer'
import { ReactComponent as PeopleIcon } from 'assets/icons/people_black_24dp.svg'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'

export interface TotalInvestorsCardProps {
  isNewThemeOn?: boolean
  showIcon?: boolean
  total: number | undefined
  small?: boolean
}

export const TotalInvestorsCard = ({
  isNewThemeOn = false,
  showIcon = false,
  total,
  small = true
}: TotalInvestorsCardProps) => {
  return (
    <ChartWrapper py={isNewThemeOn ? 2.5 : undefined}>
      <Grid container justifyContent='space-between' alignItems='center' py={1}>
        <Grid item>
          <ChartTitle
            title='Total Investors'
            small={small}
            icon={
              showIcon ? (
                <LabelIcon
                  bgColor='#FAF2DD'
                  icon={<PeopleIcon style={{ fill: '#F6C559', width: 16 }} />}
                />
              ) : undefined
            }
          />
          {/* {isNewThemeOn && <VSpacer size='extraSmall' />} */}
          <InsightValue value={total ?? 0} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
