import { Grid, Box, Hidden } from '@mui/material'
import { Avatar } from 'components/Avatar'
import { LabelledValue } from 'components/LabelledValue'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { LEGAL_ENTITY_STATUS_LIST } from 'components/form/LegalEntityStatusSelect'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

export interface CorporateInfoProps {
  data: CorporateIdentity
}

export const CorporateInfo = ({ data }: CorporateInfoProps) => {
  const { isMobile } = useAppBreakpoints()
  const getLegalEntityStatus = (value: string) => {
    const status = LEGAL_ENTITY_STATUS_LIST.find(
      item => item.value === value
    )?.name
    return status ?? value
  }
  const riskRating = data?.cynopsis?.riskRating ?? 'UNKNOWN'
  return (
    <Box display={'flex'} flexDirection={isMobile ? 'column' : 'row'}>
      <Box marginBottom={6}>
        <Avatar
          documentId={data.logo}
          ownerId={data.user._id}
          variant='square'
          size={128}
        />
      </Box>
      <Hidden smDown>
        <Box width={62} />
      </Hidden>
      <Grid container spacing={3} direction='column'>
        <Grid item style={{ paddingBottom: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <LabelledValue
                value={data.companyLegalName}
                label='Company Name'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LabelledValue
                value={data.registrationNumber}
                label='Company Registration Number/UEN'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <LabelledValue value=' ' label='Status of Risk Report' />
              <AuthorizableStatus
                status={riskRating}
                compact={false}
                isNewTheme
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ paddingTop: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <LabelledValue
                value={data.countryOfFormation}
                label='Country of Incorporation'
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <LabelledValue
                label='Legal Entity'
                className={privateClassNames()}
                value={getLegalEntityStatus(data.legalEntityStatus)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
