import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { DigitalSecurityOffering } from 'types/dso'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DSOInvestorOverviewProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorOverview = (props: DSOInvestorOverviewProps) => {
  const { dso } = props
  const { isTablet, isMobile } = useAppBreakpoints()
  const boxWidth = isMobile ? '100%' : isTablet ? '45%' : 'initial'

  return (
    <Grid item container justify={'space-between'}>
      <Box width={boxWidth}>
        <Grid item>
          <LabelledValue
            label='Network'
            value={dso.network?.name}
            isNewThemeOn
          />
        </Grid>

        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />

        <Grid item>
          <LabelledValue
            label='Decimal'
            value={dso.decimalPlaces}
            isNewThemeOn
          />
        </Grid>

        {isTablet && <VSpacer size={'small'} />}
        {isTablet && <VSpacer size={'extraSmall'} />}
      </Box>
      <Box width={boxWidth}>
        <Grid item>
          <LabelledValue
            label='Capital Structure'
            value={dso.capitalStructure}
            isNewThemeOn
          />
        </Grid>

        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />

        <Grid item>
          <LabelledValue
            label='Token Address'
            value={dso.deploymentInfo?.token ?? ''}
            isNewThemeOn
          />
        </Grid>

        {isTablet && <VSpacer size={'small'} />}
        {isTablet && <VSpacer size={'extraSmall'} />}
      </Box>

      <Box width={boxWidth}>
        <Grid item>
          <LabelledValue
            label='Launch Date'
            value={dso.launchDate}
            isNewThemeOn
          />
        </Grid>

        {isTablet && <VSpacer size={'small'} />}
        {isTablet && <VSpacer size={'extraSmall'} />}
      </Box>

      <Box width={boxWidth}>
        <Grid item>
          <LabelledValue
            label='Completion Date'
            value={dso.completionDate}
            isNewThemeOn
          />
        </Grid>

        {isTablet && <VSpacer size={'small'} />}
        {isTablet && <VSpacer size={'extraSmall'} />}
      </Box>
    </Grid>
  )
}
